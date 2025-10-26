;; marketplace.clar - BitcoinBazaar Marketplace with sBTC Integration
;; Implements Bitcoin-native marketplace with sBTC support and best practices

;; Error codes
(define-constant err-unauthorized (err u200))
(define-constant err-not-found (err u201))
(define-constant err-already-listed (err u202))
(define-constant err-not-listed (err u203))
(define-constant err-insufficient-payment (err u204))
(define-constant err-invalid-token (err u205))
(define-constant err-invalid-price (err u206))

;; sBTC contract address (testnet)
;; For development: use local sbtc-mock contract
;; For production: use 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token'
(define-constant sbtc-contract .sbtc-mock)

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
  { token-id: uint, offer-id: uint }
  {
    bidder: principal,
    amount: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20),
    created-at: uint
  }
)

;; Data variables
(define-data-var last-offer-id uint u0)
(define-data-var marketplace-fee-rate uint u25) ;; 2.5% fee
(define-data-var fee-recipient principal 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)

;; List NFT for sale with sBTC support
(define-public (list-nft
  (token-id uint)
  (price uint)
  (payment-token (string-ascii 10)))
  (begin
    ;; Validate payment token (STX or sBTC)
    (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)

    ;; Validate price
    (asserts! (> price u0) err-invalid-price)

    ;; Check if already listed
    (asserts! (is-none (map-get? listings {token-id: token-id})) err-already-listed)

    ;; Create listing with timestamp
    (map-set listings {token-id: token-id}
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
            (try! (contract-call? sbtc-contract transfer seller-amount tx-sender (get seller listing)))
            ;; Transfer sBTC fee to marketplace
            (try! (contract-call? sbtc-contract transfer fee-amount tx-sender .marketplace))
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
(define-public (make-offer
  (token-id uint)
  (amount uint)
  (payment-token (string-ascii 10)))
  (begin
    ;; Validate payment token
    (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)

    ;; Validate amount
    (asserts! (> amount u0) err-invalid-price)

    ;; Generate offer ID
    (var-set last-offer-id (+ (var-get last-offer-id) u1))
    (let ((offer-id (var-get last-offer-id)))

      ;; Create offer
      (map-set offers {token-id: token-id, offer-id: offer-id}
        {
          bidder: tx-sender,
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
(define-public (accept-offer (token-id uint) (offer-id uint))
  (begin
    (let ((offer (unwrap! (map-get? offers {token-id: token-id, offer-id: offer-id}) err-not-found)))
      ;; Verify offer is active
      (asserts! (is-eq (get status offer) "active") err-not-listed)

      ;; Verify seller is NFT owner (simplified)
      (asserts! (is-eq tx-sender (get seller (unwrap! (map-get? listings {token-id: token-id}) err-not-found))) err-unauthorized)

      ;; Update offer status
      (map-set offers {token-id: token-id, offer-id: offer-id}
        (merge offer {status: "accepted"})
      )

      ;; Update listing status
      (map-set listings {token-id: token-id}
        (merge (unwrap! (map-get? listings {token-id: token-id}) err-not-found)
               {status: "sold"})
      )

      (ok true)
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

;; Get offer
(define-read-only (get-offer (token-id uint) (offer-id uint))
  (ok (map-get? offers {token-id: token-id, offer-id: offer-id}))
)

;; Get marketplace stats
(define-read-only (get-marketplace-stats)
  (ok {
    total-listings: (var-get last-offer-id),
    fee-rate: (var-get marketplace-fee-rate),
    fee-recipient: (var-get fee-recipient)
  })
)

;; Update fee rate (admin only)
(define-public (set-fee-rate (new-rate uint))
  (begin
    (asserts! (is-eq tx-sender (var-get fee-recipient)) err-unauthorized)
    (asserts! (and (>= new-rate u0) (<= new-rate u1000)) err-invalid-price) ;; Max 100%
    (var-set marketplace-fee-rate new-rate)
    (ok true)
  )
)