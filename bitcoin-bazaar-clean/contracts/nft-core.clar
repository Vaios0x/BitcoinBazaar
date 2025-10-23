;; nft-core.clar - Basic NFT Contract

;; Error codes
(define-constant err-unauthorized (err u100))
(define-constant err-not-found (err u101))
(define-constant err-invalid-royalty (err u102))

;; NFT metadata
(define-map nft-metadata
  { token-id: uint }
  {
    name: (string-ascii 256),
    description: (string-utf8 1024),
    image-uri: (string-ascii 256),
    creator: principal,
    creation-block: uint,
    royalty-percent: uint
  }
)

;; Data variables
(define-data-var last-token-id uint u0)
(define-data-var total-supply uint u0)

;; Mint NFT
(define-public (mint 
  (name (string-ascii 256)) 
  (description (string-utf8 1024)) 
  (image-uri (string-ascii 256)) 
  (royalty-percent uint)
)
  (begin
    ;; Validate royalty percent (0-50%)
    (asserts! (<= royalty-percent u50) err-invalid-royalty)
    
    ;; Generate new token ID
    (var-set last-token-id (+ (var-get last-token-id) u1))
    (let ((token-id (var-get last-token-id)))
      
      ;; Store metadata
      (map-set nft-metadata {token-id: token-id}
        {
          name: name,
          description: description,
          image-uri: image-uri,
          creator: tx-sender,
          creation-block: burn-block-height,
          royalty-percent: royalty-percent
        }
      )
      
      ;; Update total supply
      (var-set total-supply (+ (var-get total-supply) u1))
      
      ;; Return token ID
      (ok token-id)
    )
  )
)

;; Get token URI
(define-read-only (get-token-uri (token-id uint))
  (ok (get image-uri (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
)

;; Get metadata
(define-read-only (get-metadata (token-id uint))
  (ok (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found))
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (var-get total-supply))
)

;; Get last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)
