;; gaming-nft-minimal.clar - Minimal GameFi Contract for Testing
;; This version has the absolute minimum logic to work

;; Error definitions
(define-constant err-insufficient-balance (err u102))
(define-constant err-invalid-wager (err u103))

;; Data variables
(define-data-var battle-counter uint u0)

;; Minimal battle system
(define-map battles
  { battle-id: uint }
  {
    nft1-id: uint,
    nft2-id: uint,
    wager: uint,
    status: (string-ascii 20)
  }
)

;; Create battle - minimal version
(define-public (create-battle (nft1-id uint) (nft2-id uint) (wager uint) (payment-token (string-ascii 10)))
  (let (
    (battle-id (+ (var-get battle-counter) u1))
  )
    ;; Validate wager amount (minimum 0.1 STX = 100000 microSTX)
    (asserts! (>= wager u100000) err-invalid-wager)
    
    ;; Check if player has sufficient balance
    (asserts! (>= (stx-get-balance tx-sender) wager) err-insufficient-balance)
    
    ;; Transfer wager to contract escrow
    (try! (stx-transfer? wager tx-sender (as-contract tx-sender)))
    
    ;; Create battle
    (map-set battles
      { battle-id: battle-id }
      {
        nft1-id: nft1-id,
        nft2-id: nft2-id,
        wager: wager,
        status: "active"
      }
    )
    
    (var-set battle-counter battle-id)
    (ok battle-id)
  )
)

;; Execute battle - minimal version
(define-public (execute-battle (battle-id uint) (result (string-ascii 10)))
  (let (
    (battle (unwrap! (map-get? battles { battle-id: battle-id }) (err u100)))
    (total-pot (* (get wager battle) u2))
  )
    ;; Transfer winnings back to player (double the wager)
    (try! (as-contract (stx-transfer? total-pot tx-sender tx-sender)))
    
    ;; Mark battle complete
    (map-set battles
      { battle-id: battle-id }
      (merge battle { status: "completed" })
    )
    
    (ok true)
  )
)

;; Get battle info
(define-read-only (get-battle (battle-id uint))
  (map-get? battles { battle-id: battle-id })
)

;; Get battle counter
(define-read-only (get-battle-counter)
  (var-get battle-counter)
)
