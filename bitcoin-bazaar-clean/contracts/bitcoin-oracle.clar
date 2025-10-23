;; bitcoin-oracle.clar - Bitcoin Oracle Contract

;; Error codes
(define-constant err-wrong-block (err u300))
(define-constant err-invalid-milestone (err u301))

;; Bitcoin block pricing rules
(define-map bitcoin-pricing-rules
  { rule-id: uint }
  {
    rule-type: (string-ascii 50),
    multiplier: uint,
    valid-until: uint
  }
)

;; Special Bitcoin block events
(define-map bitcoin-milestones
  { block-height: uint }
  {
    event-name: (string-ascii 100),
    discount-percent: uint,
    valid-until: uint
  }
)

;; User Bitcoin holding history
(define-map user-bitcoin-history
  { user: principal }
  {
    first-deposit-block: uint,
    total-blocks-held: uint,
    last-activity-block: uint
  }
)

;; Data variables
(define-data-var last-rule-id uint u0)
(define-data-var lucky-block-discount uint u10) ;; 10% discount

;; Get current Bitcoin block height
(define-read-only (get-bitcoin-block-height)
  burn-block-height
)

;; Calculate dynamic price based on Bitcoin blockchain
(define-read-only (get-dynamic-price (base-price uint) (token-id uint))
  (let (
    (current-btc-block burn-block-height)
    (is-lucky-block (is-eq (mod current-btc-block u100) u0))
    (entropy-discount (mod current-btc-block u20)) ;; 0-20% random discount
  )
    ;; Apply lucky block discount
    (if is-lucky-block 
      (- base-price (/ (* base-price (var-get lucky-block-discount)) u100)) ;; 10% off
      ;; Apply entropy-based discount
      (- base-price (/ (* base-price entropy-discount) u100))
    )
  )
)

;; Verify Bitcoin block milestone
(define-read-only (is-milestone-block (block-height uint))
  (is-some (map-get? bitcoin-milestones {block-height: block-height}))
)

;; Special: Mint only during specific Bitcoin blocks
(define-public (mint-at-bitcoin-block (name (string-ascii 256)) (target-block uint))
  (begin
    (asserts! (is-eq burn-block-height target-block) err-wrong-block)
    ;; Mint NFT with Bitcoin block verification
    (ok true) ;; Would call nft-core mint function
  )
)

;; Record user Bitcoin activity
(define-public (record-bitcoin-activity (user principal))
  (begin
    (let (
      (current-history (default-to 
        {
          first-deposit-block: burn-block-height,
          total-blocks-held: u0,
          last-activity-block: burn-block-height
        }
        (map-get? user-bitcoin-history {user: user})
      ))
      (updated-history (merge current-history {
        last-activity-block: burn-block-height,
        total-blocks-held: (+ (get total-blocks-held current-history) u1)
      }))
    )
      (map-set user-bitcoin-history {user: user} updated-history)
      (ok true)
    )
  )
)

;; Add Bitcoin milestone event
(define-public (add-bitcoin-milestone (block-height uint) (event-name (string-ascii 100)) (discount-percent uint) (valid-until uint))
  (begin
    (map-set bitcoin-milestones {block-height: block-height}
      {
        event-name: event-name,
        discount-percent: discount-percent,
        valid-until: valid-until
      }
    )
    (ok true)
  )
)

;; Get current discount for user
(define-read-only (get-user-discount (user principal))
  (let (
    (current-block burn-block-height)
    (is-lucky-block (is-eq (mod current-block u100) u0))
    (user-history (map-get? user-bitcoin-history {user: user}))
    (diamond-hands-bonus (if (and (is-some user-history) 
                                   (>= (get total-blocks-held (unwrap-panic user-history)) u1000))
                             u5 ;; 5% bonus for holding 1000+ blocks
                             u0))
  )
    (if is-lucky-block
      (+ (var-get lucky-block-discount) diamond-hands-bonus)
      diamond-hands-bonus
    )
  )
)

;; Check if current block is special
(define-read-only (is-special-bitcoin-block)
  (let (
    (current-block burn-block-height)
    (is-lucky-block (is-eq (mod current-block u100) u0))
    (is-halving-block (is-eq (mod current-block u210000) u0)) ;; Every 210k blocks
  )
    (or is-lucky-block is-halving-block)
  )
)

;; Get Bitcoin network stats
(define-read-only (get-bitcoin-stats)
  (ok {
    current-block: burn-block-height,
    is-lucky-block: (is-eq (mod burn-block-height u100) u0),
    is-halving-block: (is-eq (mod burn-block-height u210000) u0),
    blocks-until-halving: (mod (- u210000 (mod burn-block-height u210000)) u210000)
  })
)

;; Set lucky block discount
(define-public (set-lucky-block-discount (discount-percent uint))
  (begin
    (asserts! (<= discount-percent u50) err-invalid-parameters) ;; Max 50% discount
    (var-set lucky-block-discount discount-percent)
    (ok true)
  )
)

;; Get user's Bitcoin holding score
(define-read-only (get-bitcoin-score (user principal))
  (let (
    (user-history (map-get? user-bitcoin-history {user: user}))
  )
    (if (is-some user-history)
      (ok (get total-blocks-held (unwrap-panic user-history)))
      (ok u0)
    )
  )
)
