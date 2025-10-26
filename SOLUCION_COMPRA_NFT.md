# Solución al Error de Compra de NFT

## 🔴 Problema Identificado

La transacción falla con error `err-not-found` (u201) porque **el NFT no está listado en el marketplace**.

```clarity
(unwrap! (map-get? listings {token-id: token-id}) err-not-found)
```

Los NFTs que ves en `/explore` son datos mock del frontend, no están realmente listados en el contrato blockchain.

## ✅ Solución: Proceso Completo de Compra

### Paso 1: Crear un NFT Real

Primero necesitas mintear un NFT real en la blockchain:

1. Ve a `/create` en BitcoinBazaar
2. Crea un nuevo NFT con:
   - Nombre
   - Descripción
   - Imagen URI
3. Firma la transacción en Leather Wallet
4. Espera a que se confirme la transacción

### Paso 2: Listar el NFT en el Marketplace

Después de crear el NFT, debes listarlo:

**Opción A: Desde el Frontend (Recomendado)**

Necesitas agregar funcionalidad de listing en el frontend. Aquí está el código:

```typescript
// En src/lib/stacks/transactions-simple.ts
export async function listNFTSimple(
  nftId: number,
  price: number,
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  // ... código existente ...
}
```

**Opción B: Usando Clarinet CLI**

```bash
# Listar NFT con ID 1 por 100 STX
clarinet console

# En la consola de Clarinet:
(contract-call? .marketplace-core-simple list-nft u1 u100000000 "STX")
```

### Paso 3: Comprar el NFT

Una vez listado, la compra funcionará:

1. Ve a `/explore`
2. Encuentra el NFT listado
3. Haz clic en "Buy"
4. Confirma la transacción

## 🛠️ Corrección Necesaria en el Frontend

Para evitar este problema, necesitas:

### 1. Filtrar solo NFTs listados en `/explore`

```typescript
// En src/hooks/useNFTs.ts o donde obtengas los NFTs
const listedNFTs = await Promise.all(
  allNFTs.map(async (nft) => {
    const listing = await getListingInfo(nft.id)
    return listing ? { ...nft, ...listing } : null
  })
).then(nfts => nfts.filter(Boolean))
```

### 2. Agregar función para verificar listings

```typescript
// En src/lib/nft-fetcher.ts
export async function getListingInfo(tokenId: number) {
  try {
    const network = getNetwork()
    const contractAddress = getContractAddress('marketplace')
    
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName: 'marketplace-core-simple',
      functionName: 'get-listing',
      functionArgs: [uintCV(tokenId)],
      network,
      senderAddress: contractAddress
    })
    
    const listing = cvToValue(result)
    
    if (listing && listing.status === 'active') {
      return {
        price: Number(listing.price),
        paymentToken: listing['payment-token'],
        seller: listing.seller,
        isListed: true
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting listing:', error)
    return null
  }
}
```

### 3. Mostrar solo NFTs con listings activos

```typescript
// En src/app/explore/page.tsx
const { nfts: allNFTs } = useNFTs()

// Filtrar solo NFTs listados
const listedNFTs = allNFTs.filter(nft => nft.price > 0 && nft.isListed)
```

## 📋 Implementación Rápida

### Archivo: src/components/nft/NFTCard.tsx

Agrega un indicador visual de si el NFT está listado:

```tsx
{nft.price > 0 ? (
  <div className="flex items-center space-x-2">
    <span className="text-xl font-bold text-white">
      {nft.price}
    </span>
    <span className="text-sm text-gray-400">{nft.paymentToken}</span>
  </div>
) : (
  <div className="flex items-center space-x-2">
    <span className="text-lg font-semibold text-gray-500">
      No listado
    </span>
    <span className="text-xs text-gray-600 bg-gray-800 px-2 py-1 rounded">
      No disponible para compra
    </span>
  </div>
)}
```

## 🎯 Solución Inmediata para Testing

Para probar la compra ahora mismo:

1. **Crea un NFT real**:
   ```bash
   # Desde la consola de Clarinet
   (contract-call? .nft-core-simple mint 
     "Test NFT" 
     "Test Description" 
     "https://example.com/image.jpg" 
     u10 
     none)
   ```

2. **Lista el NFT**:
   ```bash
   (contract-call? .marketplace-core-simple list-nft 
     u1 
     u100000000 
     "STX")
   ```

3. **Ahora intenta comprar** desde el frontend

## 🔍 Verificar Listings Existentes

Para ver qué NFTs están listados:

```bash
# En Clarinet console
(contract-call? .marketplace-core-simple get-listing u1)
```

## 📝 Resumen

**El problema NO es el código de compra**, sino que:
- ❌ Los NFTs mock no tienen listings reales en blockchain
- ❌ El frontend muestra NFTs que no están listados
- ✅ Necesitas listar NFTs realmente en el marketplace
- ✅ Filtrar solo NFTs listados en el frontend

**Próximo paso**: Implementar la funcionalidad de listing en el frontend o usar Clarinet para listar NFTs manualmente para testing.

