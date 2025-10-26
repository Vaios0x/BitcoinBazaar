;; marketplace-sbtc-real.clar - BitcoinBazaar Marketplace with Real sBTC Integration
;; Production version with real sBTC contract integration

;; Error definitions
(define-constant err-not-found (err u201))
(define-constant err-already-listed (err u202))
(define-constant err-not-listed (err u203))
(define-constant err-insufficient-payment (err u204))
(define-constant err-invalid-token (err u205))
(define-constant err-invalid-price (err u206))

;; sBTC contract address - Mock sBTC token for testnet
(define-constant sbtc-contract 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.sbtc-token-mock)

;; Listing data with sBTC support
(define-map listings
  { token-id: uint }
  {
    seller: principal,
    price: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20),
    created-at: uint
  }
)

;; Offers data
(define-map offers
  { offer-id: uint }
  {
    buyer: principal,
    token-id: uint,
    amount: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20),
    created-at: uint
  }
)

;; Data variables
(define-data-var marketplace-fee-rate uint u25) ;; 2.5%
(define-data-var offer-counter uint u0)

;; List NFT for sale with sBTC support
(define-public (list-nft (token-id uint) (price uint) (payment-token (string-ascii 10)))
  (begin
    ;; Validate payment token (STX or sBTC)
    (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)
    
    ;; Verify NFT ownership
    (let ((owner (unwrap! (contract-call? .nft-core get-owner token-id) err-not-found)))
      (asserts! (is-eq tx-sender owner) err-not-found)
    )
    
    ;; Create listing
    (map-set listings { token-id: token-id }
      {
        seller: tx-sender,
        price: price,
        payment-token: payment-token,
        status: "active",
        created-at: u0
      }
    )
    
    (ok true)
  )
)

;; Buy NFT with sBTC support
(define-public (buy-nft (token-id uint))
  (begin
    (let ((listing (unwrap! (map-get? listings {token-id: token-id}) err-not-found)))
      ;; Verify listing is active
      (asserts! (is-eq (get status listing) "active") err-not-listed)

      ;; Calculate fees
      (let ((price (get price listing))
            (fee (var-get marketplace-fee-rate))
            (fee-amount (/ (* price fee) u1000))
            (seller-amount (- price fee-amount)))

        ;; Update listing status
        (map-set listings {token-id: token-id}
          (merge listing {status: "sold"})
        )

        ;; Transfer payment based on token type
        (if (is-eq (get payment-token listing) "sBTC")
          (begin
            ;; Transfer sBTC to seller
            (try! (contract-call? sbtc-contract transfer seller-amount tx-sender (get seller listing) none))
            ;; Transfer sBTC fee to marketplace
            (try! (contract-call? sbtc-contract transfer fee-amount tx-sender .marketplace none))
          )
          (begin
            ;; Transfer STX to seller
            (try! (stx-transfer? seller-amount tx-sender (get seller listing)))
            ;; Transfer STX fee to marketplace
            (try! (stx-transfer? fee-amount tx-sender .marketplace))
          )
        )
        
        ;; Transfer NFT to buyer
        (try! (contract-call? .nft-core transfer token-id (get seller listing) tx-sender))
        
        (ok true)
      )
    )
  )
)

;; Make offer with sBTC support
(define-public (make-offer (token-id uint) (amount uint) (payment-token (string-ascii 10)))
  (begin
    (let ((offer-id (+ (var-get offer-counter) u1)))
      (var-set offer-counter offer-id)
      
      ;; Validate payment token (STX or sBTC)
      (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)
      
      ;; Create offer
      (map-set offers { offer-id: offer-id }
        {
          buyer: tx-sender,
          token-id: token-id,
          amount: amount,
          payment-token: payment-token,
          status: "active",
          created-at: u0
        }
      )
      
      (ok offer-id)
    )
  )
)

;; Accept offer
(define-public (accept-offer (offer-id uint))
  (begin
    (let ((offer (unwrap! (map-get? offers {offer-id: offer-id}) err-not-found)))
      ;; Verify offer is active
      (asserts! (is-eq (get status offer) "active") err-not-found)
      
      ;; Verify NFT ownership
      (let ((owner (unwrap! (contract-call? .nft-core get-owner (get token-id offer)) err-not-found)))
        (asserts! (is-eq tx-sender owner) err-not-found)
      )
      
      ;; Calculate fees
      (let ((amount (get amount offer))
            (fee (var-get marketplace-fee-rate))
            (fee-amount (/ (* amount fee) u1000))
            (seller-amount (- amount fee-amount)))
        
        ;; Update offer status
        (map-set offers { offer-id: offer-id }
          (merge offer { status: "accepted" })
        )
        
        ;; Transfer payment based on token type
        (if (is-eq (get payment-token offer) "sBTC")
          (begin
            ;; Transfer sBTC to seller
            (try! (contract-call? sbtc-contract transfer seller-amount (get buyer offer) tx-sender none))
            ;; Transfer sBTC fee to marketplace
            (try! (contract-call? sbtc-contract transfer fee-amount (get buyer offer) .marketplace none))
          )
          (begin
            ;; Transfer STX to seller
            (try! (stx-transfer? seller-amount (get buyer offer) tx-sender))
            ;; Transfer STX fee to marketplace
            (try! (stx-transfer? fee-amount (get buyer offer) .marketplace))
          )
        )
        
        ;; Transfer NFT to buyer
        (try! (contract-call? .nft-core transfer (get token-id offer) tx-sender (get buyer offer)))
        
        (ok true)
      )
    )
  )
)

;; Get listing
(define-read-only (get-listing (token-id uint))
  (ok (map-get? listings { token-id: token-id }))
)

;; Get offer
(define-read-only (get-offer (offer-id uint))
  (ok (map-get? offers { offer-id: offer-id }))
)

;; Get marketplace stats
(define-read-only (get-marketplace-stats)
  (ok {
    fee-rate: (var-get marketplace-fee-rate),
    total-offers: (var-get offer-counter)
  })
)
