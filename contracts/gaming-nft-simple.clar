;; gaming-nft-simple.clar - Simplified GameFi NFT Contract for Testing
;; This version works with local storage NFTs and doesn't require real NFT ownership

;; Error definitions
(define-constant err-not-found (err u100))
(define-constant err-same-owner (err u101))
(define-constant err-insufficient-balance (err u102))
(define-constant err-invalid-wager (err u103))

;; Data variables
(define-data-var battle-counter uint u0)

;; Battle system - simplified for testing
(define-map active-battles
  { battle-id: uint }
  {
    nft1-id: uint,
    nft2-id: uint,
    wager: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20),
    winner: (optional uint),
    player1: principal,
    player2: principal
  }
)

;; Create battle between two NFTs (simplified version)
(define-public (create-battle (nft1-id uint) (nft2-id uint) (wager uint) (payment-token (string-ascii 10)))
  (let (
    (battle-id (+ (var-get battle-counter) u1))
    (player1 tx-sender)
    (player2 tx-sender) ;; For testing, same player battles their own NFTs
  )
    ;; Validate wager amount (minimum 0.1 STX = 100000 microSTX)
    (asserts! (>= wager u100000) err-invalid-wager)
    
    ;; Check if player has sufficient balance
    (asserts! (>= (stx-get-balance tx-sender) wager) err-insufficient-balance)
    
    ;; Transfer wager to contract escrow
    (try! (stx-transfer? wager tx-sender (as-contract tx-sender)))
    
    ;; Create battle
    (map-set active-battles
      { battle-id: battle-id }
      {
        nft1-id: nft1-id,
        nft2-id: nft2-id,
        wager: wager,
        payment-token: payment-token,
        status: "active",
        winner: none,
        player1: player1,
        player2: player2
      }
    )
    
    (var-set battle-counter battle-id)
    (ok battle-id)
  )
)

;; Execute battle (simplified version)
(define-public (execute-battle (battle-id uint) (result (string-ascii 10)))
  (let (
    (battle (unwrap! (map-get? active-battles { battle-id: battle-id }) err-not-found))
    (total-pot (* (get wager battle) u2))
    (winner-owner tx-sender)
  )
    ;; Verify battle is active
    (asserts! (is-eq (get status battle) "active") err-not-found)
    
    ;; Transfer winnings to winner (double the wager)
    (try! (as-contract (stx-transfer? total-pot tx-sender winner-owner)))
    
    ;; Mark battle complete
    (map-set active-battles
      { battle-id: battle-id }
      (merge battle { 
        status: "completed", 
        winner: (if (is-eq result "win") (some (get nft1-id battle)) (some (get nft2-id battle)))
      })
    )
    
    (ok true)
  )
)

;; Get battle info
(define-read-only (get-battle (battle-id uint))
  (map-get? active-battles { battle-id: battle-id })
)

;; Get battle counter
(define-read-only (get-battle-counter)
  (var-get battle-counter)
)
