;; BitcoinBazaar Governance Contract
;; DAO governance like Rarible's RARI token

;; Error codes
(define-constant err-proposal-not-found (err u500))
(define-constant err-proposal-ended (err u501))
(define-constant err-already-voted (err u502))
(define-constant err-insufficient-tokens (err u503))
(define-constant err-proposal-not-executable (err u504))

;; Governance token
(define-fungible-token bazaar-token)

;; Proposals
(define-map proposals
  { proposal-id: uint }
  {
    proposer: principal,
    title: (string-ascii 256),
    description: (string-utf8 1024),
    votes-for: uint,
    votes-against: uint,
    status: (string-ascii 20),
    start-block: uint,
    end-block: uint,
    execution-block: uint,
    executed: bool
  }
)

;; User votes
(define-map user-votes
  { proposal-id: uint, voter: principal }
  {
    vote-for: bool,
    amount: uint,
    block: uint
  }
)

;; Treasury
(define-data-var treasury-balance uint u0)
(define-data-var proposal-counter uint u0)

;; Propose changes
(define-public (create-proposal (title (string-ascii 256)) (description (string-utf8 1024)) (duration uint))
  (begin
    ;; Require minimum token balance to propose
    (asserts! (>= (ft-get-balance bazaar-token tx-sender) u1000000) err-insufficient-tokens)
    
    (var-set proposal-counter (+ (var-get proposal-counter) u1))
    (let ((proposal-id (var-get proposal-counter)))
      (map-set proposals {proposal-id: proposal-id}
        {
          proposer: tx-sender,
          title: title,
          description: description,
          votes-for: u0,
          votes-against: u0,
          status: (string-ascii 20 "active"),
          start-block: burn-block-height,
          end-block: (+ burn-block-height duration),
          execution-block: (+ burn-block-height duration u100), ;; 100 blocks after voting ends
          executed: false
        }
      )
      (ok proposal-id)
    )
  )
)

;; Vote on proposals
(define-public (vote (proposal-id uint) (vote-for bool) (amount uint))
  (begin
    (let ((proposal (unwrap! (map-get? proposals {proposal-id: proposal-id}) err-proposal-not-found)))
      ;; Verify proposal is active
      (asserts! (is-eq (get status proposal) "active") err-proposal-ended)
      (asserts! (<= burn-block-height (get end-block proposal)) err-proposal-ended)
      
      ;; Verify user hasn't voted
      (asserts! (is-none (map-get? user-votes {proposal-id: proposal-id, voter: tx-sender})) err-already-voted)
      
      ;; Verify user has enough tokens
      (asserts! (>= (ft-get-balance bazaar-token tx-sender) amount) err-insufficient-tokens)
      
      ;; Record vote
      (map-set user-votes {proposal-id: proposal-id, voter: tx-sender}
        {
          vote-for: vote-for,
          amount: amount,
          block: burn-block-height
        }
      )
      
      ;; Update proposal votes
      (if vote-for
        (map-set proposals {proposal-id: proposal-id}
          (merge proposal {votes-for: (+ (get votes-for proposal) amount)})
        )
        (map-set proposals {proposal-id: proposal-id}
          (merge proposal {votes-against: (+ (get votes-against proposal) amount)})
        )
      )
      
      (ok true)
    )
  )
)

;; Execute proposal
(define-public (execute-proposal (proposal-id uint))
  (begin
    (let ((proposal (unwrap! (map-get? proposals {proposal-id: proposal-id}) err-proposal-not-found)))
      ;; Verify proposal can be executed
      (asserts! (is-eq (get status proposal) "active") err-proposal-not-executable)
      (asserts! (>= burn-block-height (get execution-block proposal)) err-proposal-not-executable)
      (asserts! (not (get executed proposal)) err-proposal-not-executable)
      
      ;; Check if proposal passed (simple majority)
      (let ((total-votes (+ (get votes-for proposal) (get votes-against proposal))))
        (if (> (get votes-for proposal) (get votes-against proposal))
          (begin
            ;; Proposal passed - execute
            (map-set proposals {proposal-id: proposal-id}
              (merge proposal {
                status: (string-ascii 20 "passed"),
                executed: true
              })
            )
            (ok true)
          )
          (begin
            ;; Proposal failed
            (map-set proposals {proposal-id: proposal-id}
              (merge proposal {status: (string-ascii 20 "failed")})
            )
            (ok false)
          )
        )
      )
    )
  )
)

;; Get proposal details
(define-read-only (get-proposal (proposal-id uint))
  (ok (map-get? proposals {proposal-id: proposal-id}))
)

;; Get user's vote
(define-read-only (get-user-vote (proposal-id uint) (voter principal))
  (ok (map-get? user-votes {proposal-id: proposal-id, voter: voter}))
)

;; Get active proposals
(define-read-only (get-active-proposals (skip uint) (limit uint))
  (ok (list)) ;; Simplified for demo
)

;; Mint governance tokens (for testing)
(define-public (mint-tokens (amount uint) (recipient principal))
  (begin
    (try! (ft-mint? bazaar-token amount recipient))
    (ok true)
  )
)

;; Get token balance
(define-read-only (get-token-balance (user principal))
  (ok (ft-get-balance bazaar-token user))
)

;; Get treasury balance
(define-read-only (get-treasury-balance)
  (ok (var-get treasury-balance))
)

;; Transfer to treasury
(define-public (transfer-to-treasury (amount uint))
  (begin
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (var-set treasury-balance (+ (var-get treasury-balance) amount))
    (ok true)
  )
)
