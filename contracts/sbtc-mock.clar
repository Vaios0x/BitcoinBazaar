;; sbtc-mock.clar - Mock sBTC contract for development
;; This is a simplified version of sBTC for testing purposes

;; Error definitions
(define-constant err-insufficient-balance (err u100))
(define-constant err-transfer-failed (err u101))

;; Data variables
(define-map balances
  { owner: principal }
  { balance: uint }
)

;; Initialize balance for deployer
(define-public (initialize-balance (owner principal) (amount uint))
  (begin
    (map-set balances { owner: owner } { balance: amount })
    (ok true)
  )
)

;; Get balance
(define-read-only (get-balance (owner principal))
  (get balance (unwrap! (map-get? balances { owner: owner }) { balance: u0 }))
)

;; Transfer sBTC
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (let (
      (sender-balance (get balance (unwrap! (map-get? balances { owner: sender }) { balance: u0 })))
      (recipient-balance (get balance (unwrap! (map-get? balances { owner: recipient }) { balance: u0 })))
    )
      ;; Check sufficient balance
      (asserts! (>= sender-balance amount) err-insufficient-balance)
      
      ;; Update balances
      (map-set balances { owner: sender } { balance: (- sender-balance amount) })
      (map-set balances { owner: recipient } { balance: (+ recipient-balance amount) })
      
      (ok true)
    )
  )
)

;; Mint sBTC (for testing)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (let (
      (current-balance (get balance (unwrap! (map-get? balances { owner: recipient }) { balance: u0 })))
    )
      (map-set balances { owner: recipient } { balance: (+ current-balance amount) })
      (ok true)
    )
  )
)
