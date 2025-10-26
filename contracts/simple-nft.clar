;; Simple NFT contract for BitcoinBazaar Demo
;; This contract provides basic NFT functionality for testing

(impl-trait .SIP-009-nft.sip-009-nft-trait)

;; Define the NFT data structure
(define-data-var last-token-id uint u0)
(define-data-var contract-uri (optional (string-utf8 256)) (some u"https://bitcoinbazaar.com/metadata"))

;; Define the NFT map
(define-map nft-data
  uint
  {
    owner: principal,
    token-uri: (optional (string-utf8 256))
  }
)

;; Define the transfer map for events
(define-map transfer-events
  uint
  {
    from: principal,
    to: principal,
    token-id: uint
  }
)

;; SIP-009 NFT trait implementation
(define-read-only (get-last-token-id)
  (var-get last-token-id)
)

(define-read-only (get-token-uri (token-id uint))
  (ok (get token-uri (unwrap! (map-get? nft-data token-id) u0)))
)

(define-read-only (get-owner (token-id uint))
  (ok (get owner (unwrap! (map-get? nft-data token-id) tx-sender)))
)

(define-read-only (get-balance (account principal))
  (ok (get balance (unwrap! (map-get? nft-data account) u0)))
)

(define-read-only (get-supply)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-owner (token-id uint))
  (ok (get owner (unwrap! (map-get? nft-data token-id) tx-sender)))
)

;; Mint function for creating new NFTs
(define-public (mint (recipient principal) (token-uri (optional (string-utf8 256))))
  (begin
    (let (
      (token-id (+ (var-get last-token-id) u1))
    )
      (asserts! (is-eq tx-sender contract-owner) (err u100))
      (try! (var-set last-token-id token-id))
      (map-set nft-data token-id {
        owner: recipient,
        token-uri: token-uri
      })
      (ok token-id)
    )
  )
)

;; Transfer function
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u101))
    (asserts! (is-eq (get owner (unwrap! (map-get? nft-data token-id) tx-sender)) sender) (err u102))
    (map-set nft-data token-id {
      owner: recipient,
      token-uri: (get token-uri (unwrap! (map-get? nft-data token-id) tx-sender))
    })
    (ok true)
  )
)

;; Burn function
(define-public (burn (token-id uint) (sender principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u101))
    (asserts! (is-eq (get owner (unwrap! (map-get? nft-data token-id) tx-sender)) sender) (err u102))
    (map-delete nft-data token-id)
    (ok true)
  )
)

;; Contract owner
(define-constant contract-owner tx-sender)
