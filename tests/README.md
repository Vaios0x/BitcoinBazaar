# 🧪 BitcoinBazaar - On-Chain Testing Suite

Sistema completo de testing para verificar todas las funciones on-chain de BitcoinBazaar con fondos reales en Stacks Testnet.

## 🚀 **Configuración Rápida**

### **1. Obtener Secret Key de Leather**

1. Abre **Leather wallet** en tu navegador
2. Ve a **Settings** (⚙️)
3. Selecciona **"Export Private Key"**
4. Copia tu **secret key**
5. Reemplaza `YOUR_LEATHER_SECRET_KEY_HERE` en `tests/run-all-tests.ts`

### **2. Obtener Fondos de Testnet**

```bash
# Ir al faucet de Stacks Testnet
https://explorer.hiro.so/faucet?chain=testnet

# Solicitar STX (necesitas al menos 1 STX para testing)
```

### **3. Ejecutar Tests**

```bash
# Ejecutar todos los tests
npm run test:integration

# Solo verificar wallet
npm run test:wallet

# Solo tests on-chain
npm run test:onchain
```

---

## 🎯 **Funciones Testeadas**

### **🎨 NFT Core (3 funciones)**
- ✅ **Mint NFT** - Crear nuevos NFTs
- ✅ **Transfer NFT** - Transferir NFTs entre wallets
- ✅ **Burn NFT** - Quemar NFTs

### **🏪 Marketplace (5 funciones)**
- ✅ **List NFT** - Listar NFTs para venta
- ✅ **Buy NFT** - Comprar NFTs
- ✅ **Cancel Listing** - Cancelar listados
- ✅ **Make Offer** - Hacer ofertas
- ✅ **Accept Offer** - Aceptar ofertas

### **🎮 Gaming (3 funciones)**
- ✅ **Create Battle** - Crear batallas entre NFTs
- ✅ **Execute Battle** - Ejecutar batallas
- ✅ **Claim Reward** - Reclamar recompensas

### **💰 DeFi (4 funciones)**
- ✅ **Stake NFT** - Hacer stake de NFTs
- ✅ **Unstake NFT** - Retirar stake
- ✅ **Borrow Against NFT** - Pedir préstamos contra NFTs
- ✅ **Repay Loan** - Pagar préstamos

### **🔮 Bitcoin Oracle (2 funciones)**
- ✅ **Update Bitcoin Price** - Actualizar precio de Bitcoin
- ✅ **Get Bitcoin Price** - Obtener precio actual

---

## 📊 **Resultados de Testing**

### **Formato de Salida**
```
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
- Logs en consola con enlaces al explorer

---

## 🔧 **Configuración Avanzada**

### **Variables de Entorno**
```bash
# En tests/test-config.ts
export const TEST_CONFIG = {
  network: {
    coreApiUrl: 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so'
  },
  testing: {
    minStxBalance: 1.0,
    testTimeout: 30000,
    retryAttempts: 3
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

### **Error: "Wallet not connected"**
- Verifica que tu secret key esté configurada correctamente
- Asegúrate de que el wallet tenga fondos suficientes

### **Error: "Insufficient funds"**
- Ve al faucet: https://explorer.hiro.so/faucet?chain=testnet
- Solicita STX de testnet
- Espera a que se confirme la transacción

### **Error: "Contract not found"**
- Verifica que los contratos estén desplegados
- Revisa las direcciones en `tests/test-config.ts`

### **Error: "Transaction failed"**
- Revisa los logs para el error específico
- Verifica que los parámetros sean correctos
- Asegúrate de que el contrato esté activo

---

## 📈 **Métricas de Testing**

### **Cobertura de Funciones**
- **Total**: 17 funciones on-chain
- **NFT Core**: 3/3 (100%)
- **Marketplace**: 5/5 (100%)
- **Gaming**: 3/3 (100%)
- **DeFi**: 4/4 (100%)
- **Oracle**: 2/2 (100%)

### **Tiempo de Ejecución**
- **Wallet Check**: ~5 segundos
- **NFT Tests**: ~30 segundos
- **Marketplace Tests**: ~45 segundos
- **Gaming Tests**: ~20 segundos
- **DeFi Tests**: ~35 segundos
- **Oracle Tests**: ~10 segundos
- **Total**: ~2-3 minutos

---

## 🔐 **Seguridad**

### **⚠️ IMPORTANTE**
- **NUNCA** uses tu secret key de mainnet para testing
- **Solo** usa secret keys de testnet
- **No compartas** tu secret key con nadie
- **Verifica** que estés en testnet antes de ejecutar

### **Mejores Prácticas**
- Usa un wallet separado para testing
- Mantén fondos mínimos en el wallet de test
- Revisa todas las transacciones en el explorer
- Limpia el wallet después de testing

---

## 🎉 **¡Listo para Testing!**

Con este sistema puedes verificar que **todas las funciones on-chain de BitcoinBazaar funcionan correctamente** con fondos reales en Stacks Testnet.

**¡Happy Testing!** 🚀
