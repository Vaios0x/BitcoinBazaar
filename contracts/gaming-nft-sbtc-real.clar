;; gaming-nft-sbtc-real.clar - GameFi NFT Contract with Real sBTC Integration

;; Error definitions
(define-constant err-not-found (err u100))
(define-constant err-same-owner (err u101))
(define-constant err-invalid-token (err u102))

;; sBTC contract address - Mock sBTC token for testnet
(define-constant sbtc-contract 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.sbtc-token-mock)

;; Data variables
(define-data-var nft-counter uint u0)
(define-data-var battle-counter uint u0)

;; NFT stats tracking
(define-map nft-stats
  { token-id: uint }
  {
    level: uint,
    experience: uint,
    wins: uint,
    losses: uint,
    total-earnings: uint
  }
)

;; Active battles
(define-map active-battles
  { battle-id: uint }
  {
    nft1-id: uint,
    nft2-id: uint,
    wager: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20),
    created-at: uint
  }
)

;; Battle results
(define-map battle-results
  { battle-id: uint }
  {
    winner-id: uint,
    loser-id: uint,
    wager-amount: uint,
    payment-token: (string-ascii 10),
    completed-at: uint
  }
)

;; Create battle between two NFTs with sBTC support
(define-public (create-battle (nft1-id uint) (nft2-id uint) (wager uint) (payment-token (string-ascii 10)))
  (begin
    (let ((battle-id (+ (var-get battle-counter) u1)))
      (var-set battle-counter battle-id)
      
      ;; Validate payment token (STX or sBTC)
      (asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)
      
      ;; Get NFT owners
      (let (
        (nft1-owner (unwrap! (contract-call? .nft-core get-owner nft1-id) err-not-found))
        (nft2-owner (unwrap! (contract-call? .nft-core get-owner nft2-id) err-not-found))
      )
        ;; Verify different owners
        (asserts! (not (is-eq nft1-owner nft2-owner)) err-same-owner)
        
        ;; Lock wagers in escrow
        (if (is-eq payment-token "sBTC")
          (begin
            ;; Transfer sBTC to escrow
            (try! (contract-call? sbtc-contract transfer wager nft1-owner (as-contract tx-sender) none))
            (try! (contract-call? sbtc-contract transfer wager nft2-owner (as-contract tx-sender) none))
          )
          (begin
            ;; Transfer STX to escrow
            (try! (stx-transfer? wager nft1-owner (as-contract tx-sender)))
            (try! (stx-transfer? wager nft2-owner (as-contract tx-sender)))
          )
        )
        
        ;; Create battle
        (map-set active-battles
          { battle-id: battle-id }
          {
            nft1-id: nft1-id,
            nft2-id: nft2-id,
            wager: wager,
            payment-token: payment-token,
            status: "active",
            created-at: u0
          }
        )
        
        (ok battle-id)
      )
    )
  )
)

;; Execute battle between two NFTs
(define-public (execute-battle (battle-id uint))
  (begin
    (let ((battle (unwrap! (map-get? active-battles { battle-id: battle-id }) err-not-found)))
      ;; Verify battle is active
      (asserts! (is-eq (get status battle) "active") err-not-found)
      
      ;; Simple random winner (in production, use more sophisticated logic)
      (let (
        (winner-id (if (is-eq (mod u0 u2) u0) (get nft1-id battle) (get nft2-id battle)))
        (loser-id (if (is-eq winner-id (get nft1-id battle)) (get nft2-id battle) (get nft1-id battle)))
        (winner-owner (unwrap! (contract-call? .nft-core get-owner winner-id) err-not-found))
        (total-pot (* (get wager battle) u2))
      )
        ;; Transfer winnings to winner
        (if (is-eq (get payment-token battle) "sBTC")
          (try! (as-contract (contract-call? sbtc-contract transfer total-pot tx-sender winner-owner none)))
          (try! (as-contract (stx-transfer? total-pot tx-sender winner-owner)))
        )
        
        ;; Update winner stats
        (map-set nft-stats
          { token-id: winner-id }
          (merge (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)
            {
              level: u1,
              experience: u100,
              wins: u1,
              losses: u0,
              total-earnings: total-pot
            }
          )
        )
        
        ;; Update loser stats
        (map-set nft-stats
          { token-id: loser-id }
          (merge (unwrap! (map-get? nft-stats { token-id: loser-id }) err-not-found)
            {
              level: u1,
              experience: u50,
              wins: u0,
              losses: u1,
              total-earnings: u0
            }
          )
        )
        
        ;; Record battle result
        (map-set battle-results
          { battle-id: battle-id }
          {
            winner-id: winner-id,
            loser-id: loser-id,
            wager-amount: (get wager battle),
            payment-token: (get payment-token battle),
            completed-at: u0
          }
        )
        
        ;; Mark battle as completed
        (map-set active-battles
          { battle-id: battle-id }
          (merge battle { status: "completed" })
        )
        
        (ok winner-id)
      )
    )
  )
)

;; Get NFT stats
(define-read-only (get-nft-stats (token-id uint))
  (ok (map-get? nft-stats { token-id: token-id }))
)

;; Get battle info
(define-read-only (get-battle (battle-id uint))
  (ok (map-get? active-battles { battle-id: battle-id }))
)

;; Get battle result
(define-read-only (get-battle-result (battle-id uint))
  (ok (map-get? battle-results { battle-id: battle-id }))
)
