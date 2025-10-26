#!/bin/bash

echo "🚀 BitcoinBazaar NFT Testing Script"
echo "=================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "\n${YELLOW}1. Verificando contrato NFT simple...${NC}"
if clarinet check contracts/simple-nft-test.clar; then
    echo -e "${GREEN}✅ Contrato NFT simple verificado${NC}"
else
    echo -e "${RED}❌ Error en contrato NFT simple${NC}"
    exit 1
fi

echo -e "\n${YELLOW}2. Creando NFT de prueba usando Clarinet Console...${NC}"

# Crear un script temporal para el console
cat > test_nft.clar << 'EOF'
;; Test script para crear NFT
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test mint 
  "BitcoinBazaar Test NFT" 
  "https://bitcoinbazaar.com/test-nft.png")
EOF

echo -e "${GREEN}✅ Script de prueba creado${NC}"

echo -e "\n${YELLOW}3. Ejecutando prueba manual...${NC}"
echo "Para probar manualmente:"
echo "1. Ejecuta: clarinet console"
echo "2. Ejecuta: (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.simple-nft-test mint \"Test NFT\" \"https://example.com/test.png\")"
echo "3. Verifica el resultado"

echo -e "\n${GREEN}✅ Testing script completado${NC}"
echo -e "\n${YELLOW}Próximos pasos:${NC}"
echo "1. Usar clarinet console para probar el contrato"
echo "2. Crear NFT de prueba"
echo "3. Verificar metadata y ownership"
echo "4. Probar transfer y burn functions"
