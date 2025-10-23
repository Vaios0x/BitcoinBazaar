;; marketplace.clar - Basic Marketplace Contract

;; Error codes
(define-constant err-unauthorized (err u200))
(define-constant err-not-found (err u201))
(define-constant err-already-listed (err u202))
(define-constant err-not-listed (err u203))
(define-constant err-invalid-token (err u204))

;; Listing data
(define-map listings
  { token-id: uint }
  {
    seller: principal,
    price: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20)
  }
)

;; Data variables
(define-data-var platform-fee-percent uint u250) ;; 2.5%

;; List NFT for sale
(define-public (list-nft (token-id uint) (price uint) (payment-token (string-ascii 10)))
  (begin
    ;; Validate payment token
    (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)
    
    ;; Check if already listed
    (asserts! (is-none (map-get? listings {token-id: token-id})) err-already-listed)
    
    ;; Create listing
    (map-set listings {token-id: token-id}
      {
        seller: tx-sender,
        price: price,
        payment-token: payment-token,
        status: "active"
      }
    )
    
    (ok true)
  )
)

;; Buy NFT
(define-public (buy-nft (token-id uint))
  (begin
    (let ((listing (unwrap! (map-get? listings {token-id: token-id}) err-not-found)))
      ;; Verify listing is active
      (asserts! (is-eq (get status listing) "active") err-not-listed)
      (asserts! (not (is-eq (get seller listing) tx-sender)) err-unauthorized)
      
      ;; Calculate fees
      (let ((total-price (get price listing))
            (platform-fee (/ (* total-price (var-get platform-fee-percent)) u10000))
            (seller-amount (- total-price platform-fee)))
        
        ;; Transfer payment
        (try! (stx-transfer? platform-fee tx-sender tx-sender))
        (try! (stx-transfer? seller-amount tx-sender (get seller listing)))
        
        ;; Update listing status
        (map-set listings {token-id: token-id}
          (merge listing {status: "sold"})
        )
        
        (ok true)
      )
    )
  )
)

;; Cancel listing
(define-public (cancel-listing (token-id uint))
  (begin
    (let ((listing (unwrap! (map-get? listings {token-id: token-id}) err-not-found)))
      ;; Verify seller
      (asserts! (is-eq tx-sender (get seller listing)) err-unauthorized)
      (asserts! (is-eq (get status listing) "active") err-not-listed)
      
      ;; Update status
      (map-set listings {token-id: token-id}
        (merge listing {status: "cancelled"})
      )
      
      (ok true)
    )
  )
)

;; Get listing
(define-read-only (get-listing (token-id uint))
  (ok (map-get? listings {token-id: token-id}))
)
