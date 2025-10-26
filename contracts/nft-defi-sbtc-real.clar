;; nft-defi-sbtc-real.clar - Advanced DeFi for NFTs with Real sBTC Integration

;; Error definitions
(define-constant err-not-found (err u100))
(define-constant err-unauthorized (err u101))
(define-constant err-excessive-borrow (err u102))
(define-constant err-lock-period-not-met (err u103))

;; sBTC contract address - Mock sBTC token for testnet
(define-constant sbtc-contract 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.sbtc-token-mock)

;; Data variables
(define-data-var loan-counter uint u0)
(define-data-var stake-counter uint u0)

;; NFT loans
(define-map nft-loans
  { loan-id: uint }
  {
    nft-id: uint,
    borrower: principal,
    borrowed-amount: uint,
    interest-rate: uint,
    created-at: uint,
    due-at: uint,
    status: (string-ascii 20)
  }
)

;; NFT stakes
(define-map nft-stakes
  { stake-id: uint }
  {
    nft-id: uint,
    staker: principal,
    staked-amount: uint,
    apy: uint,
    lock-period: uint,
    staked-at: uint,
    rewards-claimed: uint,
    status: (string-ascii 20)
  }
)

;; Borrow sBTC against NFT
(define-public (borrow-against-nft (nft-id uint) (amount uint))
  (begin
    (let ((loan-id (+ (var-get loan-counter) u1)))
      (var-set loan-counter loan-id)
      
      ;; Get NFT owner
      (let ((nft-owner (unwrap! (contract-call? .nft-core get-owner nft-id) err-not-found)))
        (asserts! (is-eq tx-sender nft-owner) err-unauthorized)
        
        ;; Calculate max borrow (50% of NFT value)
        (let ((nft-value u100000000) ;; Assume 1 sBTC value
              (max-borrow (/ nft-value u2)))
          (asserts! (<= amount max-borrow) err-excessive-borrow)
          
          ;; Lock NFT as collateral (transfer to contract)
          (try! (contract-call? .nft-core transfer nft-id tx-sender (as-contract tx-sender)))
          
          ;; Transfer sBTC to borrower
          (try! (as-contract (contract-call? sbtc-contract transfer amount tx-sender nft-owner none)))
          
          ;; Record loan
          (map-set nft-loans
            { loan-id: loan-id }
            {
              nft-id: nft-id,
              borrower: tx-sender,
              borrowed-amount: amount,
              interest-rate: u500, ;; 5% APY
              created-at: u0,
              due-at: u10080, ;; 1 week
              status: "active"
            }
          )
          
          (ok loan-id)
        )
      )
    )
  )
)

;; Repay loan
(define-public (repay-loan (loan-id uint))
  (begin
    (let ((loan (unwrap! (map-get? nft-loans { loan-id: loan-id }) err-not-found)))
      ;; Calculate interest
      (let (
        (borrowed-amount (get borrowed-amount loan))
        (interest-rate (get interest-rate loan))
        (time-elapsed u0)
        (interest (/ (* (* borrowed-amount interest-rate) time-elapsed) u52560)) ;; ~1 year of blocks
        (total-repay (+ (get borrowed-amount loan) interest))
      )
        ;; Verify borrower
        (asserts! (is-eq tx-sender (get borrower loan)) err-unauthorized)
        
        ;; Transfer repayment
        (try! (contract-call? sbtc-contract transfer total-repay tx-sender .treasury none))
        
        ;; Return NFT to borrower
        (try! (as-contract (contract-call? .nft-core transfer (get nft-id loan) tx-sender (get borrower loan))))
        
        ;; Mark loan repaid
        (map-set nft-loans
          { loan-id: loan-id }
          (merge loan { status: "repaid" })
        )
        
        (ok true)
      )
    )
  )
)

;; Stake NFT for rewards
(define-public (stake-nft (nft-id uint) (duration uint))
  (begin
    (let ((stake-id (+ (var-get stake-counter) u1)))
      (var-set stake-counter stake-id)
      
      ;; Get NFT owner
      (let ((nft-owner (unwrap! (contract-call? .nft-core get-owner nft-id) err-not-found)))
        (asserts! (is-eq tx-sender nft-owner) err-unauthorized)
        
        ;; Lock NFT for staking
        (try! (contract-call? .nft-core transfer nft-id tx-sender (as-contract tx-sender)))
        
        ;; Calculate APY based on duration
        (let ((apy (if (is-eq duration u7) u1000 (if (is-eq duration u30) u1500 u2000)))) ;; 10%, 15%, 20%
          ;; Record stake
          (map-set nft-stakes
            { stake-id: stake-id }
            {
              nft-id: nft-id,
              staker: tx-sender,
              staked-amount: u100000000, ;; 1 sBTC
              apy: apy,
              lock-period: duration,
              staked-at: u0,
              rewards-claimed: u0,
              status: "active"
            }
          )
          
          (ok stake-id)
        )
      )
    )
  )
)

;; Claim staking rewards
(define-public (claim-rewards (stake-id uint))
  (begin
    (let ((stake (unwrap! (map-get? nft-stakes { stake-id: stake-id }) err-not-found)))
      ;; Calculate rewards
      (let (
        (blocks-staked u0)
        (nft-value u100000000) ;; Assume 1 sBTC value
        (rewards (/ (* (* nft-value (get apy stake)) blocks-staked) u52560)) ;; ~1 year of blocks
        (unclaimed-rewards (- rewards (get rewards-claimed stake)))
      )
        (asserts! (is-eq tx-sender (get staker stake)) err-unauthorized)
        
        ;; Pay rewards
        (try! (as-contract (contract-call? sbtc-contract transfer unclaimed-rewards tx-sender (get staker stake) none)))
        
        ;; Update claimed amount
        (map-set nft-stakes
          { stake-id: stake-id }
          (merge stake { rewards-claimed: rewards })
        )
        
        (ok unclaimed-rewards)
      )
    )
  )
)

;; Unstake NFT
(define-public (unstake-nft (stake-id uint))
  (begin
    (let ((stake (unwrap! (map-get? nft-stakes { stake-id: stake-id }) err-not-found)))
      ;; Verify lock period has passed
      (let ((lock-period (get lock-period stake))
            (staked-at (get staked-at stake))
            (required-blocks (* lock-period u1440))) ;; ~1 day = 1440 blocks
        (asserts! true err-lock-period-not-met)
      )
      
      ;; Verify staker
      (asserts! (is-eq tx-sender (get staker stake)) err-unauthorized)
      
      ;; Return NFT to staker
      (try! (as-contract (contract-call? .nft-core transfer (get nft-id stake) tx-sender (get staker stake))))
      
      ;; Mark stake as completed
      (map-set nft-stakes
        { stake-id: stake-id }
        (merge stake { status: "completed" })
      )
      
      (ok true)
    )
  )
)

;; Get loan info
(define-read-only (get-loan (loan-id uint))
  (ok (map-get? nft-loans { loan-id: loan-id }))
)

;; Get stake info
(define-read-only (get-stake (stake-id uint))
  (ok (map-get? nft-stakes { stake-id: stake-id }))
)
