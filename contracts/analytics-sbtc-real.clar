;; analytics-sbtc-real.clar - BitcoinBazaar Analytics with Real sBTC Integration

;; Error definitions
(define-constant err-not-found (err u100))

;; sBTC contract address - Mock sBTC token for testnet
(define-constant sbtc-contract 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.sbtc-token-mock)

;; Global stats
(define-data-var total-volume-stx uint u0)
(define-data-var total-volume-sbtc uint u0)
(define-data-var total-sales uint u0)

;; Collection stats
(define-map collection-stats
  { collection-id: principal }
  {
    floor-price-stx: uint,
    floor-price-sbtc: uint,
    total-volume-stx: uint,
    total-volume-sbtc: uint,
    total-sales: uint
  }
)

;; Price history
(define-map price-history
  { token-id: uint }
  { price: uint, timestamp: uint, payment-token: (string-ascii 10) }
)

;; User stats
(define-map user-stats
  { user: principal }
  {
    nfts-owned: uint,
    nfts-sold: uint,
    total-earned-stx: uint,
    total-earned-sbtc: uint,
    total-spent-stx: uint,
    total-spent-sbtc: uint
  }
)

;; ----------------------------------------------------------------------------------------------------
;; Public Functions
;; ----------------------------------------------------------------------------------------------------

;; Record a sale
(define-public (record-sale (token-id uint) (price uint) (payment-token (string-ascii 10)) (seller principal) (buyer principal))
  (begin
    ;; Update global stats
    (var-set total-sales (+ (var-get total-sales) u1))
    (if (is-eq payment-token "STX")
      (var-set total-volume-stx (+ (var-get total-volume-stx) price))
      (var-set total-volume-sbtc (+ (var-get total-volume-sbtc) price))
    )

    ;; Update price history
    (map-set price-history
      { token-id: token-id }
      { price: price, timestamp: u0, payment-token: payment-token }
    )

    (ok true)
  )
)

;; ----------------------------------------------------------------------------------------------------
;; Read-only Functions
;; ----------------------------------------------------------------------------------------------------

;; Get global stats
(define-read-only (get-global-stats)
  (ok {
    total-volume-stx: (var-get total-volume-stx),
    total-volume-sbtc: (var-get total-volume-sbtc),
    total-sales: (var-get total-sales)
  })
)

;; Get collection stats
(define-read-only (get-collection-stats (collection-id principal))
  (map-get? collection-stats { collection-id: collection-id })
)

;; Get price history for an NFT
(define-read-only (get-price-history (token-id uint))
  (map-get? price-history { token-id: token-id })
)

;; Get user stats
(define-read-only (get-user-stats (user principal))
  (map-get? user-stats { user: user })
)