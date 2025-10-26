;; nft-core-fixed.clar - BitcoinBaazar NFT Core Contract (Fixed Version)

;; Error codes
(define-constant err-unauthorized (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-exists (err u102))

;; NFT metadata map
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

;; Mint NFT - Fixed version
(define-public (mint
  (name (string-ascii 256)))
  (begin
    (var-set last-token-id (+ (var-get last-token-id) u1))
    (let ((token-id (var-get last-token-id)))

      ;; Store metadata with default image
      (map-set nft-metadata {token-id: token-id}
        {
          name: name,
          image-uri: (string-ascii 256 "https://bitcoinbazaar.com/default.png"),
          owner: tx-sender
        }
      )

      ;; Update total supply
      (var-set total-supply (+ (var-get total-supply) u1))

      (ok token-id)
    )
  )
)

;; Mint NFT with image URI
(define-public (mint-with-uri
  (name (string-ascii 256))
  (image-uri (string-ascii 256)))
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

;; Transfer NFT
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Verify sender is current owner
    (asserts! (is-eq sender (unwrap! (get-owner token-id) err-not-found)) err-unauthorized)

    ;; Update ownership
    (map-set nft-metadata {token-id: token-id}
      (merge (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)
             {owner: recipient}))

    (ok true)
  )
)

;; Burn NFT
(define-public (burn (token-id uint))
  (begin
    ;; Verify owner
    (asserts! (is-eq tx-sender (unwrap! (get-owner token-id) err-not-found)) err-unauthorized)

    ;; Remove from metadata
    (map-delete nft-metadata {token-id: token-id})

    ;; Update total supply
    (var-set total-supply (- (var-get total-supply) u1))

    (ok true)
  )
)

;; Get token URI
(define-read-only (get-token-uri (token-id uint))
  (ok (get image-uri (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
)

;; Get owner of NFT
(define-read-only (get-owner (token-id uint))
  (ok (get owner (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (var-get total-supply))
)

;; Get last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)
