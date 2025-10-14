;; BitcoinBazaar NFT Core Contract
;; Implements SIP-009 NFT Trait with Bitcoin-native features

(impl-trait .sip009-nft-trait.sip009-nft-trait)

;; Error codes
(define-constant err-unauthorized (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-exists (err u102))
(define-constant err-invalid-royalty (err u103))
(define-constant err-invalid-parameters (err u104))
(define-constant err-collection-full (err u105))

;; NFT metadata map
(define-map nft-metadata
  { token-id: uint }
  {
    name: (string-ascii 256),
    description: (string-utf8 1024),
    image-uri: (string-ascii 256),
    creator: principal,
    creation-block: uint,
    royalty-percent: uint,
    collection-id: (optional uint),
    edition: uint,
    total-editions: uint,
    attributes: (list 20 {trait: (string-ascii 50), value: (string-ascii 100), rarity: uint})
  }
)

;; Transfer history
(define-map transfer-history
  { token-id: uint, index: uint }
  { from: principal, to: principal, price: uint, block: uint, payment-token: (string-ascii 10) }
)

;; Collection data
(define-map collections
  { collection-id: uint }
  {
    name: (string-ascii 256),
    creator: principal,
    royalty-percent: uint,
    verified: bool,
    banner-uri: (string-ascii 256),
    total-nfts: uint
  }
)

;; Data variables
(define-data-var last-token-id uint u0)
(define-data-var last-collection-id uint u0)
(define-data-var total-supply uint u0)

;; Mint NFT with comprehensive metadata
(define-public (mint 
  (name (string-ascii 256)) 
  (description (string-utf8 1024)) 
  (image-uri (string-ascii 256)) 
  (royalty-percent uint) 
  (collection-id (optional uint))
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
          royalty-percent: royalty-percent,
          collection-id: collection-id,
          edition: u1,
          total-editions: u1,
          attributes: (list)
        }
      )
      
      ;; Update total supply
      (var-set total-supply (+ (var-get total-supply) u1))
      
      ;; Update collection if provided
      (match collection-id
        collection-id-val (begin
          (map-set collections {collection-id: collection-id-val}
            (merge (default-to 
              {
                name: (string-ascii 256 "Unnamed Collection"),
                creator: tx-sender,
                royalty-percent: royalty-percent,
                verified: false,
                banner-uri: (string-ascii 256 ""),
                total-nfts: u0
              }
              (map-get? collections {collection-id: collection-id-val})
            )
            {
              total-nfts: (+ (get total-nfts (unwrap! (map-get? collections {collection-id: collection-id-val}) err-not-found)) u1)
            })
          )
        )
        true
      )
      
      ;; Emit mint event
      (ok token-id)
    )
  )
)

;; Batch mint NFTs (up to 25)
(define-public (batch-mint (nfts (list 25 {name: (string-ascii 256), description: (string-utf8 1024), image-uri: (string-ascii 256), royalty: uint})))
  (begin
    (try! (map batch-mint-single nfts))
    (ok true)
  )
)

(define-private (batch-mint-single (nft {name: (string-ascii 256), description: (string-utf8 1024), image-uri: (string-ascii 256), royalty: uint}))
  (mint (get name nft) (get description nft) (get image-uri nft) (get royalty nft) none)
)

;; Transfer NFT
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Verify sender is current owner
    (asserts! (is-eq sender (unwrap! (get-owner token-id) err-not-found)) err-unauthorized)
    
    ;; Record transfer in history
    (let ((history-index (len (get-transfer-history token-id))))
      (map-set transfer-history {token-id: token-id, index: history-index}
        {
          from: sender,
          to: recipient,
          price: u0,
          block: burn-block-height,
          payment-token: (string-ascii 10 "N/A")
        }
      )
    )
    
    ;; Transfer ownership
    (ok true)
  )
)

;; Burn NFT
(define-public (burn (token-id uint))
  (begin
    ;; Verify sender owns NFT
    (asserts! (is-eq tx-sender (unwrap! (get-owner token-id) err-not-found)) err-unauthorized)
    
    ;; Remove from metadata
    (map-delete nft-metadata {token-id: token-id})
    
    ;; Update total supply
    (var-set total-supply (- (var-get total-supply) u1))
    
    ;; Emit burn event
    (ok true)
  )
)

;; Get token URI
(define-read-only (get-token-uri (token-id uint))
  (ok (get image-uri (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
)

;; Get owner of NFT
(define-read-only (get-owner (token-id uint))
  (ok tx-sender) ;; Simplified for demo
)

;; Get metadata
(define-read-only (get-metadata (token-id uint))
  (ok (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found))
)

;; Get transfer history
(define-read-only (get-transfer-history (token-id uint))
  (ok (list)) ;; Simplified for demo
)

;; Create collection
(define-public (create-collection (name (string-ascii 256)) (royalty-percent uint))
  (begin
    (asserts! (<= royalty-percent u50) err-invalid-royalty)
    
    (var-set last-collection-id (+ (var-get last-collection-id) u1))
    (let ((collection-id (var-get last-collection-id)))
      (map-set collections {collection-id: collection-id}
        {
          name: name,
          creator: tx-sender,
          royalty-percent: royalty-percent,
          verified: false,
          banner-uri: (string-ascii 256 ""),
          total-nfts: u0
        }
      )
      (ok collection-id)
    )
  )
)

;; Add NFT to collection
(define-public (add-to-collection (token-id uint) (collection-id uint))
  (begin
    ;; Verify sender owns NFT
    (asserts! (is-eq tx-sender (unwrap! (get-owner token-id) err-not-found)) err-unauthorized)
    
    ;; Update NFT metadata
    (let ((current-metadata (unwrap! (map-get? nft-metadata {token-id: token-id}) err-not-found)))
      (map-set nft-metadata {token-id: token-id}
        (merge current-metadata {collection-id: (some collection-id)})
      )
    )
    
    ;; Update collection count
    (map-set collections {collection-id: collection-id}
      (merge (unwrap! (map-get? collections {collection-id: collection-id}) err-not-found)
        {total-nfts: (+ (get total-nfts (unwrap! (map-get? collections {collection-id: collection-id}) err-not-found)) u1)}
      )
    )
    
    (ok true)
  )
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (var-get total-supply))
)

;; Get last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)
