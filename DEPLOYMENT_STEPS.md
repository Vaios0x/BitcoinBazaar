# 🚀 **Deployment Steps - Pasos de Despliegue**

## ⚠️ **IMPORTANTE: Configuración Requerida**

### **1. Configurar Mnemónico Real**
Editar `settings/Testnet.toml`:
```toml
[accounts.deployer]
mnemonic = "tu_mnemonic_real_aqui_12_palabras"
```

### **2. Obtener STX de Testnet**
- Ir a: https://explorer.hiro.so/faucet?chain=testnet
- Obtener STX de testnet para deployment

### **3. Ejecutar Deployment**
```bash
# Generar deployment
clarinet deployments generate --testnet --medium-cost

# Aplicar deployment
clarinet deployments apply --testnet
```

## 📋 **Contratos a Desplegar**

### **✅ Contratos Corregidos:**
- **nft-core-fixed** - Contrato NFT con función `mint-with-uri`
- **marketplace-core-simple** - Marketplace para NFTs
- **bitcoin-oracle-simple** - Oracle de precios de Bitcoin

### **🔧 Funciones Disponibles:**

#### **NFT Core Fixed:**
- `mint-with-uri(name, image-uri)` - Crear NFT con imagen
- `mint(name)` - Crear NFT con imagen por defecto
- `transfer(token-id, sender, recipient)` - Transferir NFT
- `burn(token-id)` - Quemar NFT

#### **Marketplace:**
- `list-nft(token-id, price, payment-token)` - Listar NFT
- `buy-nft(token-id)` - Comprar NFT
- `cancel-listing(token-id)` - Cancelar listado

## 🧪 **Testing Después del Deployment**

### **Pasos para Probar:**
1. **Navegar a `/demo`**
2. **Conectar Leather wallet**
3. **Probar "Mint NFT"**
4. **Verificar TX ID** en explorer
5. **Probar otras funciones**

### **Resultados Esperados:**
- ✅ **No más errores** de "transaction rejected"
- ✅ **Transacciones reales** en Stacks Testnet
- ✅ **TX IDs reales** generados
- ✅ **Funciones verificables** en explorer

## 🔗 **Verificación en Explorer**

### **Después del Deployment:**
- **Obtener nuevas direcciones** de contratos
- **Verificar en explorer** que están desplegados
- **Probar funciones** individualmente
- **Verificar TX IDs** generados

### **Enlaces de Verificación:**
- **Explorer Testnet**: https://explorer.hiro.so/?chain=testnet
- **Buscar por dirección** del contrato
- **Verificar funciones** disponibles

## 🎉 **Resultado Final**

### **✅ Después del Deployment:**
- **Contratos funcionando** correctamente
- **Transacciones reales** en Stacks Testnet
- **No más errores** de "transaction rejected"
- **Demo completamente operativo**

**¡El primer marketplace NFT nativo de Bitcoin con contratos corregidos está listo!** 🚀
