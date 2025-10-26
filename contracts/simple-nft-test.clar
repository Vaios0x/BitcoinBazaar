;; simple-nft-test.clar - Simple NFT Contract for Testing
;; SIP-009 compliant NFT implementation

;; Error codes
(define-constant err-unauthorized (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-exists (err u102))
(define-constant err-invalid-token (err u103))
(define-constant err-not-owner (err u104))

;; NFT metadata map
(define-map nft-metadata
  { token-id: uint }
  {
    name: (string-utf8 256),
    image-uri: (string-utf8 256),
    owner: principal,
    created-at: uint
  }
)

;; Data variables
(define-data-var last-token-id uint u0)
(define-data-var total-supply uint u0)
(define-data-var contract-uri (optional (string-utf8 256)) (some u"https://bitcoinbazaar.com/metadata"))

;; SIP-009 required functions
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (get image-uri (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
)

(define-read-only (get-owner (token-id uint))
  (ok (get owner (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
)

(define-read-only (get-balance (account principal))
  (ok u0)
)

(define-read-only (get-supply)
  (ok (var-get total-supply))
)

(define-read-only (get-token-owner (token-id uint))
  (ok (get owner (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
)

;; Mint NFT function
(define-public (mint
  (name (string-utf8 256))
  (image-uri (string-utf8 256)))
  (begin
    (var-set last-token-id (+ (var-get last-token-id) u1))
    (let ((token-id (var-get last-token-id)))
      ;; Store metadata
      (map-set nft-metadata {token-id: token-id}
        {
          name: name,
          image-uri: image-uri,
          owner: tx-sender,
          created-at: u0
        }
      )
      ;; Update total supply
      (var-set total-supply (+ (var-get total-supply) u1))
      (ok token-id)
    )
  )
)

;; Transfer NFT function
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Verify sender is owner
    (asserts! (is-eq (get owner (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)) sender) err-not-owner)
    ;; Update ownership
    (map-set nft-metadata {token-id: token-id}
      (merge (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)
             {owner: recipient}))
    (ok true)
  )
)

;; Burn NFT function
(define-public (burn (token-id uint))
  (begin
    ;; Verify owner
    (asserts! (is-eq tx-sender (unwrap! (get-owner token-id) err-not-found)) err-unauthorized)
    ;; Remove from metadata
    (map-delete nft-metadata {token-id: token-id})
    ;; Update total supply
    (let ((current-supply (var-get total-supply)))
      (asserts! (> current-supply u0) err-invalid-token)
      (var-set total-supply (- current-supply u1))
    )
    (ok true)
  )
)

;; Get NFT metadata
(define-read-only (get-nft-metadata (token-id uint))
  (ok (map-get? nft-metadata {token-id: token-id}))
)

;; Get contract URI
(define-read-only (get-contract-uri)
  (ok (var-get contract-uri))
)
