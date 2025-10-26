;; Test NFT Creation Script
;; Este script crea un NFT de prueba en BitcoinBazaar

;; 1. Crear NFT de prueba
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test mint 
  "BitcoinBazaar Test NFT" 
  "https://bitcoinbazaar.com/test-nft.png")

;; 2. Verificar metadata del NFT creado
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test get-nft-metadata 
  u1)

;; 3. Verificar owner del NFT
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test get-owner 
  u1)

;; 4. Verificar total supply
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test get-supply)

;; 5. Crear segundo NFT
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test mint 
  "BitcoinBazaar Gaming NFT" 
  "https://bitcoinbazaar.com/gaming-nft.png")

;; 6. Verificar segundo NFT
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test get-nft-metadata 
  u2)
