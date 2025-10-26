# 🧪 BitcoinBazaar - Guía Completa de Testing On-Chain

## 🎯 **Resumen**

Sistema completo de testing para verificar **todas las 17 funciones on-chain** de BitcoinBazaar con fondos reales en Stacks Testnet.

---

## 🚀 **Configuración en 3 Pasos**

### **PASO 1: Obtener Secret Key de Leather**

1. **Abrir Leather Wallet**
   - Ve a [leather.io](https://leather.io)
   - Conecta tu wallet

2. **Exportar Private Key**
   - Haz clic en el ícono de configuración (⚙️)
   - Selecciona "Export Private Key"
   - Copia la secret key

3. **⚠️ IMPORTANTE**
   - Solo usa secret keys de **TESTNET**
   - Nunca uses tu secret key de mainnet
   - No compartas tu secret key con nadie

### **PASO 2: Configurar Secret Key**

Edita el archivo `tests/run-all-tests.ts`:

```typescript
// Línea 15: Reemplaza con tu secret key
const TEST_WALLET_SECRET_KEY = 'tu_secret_key_aqui'
```

### **PASO 3: Obtener Fondos de Testnet**

1. **Ir al Faucet**
   - Ve a: https://explorer.hiro.so/faucet?chain=testnet
   - Conecta tu wallet
   - Solicita STX de testnet

2. **Verificar Balance**
   - Necesitas al menos **1 STX** para testing
   - Verifica en: https://explorer.hiro.so/?chain=testnet

---

## 🧪 **Ejecutar Tests**

### **Comando Principal**
```bash
npm run test:integration
```

### **Comandos Específicos**
```bash
# Solo verificar wallet
npm run test:wallet

# Solo tests on-chain
npm run test:onchain

# Con opciones
npm run test:integration --verbose
npm run test:integration --skip-wallet-check
```

---

## 📊 **Funciones Testeadas (17 Total)**

### **🎨 NFT Core (3 funciones)**
| Función | Descripción | Contrato |
|---------|-------------|----------|
| `mintNFT()` | Crear NFT | nft-core |
| `transferNFT()` | Transferir NFT | nft-core |
| `burnNFT()` | Quemar NFT | nft-core |

### **🏪 Marketplace (5 funciones)**
| Función | Descripción | Contrato |
|---------|-------------|----------|
| `listNFT()` | Listar para venta | marketplace |
| `buyNFT()` | Comprar NFT | marketplace |
| `cancelListing()` | Cancelar listado | marketplace |
| `makeOffer()` | Hacer oferta | marketplace |
| `acceptOffer()` | Aceptar oferta | marketplace |

### **🎮 Gaming (3 funciones)**
| Función | Descripción | Contrato |
|---------|-------------|----------|
| `createBattle()` | Crear batalla | gaming-nft |
| `executeBattle()` | Ejecutar batalla | gaming-nft |
| `claimReward()` | Reclamar recompensa | gaming-nft |

### **💰 DeFi (4 funciones)**
| Función | Descripción | Contrato |
|---------|-------------|----------|
| `stakeNFT()` | Hacer stake | nft-defi |
| `unstakeNFT()` | Retirar stake | nft-defi |
| `borrowAgainstNFT()` | Pedir préstamo | nft-defi |
| `repayLoan()` | Pagar préstamo | nft-defi |

### **🔮 Bitcoin Oracle (2 funciones)**
| Función | Descripción | Contrato |
|---------|-------------|----------|
| `updateBitcoinPrice()` | Actualizar precio | bitcoin-oracle |
| `getBitcoinPrice()` | Obtener precio | bitcoin-oracle |

---

## 📈 **Resultados Esperados**

### **Salida de Consola**
```
🎯 === BITCOINBAZAAR TEST SUITE ===
📅 Timestamp: 2024-01-15T10:30:00.000Z

🔐 === WALLET VERIFICATION ===
📍 Address: ST1ABC123XYZ456
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
- `test-results-2024-01-15T10-30-00.json` - Resultados detallados
- Logs con enlaces al explorer de Stacks

---

## 🔧 **Configuración Avanzada**

### **Personalizar Tests**
Edita `tests/test-config.ts`:

```typescript
export const TEST_CONFIG = {
  testing: {
    minStxBalance: 1.0,        // Mínimo STX necesario
    testTimeout: 30000,        // Timeout por test (ms)
    retryAttempts: 3,          // Reintentos en caso de fallo
    delayBetweenTests: 2000    // Delay entre tests (ms)
  }
}
```

### **Opciones de Ejecución**
```bash
# Saltar verificación de wallet
npm run test:integration --skip-wallet-check

# Saltar tests on-chain
npm run test:integration --skip-tests

# Modo verbose
npm run test:integration --verbose

# Mostrar ayuda
npm run test:integration --help
```

---

## 🚨 **Troubleshooting**

### **Error: "Secret key not configured"**
```bash
❌ ERROR: Debes configurar tu SECRET KEY de Leather
```
**Solución**: Edita `tests/run-all-tests.ts` y reemplaza `YOUR_LEATHER_SECRET_KEY_HERE`

### **Error: "Insufficient funds"**
```bash
❌ Wallet no tiene fondos suficientes para testing
```
**Solución**: 
1. Ve a https://explorer.hiro.so/faucet?chain=testnet
2. Solicita STX de testnet
3. Espera confirmación

### **Error: "Contract not found"**
```bash
❌ Contract not found: STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.nft-core
```
**Solución**: Verifica que los contratos estén desplegados en testnet

### **Error: "Transaction failed"**
```bash
❌ Transaction failed: Invalid parameters
```
**Solución**: Revisa los parámetros en `tests/test-config.ts`

---

## 🔐 **Seguridad**

### **⚠️ REGLAS IMPORTANTES**
1. **NUNCA** uses secret keys de mainnet
2. **Solo** usa secret keys de testnet
3. **No compartas** tu secret key
4. **Verifica** que estés en testnet
5. **Usa** un wallet separado para testing

### **Mejores Prácticas**
- Mantén fondos mínimos en el wallet de test
- Revisa todas las transacciones en el explorer
- Limpia el wallet después de testing
- No uses el mismo wallet para mainnet y testnet

---

## 📊 **Métricas de Testing**

### **Cobertura**
- **Total**: 17 funciones on-chain
- **NFT Core**: 3/3 (100%)
- **Marketplace**: 5/5 (100%)
- **Gaming**: 3/3 (100%)
- **DeFi**: 4/4 (100%)
- **Oracle**: 2/2 (100%)

### **Tiempo de Ejecución**
- **Wallet Check**: ~5 segundos
- **Tests Completos**: ~2-3 minutos
- **Por Función**: ~10-15 segundos

---

## 🎉 **¡Listo para Testing!**

Con este sistema puedes verificar que **todas las funciones on-chain de BitcoinBazaar funcionan correctamente** con fondos reales en Stacks Testnet.

### **Próximos Pasos**
1. ✅ Configurar secret key
2. ✅ Obtener fondos de testnet
3. ✅ Ejecutar tests
4. ✅ Verificar resultados
5. ✅ ¡Disfrutar del marketplace!

**¡Happy Testing!** 🚀
