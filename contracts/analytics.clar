;; BitcoinBazaar Analytics Contract
;; On-chain analytics like OpenSea stats

;; Global stats
(define-data-var total-volume-stx uint u0)
(define-data-var total-volume-sbtc uint u0)
(define-data-var total-sales uint u0)

;; Collection stats
(define-map collection-stats
  { collection-id: uint }
  {
    floor-price-stx: uint,
    floor-price-sbtc: uint,
    total-volume-stx: uint,
    total-volume-sbtc: uint,
    total-sales: uint,
    avg-price: uint,
    last-sale-price: uint
  }
)

;; User stats
(define-map user-stats
  { user: principal }
  {
    nfts-owned: uint,
    nfts-created: uint,
    total-spent: uint,
    total-earned: uint,
    total-volume: uint
  }
)

;; Trending collections (time-windowed)
(define-map trending-24h
  { collection-id: uint }
  { volume: uint, sales: uint, unique-buyers: uint }
)

(define-map trending-7d
  { collection-id: uint }
  { volume: uint, sales: uint, unique-buyers: uint }
)

(define-map trending-30d
  { collection-id: uint }
  { volume: uint, sales: uint, unique-buyers: uint }
)

;; Price history
(define-map price-history
  { token-id: uint, index: uint }
  { price: uint, payment-token: (string-ascii 10), block: uint, buyer: principal }
)

;; Whale activity
(define-map whale-transactions
  { tx-id: uint }
  {
    buyer: principal,
    seller: principal,
    amount: uint,
    payment-token: (string-ascii 10),
    block: uint,
    nft-id: uint
  }
)

;; Data variables
(define-data-var whale-threshold uint u100000000) ;; 100 STX threshold
(define-data-var last-tx-id uint u0)

;; Update stats on sale
(define-public (record-sale (token-id uint) (price uint) (payment-token (string-ascii 10)) (buyer principal) (seller principal))
  (begin
    ;; Update global volume
    (if (is-eq payment-token "sBTC")
      (var-set total-volume-sbtc (+ (var-get total-volume-sbtc) price))
      (var-set total-volume-stx (+ (var-get total-volume-stx) price))
    )
    
    ;; Update total sales
    (var-set total-sales (+ (var-get total-sales) u1))
    
    ;; Record price history
    (let ((history-index (len (get-price-history token-id))))
      (map-set price-history {token-id: token-id, index: history-index}
        {
          price: price,
          payment-token: payment-token,
          block: burn-block-height,
          buyer: buyer
        }
      )
    )
    
    ;; Check if whale transaction
    (if (>= price (var-get whale-threshold))
      (begin
        (var-set last-tx-id (+ (var-get last-tx-id) u1))
        (map-set whale-transactions {tx-id: (var-get last-tx-id)}
          {
            buyer: buyer,
            seller: seller,
            amount: price,
            payment-token: payment-token,
            block: burn-block-height,
            nft-id: token-id
          }
        )
      )
    )
    
    (ok true)
  )
)

;; Update collection stats
(define-public (update-collection-stats (collection-id uint) (price uint) (payment-token (string-ascii 10)))
  (begin
    (let ((current-stats (default-to 
      {
        floor-price-stx: u0,
        floor-price-sbtc: u0,
        total-volume-stx: u0,
        total-volume-sbtc: u0,
        total-sales: u0,
        avg-price: u0,
        last-sale-price: u0
      }
      (map-get? collection-stats {collection-id: collection-id})
    )))
      ;; Update volume
      (if (is-eq payment-token "sBTC")
        (map-set collection-stats {collection-id: collection-id}
          (merge current-stats {
            total-volume-sbtc: (+ (get total-volume-sbtc current-stats) price),
            total-sales: (+ (get total-sales current-stats) u1),
            last-sale-price: price
          })
        )
        (map-set collection-stats {collection-id: collection-id}
          (merge current-stats {
            total-volume-stx: (+ (get total-volume-stx current-stats) price),
            total-sales: (+ (get total-sales current-stats) u1),
            last-sale-price: price
          })
        )
      )
    )
    (ok true)
  )
)

;; Update user stats
(define-public (update-user-stats (user principal) (activity-type (string-ascii 20)) (amount uint))
  (begin
    (let ((current-stats (default-to 
      {
        nfts-owned: u0,
        nfts-created: u0,
        total-spent: u0,
        total-earned: u0,
        total-volume: u0
      }
      (map-get? user-stats {user: user})
    )))
      (if (is-eq activity-type "buy")
        (map-set user-stats {user: user}
          (merge current-stats {
            nfts-owned: (+ (get nfts-owned current-stats) u1),
            total-spent: (+ (get total-spent current-stats) amount),
            total-volume: (+ (get total-volume current-stats) amount)
          })
        )
        (if (is-eq activity-type "sell")
          (map-set user-stats {user: user}
            (merge current-stats {
              nfts-owned: (- (get nfts-owned current-stats) u1),
              total-earned: (+ (get total-earned current-stats) amount),
              total-volume: (+ (get total-volume current-stats) amount)
            })
          )
          (if (is-eq activity-type "create")
            (map-set user-stats {user: user}
              (merge current-stats {
                nfts-created: (+ (get nfts-created current-stats) u1)
              })
            )
            (ok false)
          )
        )
      )
    )
    (ok true)
  )
)

;; Get collection floor price
(define-read-only (get-floor-price (collection-id uint) (payment-token (string-ascii 10)))
  (let ((stats (unwrap! (map-get? collection-stats {collection-id: collection-id}) err-not-found)))
    (if (is-eq payment-token "sBTC")
      (ok (get floor-price-sbtc stats))
      (ok (get floor-price-stx stats))
    )
  )
)

;; Get global stats
(define-read-only (get-global-stats)
  (ok {
    total-volume-stx: (var-get total-volume-stx),
    total-volume-sbtc: (var-get total-volume-sbtc),
    total-sales: (var-get total-sales),
    whale-threshold: (var-get whale-threshold)
  })
)

;; Get user stats
(define-read-only (get-user-stats (user principal))
  (ok (map-get? user-stats {user: user}))
)

;; Get price history for NFT
(define-read-only (get-price-history (token-id uint))
  (ok (list)) ;; Simplified for demo
)

;; Get whale transactions
(define-read-only (get-whale-transactions (skip uint) (limit uint))
  (ok (list)) ;; Simplified for demo
)

;; Get trending collections
(define-read-only (get-trending-collections (timeframe (string-ascii 10)) (limit uint))
  (ok (list)) ;; Simplified for demo
)

;; Set whale threshold
(define-public (set-whale-threshold (threshold uint))
  (begin
    (var-set whale-threshold threshold)
    (ok true)
  )
)
