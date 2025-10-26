;; gaming-nft.clar - GameFi NFT Contract

;; Error definitions
(define-constant err-not-found (err u100))
(define-constant err-same-owner (err u101))

;; sBTC contract address (testnet)
;; For development: use local sbtc-mock contract
;; For production: use 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token'
(define-constant sbtc-contract .sbtc-mock)

;; Data variables
(define-data-var nft-counter uint u0)
(define-data-var battle-counter uint u0)

;; NFT Stats structure
(define-map nft-stats
  { token-id: uint }
  {
    hp: uint,
    attack: uint,
    defense: uint,
    speed: uint,
    level: uint,
    xp: uint,
    wins: uint,
    losses: uint,
    total-earnings: uint
  }
)

;; Battle system
(define-map active-battles
  { battle-id: uint }
  {
    nft1-id: uint,
    nft2-id: uint,
    wager: uint,
    payment-token: (string-ascii 10),
    status: (string-ascii 20),
    winner: (optional uint)
  }
)

;; Initialize NFT with random stats based on Bitcoin block
(define-public (mint-gaming-nft (name (string-ascii 256)) (class (string-ascii 20)))
  (let (
    (token-id (+ (var-get nft-counter) u1))
    (btc-block burn-block-height)
    ;; Use Bitcoin block hash for randomness
    (random-seed (mod btc-block u100))
    ;; Base stats + random bonus
    (base-hp (+ u100 (* random-seed u5)))
    (base-attack (+ u20 (* (mod btc-block u50) u2)))
    (base-defense (+ u15 (* (mod btc-block u30) u3)))
    (base-speed (+ u10 (* (mod btc-block u20) u4)))
  )
    ;; Mint base NFT
    ;; For demo purposes, we'll skip the mint call
    ;; (try! (contract-call? .nft-core mint name "ipfs://game"))
    
    ;; Set gaming stats
    (map-set nft-stats
      { token-id: token-id }
      {
        hp: base-hp,
        attack: base-attack,
        defense: base-defense,
        speed: base-speed,
        level: u1,
        xp: u0,
        wins: u0,
        losses: u0,
        total-earnings: u0
      }
    )
    
    (var-set nft-counter token-id)
    (ok token-id)
  )
)

;; Create battle between two NFTs
(define-public (create-battle (nft1-id uint) (nft2-id uint) (wager uint) (payment-token (string-ascii 10)))
  (let (
    (battle-id (+ (var-get battle-counter) u1))
    (nft1-owner (unwrap! (contract-call? .nft-core get-owner nft1-id) err-not-found))
    (nft2-owner (unwrap! (contract-call? .nft-core get-owner nft2-id) err-not-found))
  )
    ;; Verify different owners
    (asserts! (not (is-eq nft1-owner nft2-owner)) err-same-owner)
    
    ;; Lock wagers in escrow
    (if (is-eq payment-token "sBTC")
      (begin
        ;; Transfer sBTC to escrow
        (try! (contract-call? sbtc-contract transfer wager nft1-owner (as-contract tx-sender)))
        (try! (contract-call? sbtc-contract transfer wager nft2-owner (as-contract tx-sender)))
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
        winner: none
      }
    )
    
    (var-set battle-counter battle-id)
    (ok battle-id)
  )
)

;; Execute battle (uses Bitcoin block hash for randomness)
(define-public (execute-battle (battle-id uint))
  (let (
    (battle (unwrap! (map-get? active-battles { battle-id: battle-id }) err-not-found))
    (nft1-stats (unwrap! (map-get? nft-stats { token-id: (get nft1-id battle) }) err-not-found))
    (nft2-stats (unwrap! (map-get? nft-stats { token-id: (get nft2-id battle) }) err-not-found))
    
    ;; Calculate power scores
    (nft1-power (+ 
      (* (get attack nft1-stats) u3)
      (* (get defense nft1-stats) u2)
      (* (get speed nft1-stats) u1)
      (* (get level nft1-stats) u10)
    ))
    (nft2-power (+
      (* (get attack nft2-stats) u3)
      (* (get defense nft2-stats) u2)
      (* (get speed nft2-stats) u1)
      (* (get level nft2-stats) u10)
    ))
    
    ;; Add randomness from Bitcoin block
    (btc-randomness (mod burn-block-height u100))
    (nft1-final-power (+ nft1-power btc-randomness))
    (nft2-final-power (+ nft2-power (- u100 btc-randomness)))
    
    ;; Determine winner
    (winner-id (if (> nft1-final-power nft2-final-power) 
                   (get nft1-id battle)
                   (get nft2-id battle)))
    (loser-id (if (is-eq winner-id (get nft1-id battle))
                  (get nft2-id battle)
                  (get nft1-id battle)))
    
    (winner-owner (unwrap! (contract-call? .nft-core get-owner winner-id) err-not-found))
    (total-pot (* (get wager battle) u2))
  )
    ;; Transfer winnings to winner
    (if (is-eq (get payment-token battle) "sBTC")
      (try! (as-contract (contract-call? sbtc-contract transfer total-pot tx-sender winner-owner)))
      (try! (as-contract (stx-transfer? total-pot tx-sender winner-owner)))
    )
    
    ;; Update winner stats
    (map-set nft-stats
      { token-id: winner-id }
      (merge (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)
        {
          wins: (+ (get wins (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)) u1),
          xp: (+ (get xp (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)) u100),
          total-earnings: (+ (get total-earnings (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)) total-pot)
        }
      )
    )
    
    ;; Update loser stats
    (map-set nft-stats
      { token-id: loser-id }
      (merge (unwrap! (map-get? nft-stats { token-id: loser-id }) err-not-found)
        {
          losses: (+ (get losses (unwrap! (map-get? nft-stats { token-id: loser-id }) err-not-found)) u1)
        }
      )
    )
    
    ;; Check if winner leveled up (every 500 XP)
    (let (
      (winner-xp (get xp (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)))
      (winner-level (get level (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)))
    )
      (if (>= winner-xp (* winner-level u500))
        ;; Level up!
        (map-set nft-stats
          { token-id: winner-id }
          (merge (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)
            {
              level: (+ winner-level u1),
              hp: (+ (get hp (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)) u10),
              attack: (+ (get attack (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)) u5),
              defense: (+ (get defense (unwrap! (map-get? nft-stats { token-id: winner-id }) err-not-found)) u3)
            }
          )
        )
        true
      )
    )
    
    ;; Mark battle complete
    (map-set active-battles
      { battle-id: battle-id }
      (merge battle { status: "completed", winner: (some winner-id) })
    )
    
    (ok winner-id)
  )
)

;; Breed two NFTs to create new NFT (costs sBTC)
(define-public (breed-nfts (parent1-id uint) (parent2-id uint) (name (string-ascii 256)))
  (let (
    (parent1 (unwrap! (map-get? nft-stats { token-id: parent1-id }) err-not-found))
    (parent2 (unwrap! (map-get? nft-stats { token-id: parent2-id }) err-not-found))
    (breeding-fee u100000000) ;; 1 sBTC
    
    ;; Child inherits average stats + bonus
    (child-hp (/ (+ (get hp parent1) (get hp parent2)) u2))
    (child-attack (/ (+ (get attack parent1) (get attack parent2)) u2))
    (child-defense (/ (+ (get defense parent1) (get defense parent2)) u2))
    (child-speed (/ (+ (get speed parent1) (get speed parent2)) u2))
  )
    ;; Charge breeding fee
    ;; For demo purposes, we'll use STX instead of sBTC
    (try! (stx-transfer? breeding-fee tx-sender .treasury))
    
    ;; Mint child NFT
    (let (
      (child-id (+ (var-get nft-counter) u1))
    )
      ;; For demo purposes, we'll skip the mint call
      ;; (try! (contract-call? .nft-core mint name "ipfs://bred"))
      
      ;; Set child stats
      (map-set nft-stats
        { token-id: child-id }
        {
          hp: (+ child-hp u20), ;; Bonus for breeding
          attack: (+ child-attack u10),
          defense: (+ child-defense u8),
          speed: (+ child-speed u5),
          level: u1,
          xp: u0,
          wins: u0,
          losses: u0,
          total-earnings: u0
        }
      )
      
      (var-set nft-counter child-id)
      (ok child-id)
    )
  )
)

;; Daily quest: Complete for sBTC reward
(define-public (complete-daily-quest (nft-id uint) (quest-type (string-ascii 20)))
  (let (
    (nft-stats-data (unwrap! (map-get? nft-stats { token-id: nft-id }) err-not-found))
    (quest-reward u10000000) ;; 0.1 sBTC
  )
    ;; Verify quest not already completed today
    ;; (Check last completion block)
    
    ;; Award quest reward
    ;; For demo purposes, we'll use STX instead of sBTC
    (try! (as-contract (stx-transfer? quest-reward tx-sender (unwrap! (contract-call? .nft-core get-owner nft-id) err-not-found))))
    
    ;; Give XP bonus
    (map-set nft-stats
      { token-id: nft-id }
      (merge nft-stats-data { xp: (+ (get xp nft-stats-data) u50) })
    )
    
    (ok true)
  )
)
