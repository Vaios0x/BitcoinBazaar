;; gaming-nft-simple.clar - Simplified GameFi NFT Contract

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
    
    (total-pot (* (get wager battle) u2))
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
    
    ;; Mark battle complete
    (map-set active-battles
      { battle-id: battle-id }
      (merge battle { status: "completed", winner: (some winner-id) })
    )
    
    (ok winner-id)
  )
)

;; Get NFT stats
(define-read-only (get-nft-stats (token-id uint))
  (ok (map-get? nft-stats { token-id: token-id }))
)

;; Get battle details
(define-read-only (get-battle (battle-id uint))
  (ok (map-get? active-battles { battle-id: battle-id }))
)
