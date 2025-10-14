;; BitcoinBazaar Escrow Contract
;; Secure escrow for offers and auctions

;; Error codes
(define-constant err-escrow-not-found (err u600))
(define-constant err-already-deposited (err u601))
(define-constant err-insufficient-funds (err u602))
(define-constant err-not-locked (err u603))

;; Escrow deposits
(define-map escrow-deposits
  { user: principal, token-id: uint }
  { 
    amount: uint, 
    payment-token: (string-ascii 10), 
    locked: bool,
    deposit-block: uint
  }
)

;; Deposit for offer
(define-public (deposit-for-offer (token-id uint) (amount uint) (payment-token (string-ascii 10)))
  (begin
    ;; Lock funds in escrow
    (if (is-eq payment-token "sBTC")
      (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
      (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    )
    
    (map-set escrow-deposits {user: tx-sender, token-id: token-id}
      {
        amount: amount,
        payment-token: payment-token,
        locked: true,
        deposit-block: burn-block-height
      }
    )
    
    (ok true)
  )
)

;; Release escrow to seller when offer accepted
(define-public (release-escrow (token-id uint) (to principal))
  (begin
    (let ((deposit (unwrap! (map-get? escrow-deposits {user: tx-sender, token-id: token-id}) err-escrow-not-found)))
      ;; Verify deposit is locked
      (asserts! (get locked deposit) err-not-locked)
      
      ;; Release funds
      (if (is-eq (get payment-token deposit) "sBTC")
        (try! (stx-transfer? (get amount deposit) (as-contract tx-sender) to))
        (try! (stx-transfer? (get amount deposit) (as-contract tx-sender) to))
      )
      
      ;; Mark as released
      (map-set escrow-deposits {user: tx-sender, token-id: token-id}
        (merge deposit {locked: false})
      )
      
      (ok true)
    )
  )
)

;; Refund to offerer when offer rejected/expired
(define-public (refund-escrow (token-id uint))
  (begin
    (let ((deposit (unwrap! (map-get? escrow-deposits {user: tx-sender, token-id: token-id}) err-escrow-not-found)))
      ;; Verify deposit is locked
      (asserts! (get locked deposit) err-not-locked)
      
      ;; Refund funds
      (if (is-eq (get payment-token deposit) "sBTC")
        (try! (stx-transfer? (get amount deposit) (as-contract tx-sender) tx-sender))
        (try! (stx-transfer? (get amount deposit) (as-contract tx-sender) tx-sender))
      )
      
      ;; Mark as released
      (map-set escrow-deposits {user: tx-sender, token-id: token-id}
        (merge deposit {locked: false})
      )
      
      (ok true)
    )
  )
)

;; Get escrow details
(define-read-only (get-escrow (user principal) (token-id uint))
  (ok (map-get? escrow-deposits {user: user, token-id: token-id}))
)

;; Check if user has sufficient escrow
(define-read-only (has-sufficient-escrow (user principal) (token-id uint) (required-amount uint))
  (let ((deposit (map-get? escrow-deposits {user: user, token-id: token-id})))
    (if (is-some deposit)
      (let ((deposit-data (unwrap-panic deposit)))
        (and 
          (get locked deposit-data)
          (>= (get amount deposit-data) required-amount)
        )
      )
      false
    )
  )
)

;; Get total escrow balance
(define-read-only (get-total-escrow-balance)
  (ok (stx-get-balance (as-contract tx-sender)))
)
