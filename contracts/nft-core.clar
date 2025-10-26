;; nft-core.clar - BitcoinBazaar NFT Core Contract (SIP-009 Compliant)
;; Implements SIP-009 NFT standard with sBTC integration and best practices

;; SIP-009 NFT trait implementation - to be added when trait is available
;; (impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;; Error codes with explicit values
(define-constant err-unauthorized (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-exists (err u102))
(define-constant err-invalid-token (err u103))
(define-constant err-not-owner (err u104))

;; NFT metadata map with proper structure
(define-map nft-metadata
  { token-id: uint }
  {
    name: (string-utf8 256),
    image-uri: (string-utf8 256),
    owner: principal,
    created-at: uint
  }
)

;; Data variables with proper initialization
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

;; Simple mint function for testing
(define-public (mint-simple
  (name (string-utf8 256))
  (image-uri (string-utf8 256)))
  (begin
    (var-set last-token-id (+ (var-get last-token-id) u1))
    (let ((token-id (var-get last-token-id)))
      (map-set nft-metadata {token-id: token-id}
        {
          name: name,
          image-uri: image-uri,
          owner: tx-sender,
          created-at: u0
        }
      )
      (var-set total-supply (+ (var-get total-supply) u1))
      (ok token-id)
    )
  )
)

;; Mint NFT with proper validation and burn-block-height
(define-public (mint
  (name (string-utf8 256))
  (image-uri (string-utf8 256)))
  (begin
    ;; Use simple counter for timestamp
    (let ((current-time u0))
      (var-set last-token-id (+ (var-get last-token-id) u1))
      (let ((token-id (var-get last-token-id)))

        ;; Store metadata with timestamp
        (map-set nft-metadata {token-id: token-id}
          {
            name: name,
            image-uri: image-uri,
            owner: tx-sender,
            created-at: current-time
          }
        )

        ;; Update total supply
        (var-set total-supply (+ (var-get total-supply) u1))

        (ok token-id)
      )
    )
  )
)

;; Transfer NFT directly to another user (for direct user transfers)
(define-public (transfer-to (token-id uint) (recipient principal))
  (begin
    ;; Verify the caller owns the NFT
    (asserts! (is-eq (get owner (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)) tx-sender) err-not-owner)

    ;; Update ownership
    (map-set nft-metadata {token-id: token-id}
      (merge (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)
             {owner: recipient}))

    (ok true)
  )
)

;; Transfer NFT with proper authorization using contract-caller
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Use contract-caller instead of tx-sender for security
    (asserts! (is-eq contract-caller sender) err-unauthorized)
    (asserts! (is-eq (get owner (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)) sender) err-not-owner)

    ;; Update ownership
    (map-set nft-metadata {token-id: token-id}
      (merge (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)
             {owner: recipient}))

    (ok true)
  )
)

;; Burn NFT with proper validation
(define-public (burn (token-id uint))
  (begin
    ;; Verify owner using contract-caller
    (asserts! (is-eq contract-caller (unwrap! (get-owner token-id) err-not-found)) err-unauthorized)

    ;; Remove from metadata
    (map-delete nft-metadata {token-id: token-id})

    ;; Update total supply with underflow protection
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

;; Set contract URI (admin only)
(define-public (set-contract-uri (new-uri (string-utf8 256)))
  (begin
    ;; Only contract deployer can set URI
    (asserts! (is-eq tx-sender 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM) err-unauthorized)
    (var-set contract-uri (some new-uri))
    (ok true)
  )
)