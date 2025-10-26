# 🔐 BitcoinBazaar - Wallet Setup Completo

## ✅ **Configuración Completada**

Tu secret key ha sido configurada en todos los archivos de testing:
- `give suggest source long enhance razor candy margin gadget index muscle start`

---

## 🚀 **Próximos Pasos para Testing**

### **PASO 1: Obtener tu Dirección**

1. **Abrir Leather Wallet**
   - Ve a: https://leather.io
   - Haz clic en "Import Wallet"

2. **Importar con Secret Key**
   - Selecciona "Import with Secret Key"
   - Ingresa tu secret key:
   ```
   give suggest source long enhance razor candy margin gadget index muscle start
   ```
   - Haz clic en "Import"

3. **Copiar tu Dirección**
   - Tu dirección aparecerá en el wallet
   - Cópiala para el siguiente paso

### **PASO 2: Verificar Balance**

```bash
# Verificar balance de tu dirección
node tests/check-balance.js TU_DIRECCION_AQUI

# Ejemplo:
node tests/check-balance.js ST1ABC123XYZ456
```

### **PASO 3: Obtener Fondos (si es necesario)**

Si no tienes STX en testnet:

1. **Ir al Faucet**
   - Ve a: https://explorer.hiro.so/faucet?chain=testnet
   - Conecta tu wallet
   - Solicita STX de testnet

2. **Esperar Confirmación**
   - Espera a que se confirme la transacción
   - Verifica tu balance nuevamente

### **PASO 4: Ejecutar Tests**

Una vez que tengas fondos:

```bash
# Ejecutar todos los tests
npm run test:integration

# Solo verificar wallet
npm run test:wallet

# Solo tests on-chain
npm run test:onchain
```

---

## 🧪 **Tests Disponibles (17 Funciones)**

### **🎨 NFT Core (3)**
- ✅ `mintNFT()` - Crear NFTs
- ✅ `transferNFT()` - Transferir NFTs
- ✅ `burnNFT()` - Quemar NFTs

### **🏪 Marketplace (5)**
- ✅ `listNFT()` - Listar para venta
- ✅ `buyNFT()` - Comprar NFTs
- ✅ `cancelListing()` - Cancelar listados
- ✅ `makeOffer()` - Hacer ofertas
- ✅ `acceptOffer()` - Aceptar ofertas

### **🎮 Gaming (3)**
- ✅ `createBattle()` - Crear batallas
- ✅ `executeBattle()` - Ejecutar batallas
- ✅ `claimReward()` - Reclamar recompensas

### **💰 DeFi (4)**
- ✅ `stakeNFT()` - Hacer stake
- ✅ `unstakeNFT()` - Retirar stake
- ✅ `borrowAgainstNFT()` - Pedir préstamos
- ✅ `repayLoan()` - Pagar préstamos

### **🔮 Bitcoin Oracle (2)**
- ✅ `updateBitcoinPrice()` - Actualizar precio
- ✅ `getBitcoinPrice()` - Obtener precio

---

## 📊 **Resultados Esperados**

### **Salida de Consola**
```
🎯 === BITCOINBAZAAR TEST SUITE ===
🔐 === WALLET VERIFICATION ===
📍 Address: TU_DIRECCION
💰 STX Balance: 5.2 STX
✅ Has Funds: YES

🧪 === EXECUTING ON-CHAIN TESTS ===
🎨 === TESTING NFT CORE FUNCTIONS ===
🧪 Testing Mint NFT...
✅ Mint NFT - Success! TX: 0x123abc...
🔗 Explorer: https://explorer.hiro.so/txid/0x123abc...?chain=testnet

📊 === TEST RESULTS SUMMARY ===
✅ Successful: 15
❌ Failed: 2
📈 Success Rate: 88.2%
```

### **Archivos Generados**
- `test-results-YYYY-MM-DDTHH-mm-ss.json` - Resultados detallados
- Logs con enlaces al explorer de Stacks

---

## 🔗 **Enlaces Útiles**

- **🌐 Leather Wallet**: https://leather.io
- **🌐 Explorer**: https://explorer.hiro.so/?chain=testnet
- **🚰 Faucet**: https://explorer.hiro.so/faucet?chain=testnet
- **📡 API**: https://api.testnet.hiro.so

---

## 🔐 **Seguridad**

### **⚠️ IMPORTANTE**
- ✅ Tu secret key está configurada solo para **testnet**
- ✅ **NUNCA** uses esta secret key en mainnet
- ✅ **NO compartas** tu secret key con nadie
- ✅ Usa un wallet separado para testing

---

## 🎉 **¡Listo para Testing!**

Con tu secret key configurada y fondos en testnet, puedes ejecutar **todos los tests on-chain** de BitcoinBazaar.

### **Comando Final**
```bash
npm run test:integration
```

**¡Happy Testing!** 🚀
