;; BitcoinBazaar Lazy Mint Contract
;; Gas-free minting like OpenSea

;; Error codes
(define-constant err-voucher-not-found (err u400))
(define-constant err-already-redeemed (err u401))
(define-constant err-expired (err u402))
(define-constant err-invalid-signature (err u403))
(define-constant err-invalid-hash (err u404))

;; Lazy mint vouchers
(define-map lazy-mint-vouchers
  { voucher-id: uint }
  {
    creator: principal,
    metadata-hash: (buff 32),
    signature: (buff 65),
    expiry-block: uint,
    redeemed: bool,
    price: uint,
    payment-token: (string-ascii 10)
  }
)

;; Data variables
(define-data-var voucher-counter uint u0)

;; Create lazy mint voucher (off-chain, gas-free)
(define-public (create-lazy-voucher 
  (metadata-hash (buff 32)) 
  (signature (buff 65)) 
  (expiry-block uint) 
  (price uint) 
  (payment-token (string-ascii 10))
)
  (begin
    (var-set voucher-counter (+ (var-get voucher-counter) u1))
    (let ((voucher-id (var-get voucher-counter)))
      (map-set lazy-mint-vouchers {voucher-id: voucher-id}
        {
          creator: tx-sender,
          metadata-hash: metadata-hash,
          signature: signature,
          expiry-block: expiry-block,
          redeemed: false,
          price: price,
          payment-token: payment-token
        }
      )
      (ok voucher-id)
    )
  )
)

;; Redeem voucher (buyer mints + pays in one transaction)
(define-public (redeem-lazy-voucher (voucher-id uint) (metadata {name: (string-ascii 256), description: (string-utf8 1024), image-uri: (string-ascii 256)}))
  (begin
    (let ((voucher (unwrap! (map-get? lazy-mint-vouchers {voucher-id: voucher-id}) err-voucher-not-found)))
      ;; Verify voucher is valid
      (asserts! (not (get redeemed voucher)) err-already-redeemed)
      (asserts! (<= burn-block-height (get expiry-block voucher)) err-expired)
      
      ;; Verify metadata hash matches
      (let ((metadata-hash-check (sha256 (concat (get name metadata) (concat (get description metadata) (get image-uri metadata))))))
        (asserts! (is-eq metadata-hash-check (get metadata-hash voucher)) err-invalid-hash)
      )
      
      ;; Mint NFT (would call nft-core contract)
      ;; (try! (contract-call? .nft-core mint (get name metadata) (get description metadata) (get image-uri metadata) u10 none))
      
      ;; Transfer payment to creator
      (if (is-eq (get payment-token voucher) "sBTC")
        (try! (stx-transfer? (get price voucher) tx-sender (get creator voucher)))
        (try! (stx-transfer? (get price voucher) tx-sender (get creator voucher)))
      )
      
      ;; Mark voucher as redeemed
      (map-set lazy-mint-vouchers {voucher-id: voucher-id} 
        (merge voucher {redeemed: true})
      )
      
      (ok true)
    )
  )
)

;; Get voucher details
(define-read-only (get-voucher (voucher-id uint))
  (ok (map-get? lazy-mint-vouchers {voucher-id: voucher-id}))
)

;; Check if voucher is valid
(define-read-only (is-voucher-valid (voucher-id uint))
  (let ((voucher (map-get? lazy-mint-vouchers {voucher-id: voucher-id})))
    (if (is-some voucher)
      (let ((voucher-data (unwrap-panic voucher)))
        (and 
          (not (get redeemed voucher-data))
          (> (get expiry-block voucher-data) burn-block-height)
        )
      )
      false
    )
  )
)

;; Cancel voucher (creator only)
(define-public (cancel-voucher (voucher-id uint))
  (begin
    (let ((voucher (unwrap! (map-get? lazy-mint-vouchers {voucher-id: voucher-id}) err-voucher-not-found)))
      ;; Verify creator
      (asserts! (is-eq tx-sender (get creator voucher)) err-unauthorized)
      (asserts! (not (get redeemed voucher)) err-already-redeemed)
      
      ;; Mark as cancelled (expired)
      (map-set lazy-mint-vouchers {voucher-id: voucher-id}
        (merge voucher {expiry-block: u0})
      )
      
      (ok true)
    )
  )
)

;; Get active vouchers for creator
(define-read-only (get-creator-vouchers (creator principal) (skip uint) (limit uint))
  (ok (list)) ;; Simplified for demo
)

;; Get voucher statistics
(define-read-only (get-voucher-stats)
  (ok {
    total-vouchers: (var-get voucher-counter),
    active-vouchers: u0, ;; Would count non-redeemed, non-expired
    redeemed-vouchers: u0, ;; Would count redeemed
    expired-vouchers: u0  ;; Would count expired
  })
)
