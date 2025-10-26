;; Simple NFT Contract for BitcoinBazaar
;; This is a minimal NFT contract that should work

;; Error codes
(define-constant err-unauthorized (err u100))
(define-constant err-not-found (err u101))

;; NFT metadata
(define-map nft-metadata
  { token-id: uint }
  {
    name: (string-ascii 256),
    image-uri: (string-ascii 256),
    owner: principal
  }
)

;; Data variables
(define-data-var last-token-id uint u0)
(define-data-var total-supply uint u0)

;; Mint NFT function
(define-public (mint
  (name (string-ascii 256))
  (image-uri (string-ascii 256))
)
  (begin
    (var-set last-token-id (+ (var-get last-token-id) u1))
    (let ((token-id (var-get last-token-id)))
      ;; Store metadata
      (map-set nft-metadata {token-id: token-id}
        {
          name: name,
          image-uri: image-uri,
          owner: tx-sender
        }
      )
      ;; Update total supply
      (var-set total-supply (+ (var-get total-supply) u1))
      (ok token-id)
    )
  )
)

;; Get NFT metadata
(define-read-only (get-metadata (token-id uint))
  (map-get? nft-metadata {token-id: token-id})
)

;; Get total supply
(define-read-only (get-total-supply)
  (var-get total-supply)
)

;; Get last token ID
(define-read-only (get-last-token-id)
  (var-get last-token-id)
)
