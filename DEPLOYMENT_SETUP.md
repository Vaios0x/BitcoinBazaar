# 🚀 Configuración para Despliegue en Testnet

## 📋 Requisitos Previos

### 1. Obtener STX de Testnet
Necesitas STX en testnet para pagar las tarifas de despliegue (0.137540 STX).

**Opción A: Usar el Faucet de Hiro**
1. Ve a: https://explorer.hiro.so/sandbox/faucet?chain=testnet
2. Conecta tu wallet (Leather/Xverse)
3. Solicita STX de testnet

**Opción B: Usar un mnemonic existente**
Si ya tienes un mnemonic con STX en testnet, úsalo.

### 2. Configurar Mnemonic Real

#### Opción 1: Usar Leather Wallet
1. Abre Leather Wallet
2. Ve a Settings > Show Secret Key
3. Copia el mnemonic (12 o 24 palabras)
4. Reemplaza el mnemonic en `settings/Testnet.toml`

#### Opción 2: Usar Xverse Wallet
1. Abre Xverse Wallet
2. Ve a Settings > Security > Show Secret Recovery Phrase
3. Copia el mnemonic
4. Reemplaza el mnemonic en `settings/Testnet.toml`

### 3. Actualizar settings/Testnet.toml

```toml
[network]
name = "testnet"
stacks_node_rpc_address = "https://api.testnet.hiro.so"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "TU_MNEMONIC_REAL_AQUI"
```

## 🚀 Comandos de Despliegue

### 1. Verificar Configuración
```bash
clarinet check
```

### 2. Generar Plan de Despliegue
```bash
clarinet deployments generate --testnet --medium-cost
```

### 3. Aplicar Despliegue
```bash
clarinet deployments apply --testnet
```

## 📊 Costos de Despliegue

- **bitcoin-oracle**: 40,730 microSTX (0.040730 STX)
- **marketplace**: 56,310 microSTX (0.056310 STX)  
- **nft-core**: 40,500 microSTX (0.040500 STX)
- **Total**: 137,540 microSTX (0.137540 STX)

## 🔍 Verificación Post-Despliegue

### 1. Verificar Contratos en Explorer
- Ve a: https://explorer.hiro.so/?chain=testnet
- Busca las direcciones de los contratos desplegados

### 2. Actualizar Frontend
- Actualizar `src/lib/contracts.ts` con las nuevas direcciones
- Probar transacciones reales en testnet

## ⚠️ Notas Importantes

1. **Seguridad**: Nunca compartas tu mnemonic real
2. **Testnet**: Solo usa STX de testnet, no mainnet
3. **Backup**: Guarda una copia de seguridad de tu mnemonic
4. **Fondos**: Asegúrate de tener suficiente STX para las tarifas

## 🎯 Próximos Pasos

1. Configurar mnemonic real
2. Obtener STX de testnet
3. Ejecutar despliegue
4. Verificar contratos
5. Actualizar frontend
6. Probar transacciones reales

¿Tienes un mnemonic real configurado? Si no, sigue los pasos arriba para obtener STX de testnet.
