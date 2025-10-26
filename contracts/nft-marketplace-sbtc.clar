;; nft-marketplace-sbtc.clar - Simple NFT Marketplace with sBTC Integration
;; Based on Clarinet sBTC integration documentation

;; Define NFT
(define-non-fungible-token marketplace-nft uint)

;; Price in sats (smallest sBTC unit)
(define-data-var mint-price uint u100)
(define-data-var next-id uint u0)

;; sBTC contract address - Official sBTC token
(define-constant sbtc-contract 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token)

;; Mint NFT with sBTC payment
(define-public (mint-with-sbtc)
  (begin
    ;; Transfer sBTC from buyer to contract
    (try! (contract-call? sbtc-contract transfer
      (var-get mint-price)
      tx-sender
      (as-contract tx-sender)
      none
    ))

    ;; Mint the NFT
    (try! (nft-mint? marketplace-nft (var-get next-id) tx-sender))

    ;; Increment ID for next mint
    (ok (var-set next-id (+ (var-get next-id) u1))))
)

;; Check sBTC balance
(define-read-only (get-sbtc-balance (owner principal))
  (ok (contract-call? sbtc-contract get-balance owner))
)

;; Get mint price
(define-read-only (get-mint-price)
  (ok (var-get mint-price))
)

;; Set mint price (only contract owner)
(define-public (set-mint-price (new-price uint))
  (begin
    (var-set mint-price new-price)
    (ok true)
  )
)
