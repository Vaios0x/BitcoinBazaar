;; nft-defi.clar - Advanced DeFi for NFTs

;; Lending protocol
(define-map nft-loans
  { loan-id: uint }
  {
    nft-id: uint,
    borrower: principal,
    collateral-value: uint,
    borrowed-amount: uint,
    interest-rate: uint, ;; basis points (500 = 5%)
    start-block: uint,
    due-block: uint,
    status: (string-ascii 20)
  }
)

;; Borrow sBTC against NFT
(define-public (borrow-against-nft (nft-id uint) (amount uint))
  (let (
    (nft-owner (unwrap! (contract-call? .nft-core get-owner nft-id) err-not-found))
    (floor-price (unwrap! (contract-call? .analytics get-floor-price nft-id "sBTC") err-not-found))
    (max-borrow (/ (* floor-price u50) u100)) ;; 50% LTV
    (loan-id (+ (var-get loan-counter) u1))
  )
    ;; Verify borrower owns NFT
    (asserts! (is-eq tx-sender nft-owner) err-unauthorized)
    
    ;; Verify borrow amount <= max
    (asserts! (<= amount max-borrow) err-excessive-borrow)
    
    ;; Lock NFT as collateral (transfer to contract)
    (try! (contract-call? .nft-core transfer nft-id tx-sender (as-contract tx-sender)))
    
    ;; Transfer sBTC to borrower
    (try! (as-contract (contract-call? .sbtc-token transfer amount tx-sender nft-owner)))
    
    ;; Record loan
    (map-set nft-loans
      { loan-id: loan-id }
      {
        nft-id: nft-id,
        borrower: nft-owner,
        collateral-value: floor-price,
        borrowed-amount: amount,
        interest-rate: u500, ;; 5% APY
        start-block: burn-block-height,
        due-block: (+ burn-block-height u4320), ;; ~30 days
        status: "active"
      }
    )
    
    (var-set loan-counter loan-id)
    (ok loan-id)
  )
)

;; Repay loan and reclaim NFT
(define-public (repay-loan (loan-id uint))
  (let (
    (loan (unwrap! (map-get? nft-loans { loan-id: loan-id }) err-not-found))
    (blocks-passed (- burn-block-height (get start-block loan)))
    ;; Calculate interest: principal * rate * time
    (interest (/ (* (* (get borrowed-amount loan) (get interest-rate loan)) blocks-passed) u1000000))
    (total-repay (+ (get borrowed-amount loan) interest))
  )
    ;; Verify borrower
    (asserts! (is-eq tx-sender (get borrower loan)) err-unauthorized)
    
    ;; Transfer repayment
    (try! (contract-call? .sbtc-token transfer total-repay tx-sender .treasury))
    
    ;; Return NFT to borrower
    (try! (as-contract (contract-call? .nft-core transfer (get nft-id loan) tx-sender (get borrower loan))))
    
    ;; Mark loan repaid
    (map-set nft-loans { loan-id: loan-id } (merge loan { status: "repaid" }))
    
    (ok true)
  )
)

;; NFT Staking
(define-map nft-stakes
  { stake-id: uint }
  {
    nft-id: uint,
    staker: principal,
    staked-at-block: uint,
    lock-period: uint, ;; blocks
    apy: uint, ;; basis points
    rewards-claimed: uint
  }
)

(define-public (stake-nft (nft-id uint) (lock-period uint))
  (let (
    (stake-id (+ (var-get stake-counter) u1))
    ;; APY based on lock period
    (apy (if (is-eq lock-period u1008) u1000 ;; 7d = 10% APY
      (if (is-eq lock-period u4320) u1500 ;; 30d = 15% APY
        u2000))) ;; 90d+ = 20% APY
    (nft-level (get level (unwrap! (map-get? .gaming-nft.nft-stats { token-id: nft-id }) u1)))
    ;; Bonus APY for high-level NFTs
    (final-apy (+ apy (* nft-level u10)))
  )
    ;; Lock NFT
    (try! (contract-call? .nft-core transfer nft-id tx-sender (as-contract tx-sender)))
    
    ;; Record stake
    (map-set nft-stakes
      { stake-id: stake-id }
      {
        nft-id: nft-id,
        staker: tx-sender,
        staked-at-block: burn-block-height,
        lock-period: lock-period,
        apy: final-apy,
        rewards-claimed: u0
      }
    )
    
    (var-set stake-counter stake-id)
    (ok stake-id)
  )
)

(define-public (claim-staking-rewards (stake-id uint))
  (let (
    (stake (unwrap! (map-get? nft-stakes { stake-id: stake-id }) err-not-found))
    (blocks-staked (- burn-block-height (get staked-at-block stake)))
    ;; Rewards = (NFT value * APY * time) / blocks per year
    (nft-value u100000000) ;; Assume 1 sBTC value
    (rewards (/ (* (* nft-value (get apy stake)) blocks-staked) u52560)) ;; ~1 year of blocks
    (unclaimed-rewards (- rewards (get rewards-claimed stake)))
  )
    (asserts! (is-eq tx-sender (get staker stake)) err-unauthorized)
    
    ;; Pay rewards
    (try! (as-contract (contract-call? .sbtc-token transfer unclaimed-rewards tx-sender (get staker stake))))
    
    ;; Update claimed amount
    (map-set nft-stakes
      { stake-id: stake-id }
      (merge stake { rewards-claimed: rewards })
    )
    
    (ok unclaimed-rewards)
  )
)

(define-public (unstake-nft (stake-id uint))
  (let (
    (stake (unwrap! (map-get? nft-stakes { stake-id: stake-id }) err-not-found))
    (blocks-staked (- burn-block-height (get staked-at-block stake)))
  )
    (asserts! (is-eq tx-sender (get staker stake)) err-unauthorized)
    (asserts! (>= blocks-staked (get lock-period stake)) err-lock-period-not-met)
    
    ;; Claim any remaining rewards
    (try! (claim-staking-rewards stake-id))
    
    ;; Return NFT
    (try! (as-contract (contract-call? .nft-core transfer (get nft-id stake) tx-sender (get staker stake))))
    
    (ok true)
  )
)

;; Fractional NFT ownership
(define-fungible-token nft-fraction)

(define-map fractionalized-nfts
  { nft-id: uint }
  {
    total-fractions: uint,
    original-owner: principal,
    sale-threshold: uint, ;; % of votes needed to sell
    current-sale-votes: uint
  }
)

(define-public (fractionalize-nft (nft-id uint) (num-fractions uint))
  (begin
    ;; Transfer NFT to contract
    (try! (contract-call? .nft-core transfer nft-id tx-sender (as-contract tx-sender)))
    
    ;; Mint fraction tokens to owner
    (try! (ft-mint? nft-fraction num-fractions tx-sender))
    
    ;; Record fractionalization
    (map-set fractionalized-nfts
      { nft-id: nft-id }
      {
        total-fractions: num-fractions,
        original-owner: tx-sender,
        sale-threshold: u51, ;; 51% vote needed
        current-sale-votes: u0
      }
    )
    
    (ok true)
  )
)
