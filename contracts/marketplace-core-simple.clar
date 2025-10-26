;; marketplace-core-simple.clar - Simplified Marketplace Contract

;; Contract references
(define-constant nft-core-contract 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-core-simple)

;; Error codes
(define-constant err-unauthorized (err u200))
(define-constant err-not-found (err u201))
(define-constant err-already-listed (err u202))
(define-constant err-not-listed (err u203))
(define-constant err-insufficient-payment (err u204))
(define-constant err-invalid-token (err u205))
(define-constant err-auction-ended (err u206))
(define-constant err-auction-active (err u207))

;; Listing data
(define-map listings
  { token-id: uint }
  {
    seller: principal,
    price: uint,
    payment-token: (string-ascii 10),
    listing-type: (string-ascii 20),
    expiry-block: uint,
    status: (string-ascii 20)
  }
)

;; Auction data
(define-map auctions
  { token-id: uint }
  {
    seller: principal,
    starting-price: uint,
    current-price: uint,
    highest-bidder: (optional principal),
    end-block: uint,
    payment-token: (string-ascii 10),
    auction-type: (string-ascii 20)
  }
)

;; Offers
(define-map offers
  { token-id: uint, offerer: principal }
  {
    price: uint,
    payment-token: (string-ascii 10),
    expiry-block: uint,
    status: (string-ascii 20)
  }
)

;; Bundles
(define-map bundles
  { bundle-id: uint }
  {
    creator: principal,
    nft-ids: (list 50 uint),
    price: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20)
  }
)

;; Data variables
(define-data-var last-bundle-id uint u0)
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
        listing-type: (string-ascii 20 "fixed"),
        expiry-block: (+ burn-block-height u10000), ;; 10k blocks expiry
        status: (string-ascii 20 "active")
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
      (asserts! (not (is-eq (get seller listing) tx-sender)) err-unauthorized) ;; Can't buy own NFT
      
      ;; Calculate fees
      (let ((total-price (get price listing))
            (platform-fee (/ (* total-price (var-get platform-fee-percent)) u10000))
            (royalty-fee u0) ;; Will be calculated from NFT metadata
            (seller-amount (- total-price platform-fee)))
        
        ;; Transfer payment based on token type
        (if (is-eq (get payment-token listing) "sBTC")
          (begin
            ;; sBTC transfer (would call sBTC contract)
            (try! (stx-transfer? platform-fee tx-sender tx-sender))
            (try! (stx-transfer? seller-amount tx-sender (get seller listing)))
          )
          (begin
            ;; STX transfer
            (try! (stx-transfer? platform-fee tx-sender tx-sender))
            (try! (stx-transfer? seller-amount tx-sender (get seller listing)))
          )
        )
        
        ;; Transfer NFT to buyer using the nft-core contract
        (try! (contract-call? nft-core-contract transfer token-id (get seller listing) tx-sender))
        
        ;; Update listing status
        (map-set listings {token-id: token-id}
          (merge listing {status: (string-ascii 20 "sold")})
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
        (merge listing {status: (string-ascii 20 "cancelled")})
      )
      
      (ok true)
    )
  )
)

;; Update price
(define-public (update-price (token-id uint) (new-price uint))
  (begin
    (let ((listing (unwrap! (map-get? listings {token-id: token-id}) err-not-found)))
      ;; Verify seller
      (asserts! (is-eq tx-sender (get seller listing)) err-unauthorized)
      (asserts! (is-eq (get status listing) "active") err-not-listed)
      
      ;; Update price
      (map-set listings {token-id: token-id}
        (merge listing {price: new-price})
      )
      
      (ok true)
    )
  )
)

;; Create auction
(define-public (create-auction 
  (token-id uint) 
  (starting-price uint) 
  (duration uint) 
  (auction-type (string-ascii 20)) 
  (payment-token (string-ascii 10))
)
  (begin
    ;; Validate auction type
    (asserts! (or (is-eq auction-type "english") (is-eq auction-type "dutch")) err-invalid-parameters)
    (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)
    
    ;; Create auction
    (map-set auctions {token-id: token-id}
      {
        seller: tx-sender,
        starting-price: starting-price,
        current-price: starting-price,
        highest-bidder: none,
        end-block: (+ burn-block-height duration),
        payment-token: payment-token,
        auction-type: auction-type
      }
    )
    
    (ok true)
  )
)

;; Place bid
(define-public (place-bid (token-id uint) (bid-amount uint))
  (begin
    (let ((auction (unwrap! (map-get? auctions {token-id: token-id}) err-not-found)))
      ;; Verify auction hasn't ended
      (asserts! (> (get end-block auction) burn-block-height) err-auction-ended)
      
      ;; Verify bid is higher than current
      (asserts! (> bid-amount (get current-price auction)) err-insufficient-payment)
      
      ;; Update auction
      (map-set auctions {token-id: token-id}
        (merge auction {
          current-price: bid-amount,
          highest-bidder: (some tx-sender)
        })
      )
      
      (ok true)
    )
  )
)

;; Finalize auction
(define-public (finalize-auction (token-id uint))
  (begin
    (let ((auction (unwrap! (map-get? auctions {token-id: token-id}) err-not-found)))
      ;; Verify auction has ended
      (asserts! (<= (get end-block auction) burn-block-height) err-auction-active)
      
      ;; Process sale if there was a bidder
      (match (get highest-bidder auction)
        winner (begin
          ;; Transfer payment and NFT
          (try! (stx-transfer? (get current-price auction) tx-sender (get seller auction)))
          (ok true)
        })
        (ok false) ;; No winner
      )
    )
  )
)

;; Make offer
(define-public (make-offer (token-id uint) (price uint) (payment-token (string-ascii 10)) (duration uint))
  (begin
    (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)
    
    ;; Create offer
    (map-set offers {token-id: token-id, offerer: tx-sender}
      {
        price: price,
        payment-token: payment-token,
        expiry-block: (+ burn-block-height duration),
        status: (string-ascii 20 "active")
      }
    )
    
    (ok true)
  )
)

;; Accept offer
(define-public (accept-offer (token-id uint) (offerer principal))
  (begin
    (let ((offer (unwrap! (map-get? offers {token-id: token-id, offerer: offerer}) err-not-found)))
      ;; Verify offer is active
      (asserts! (is-eq (get status offer) "active") err-not-found)
      
      ;; Process payment
      (if (is-eq (get payment-token offer) "sBTC")
        (try! (stx-transfer? (get price offer) tx-sender offerer))
        (try! (stx-transfer? (get price offer) tx-sender offerer))
      )
      
      ;; Update offer status
      (map-set offers {token-id: token-id, offerer: offerer}
        (merge offer {status: (string-ascii 20 "accepted")})
      )
      
      (ok true)
    )
  )
)

;; Cancel offer
(define-public (cancel-offer (token-id uint))
  (begin
    (let ((offer (unwrap! (map-get? offers {token-id: token-id, offerer: tx-sender}) err-not-found)))
      ;; Update status
      (map-set offers {token-id: token-id, offerer: tx-sender}
        (merge offer {status: (string-ascii 20 "cancelled")})
      )
      
      (ok true)
    )
  )
)

;; Create bundle
(define-public (create-bundle (nft-ids (list 50 uint)) (price uint) (payment-token (string-ascii 10)))
  (begin
    (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)
    
    (var-set last-bundle-id (+ (var-get last-bundle-id) u1))
    (let ((bundle-id (var-get last-bundle-id)))
      (map-set bundles {bundle-id: bundle-id}
        {
          creator: tx-sender,
          nft-ids: nft-ids,
          price: price,
          payment-token: payment-token,
          status: (string-ascii 20 "active")
        }
      )
      (ok bundle-id)
    )
  )
)

;; Buy bundle
(define-public (buy-bundle (bundle-id uint))
  (begin
    (let ((bundle (unwrap! (map-get? bundles {bundle-id: bundle-id}) err-not-found)))
      ;; Verify bundle is active
      (asserts! (is-eq (get status bundle) "active") err-not-found)
      
      ;; Process payment
      (if (is-eq (get payment-token bundle) "sBTC")
        (try! (stx-transfer? (get price bundle) tx-sender (get creator bundle)))
        (try! (stx-transfer? (get price bundle) tx-sender (get creator bundle)))
      )
      
      ;; Update bundle status
      (map-set bundles {bundle-id: bundle-id}
        (merge bundle {status: (string-ascii 20 "sold")})
      )
      
      (ok true)
    )
  )
)

;; Get listing
(define-read-only (get-listing (token-id uint))
  (ok (map-get? listings {token-id: token-id}))
)

;; Get active listings
(define-read-only (get-active-listings (skip uint) (limit uint))
  (ok (list)) ;; Simplified for demo
)
