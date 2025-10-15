# 🎨 BitcoinBaazar - Assets & Images

Esta carpeta contiene todos los assets visuales del proyecto BitcoinBaazar.

## 📁 Estructura de Archivos

### **Logos**
- `logo-bitcoinbazaar.svg` - Logo principal en formato SVG
- `logo-bitcoinbazaar.png` - Logo principal en formato PNG (alta resolución)
- `logo-bitcoinbazaar-dark.svg` - Logo para fondos oscuros
- `logo-bitcoinbazaar-light.svg` - Logo para fondos claros
- `logo-bitcoinbazaar-icon.svg` - Icono del logo (solo símbolo)
- `logo-bitcoinbazaar-icon.png` - Icono del logo en PNG

### **Favicons**
- `favicon.ico` - Favicon tradicional
- `favicon-16x16.png` - Favicon 16x16
- `favicon-32x32.png` - Favicon 32x32
- `favicon-192x192.png` - Favicon 192x192
- `favicon-512x512.png` - Favicon 512x512
- `apple-touch-icon.png` - Icono para dispositivos Apple

### **Bitcoin Symbols**
- `bitcoin-symbol.svg` - Símbolo Bitcoin en formato SVG
- `bitcoin-symbol-gold.svg` - Símbolo Bitcoin dorado
- `bitcoin-symbol-animated.svg` - Símbolo Bitcoin animado

### **Stacks Symbols**
- `stacks-symbol.svg` - Símbolo Stacks en formato SVG
- `stacks-symbol-purple.svg` - Símbolo Stacks púrpura
- `stacks-symbol-animated.svg` - Símbolo Stacks animado

### **Backgrounds**
- `background-neural.jpg` - Fondo neural de alta resolución
- `background-cyber.jpg` - Fondo cibernético
- `background-holographic.jpg` - Fondo holográfico
- `background-bitcoin.jpg` - Fondo con temática Bitcoin

### **NFT Placeholders**
- `nft-placeholder-1.jpg` - Placeholder NFT 1
- `nft-placeholder-2.jpg` - Placeholder NFT 2
- `nft-placeholder-3.jpg` - Placeholder NFT 3
- `nft-placeholder-4.jpg` - Placeholder NFT 4

### **Icons**
- `icon-wallet.svg` - Icono de wallet
- `icon-bitcoin.svg` - Icono Bitcoin
- `icon-stacks.svg` - Icono Stacks
- `icon-nft.svg` - Icono NFT
- `icon-auction.svg` - Icono de subasta
- `icon-gaming.svg` - Icono de gaming
- `icon-defi.svg` - Icono DeFi
- `icon-stats.svg` - Icono de estadísticas

### **Social Media**
- `og-image.jpg` - Imagen para Open Graph (1200x630)
- `twitter-card.jpg` - Imagen para Twitter Card (1200x675)
- `linkedin-banner.jpg` - Banner para LinkedIn (1200x627)

## 🎨 Especificaciones Técnicas

### **Formatos Recomendados**
- **SVG**: Para logos, iconos y elementos vectoriales
- **PNG**: Para imágenes con transparencia
- **JPG**: Para fotografías y fondos
- **WebP**: Para optimización web (opcional)

### **Resoluciones**
- **Logo Principal**: 512x512px mínimo
- **Favicons**: 16x16, 32x32, 192x192, 512x512px
- **Social Media**: 1200x630px (Open Graph), 1200x675px (Twitter)
- **Backgrounds**: 1920x1080px mínimo

### **Optimización**
- Comprimir imágenes para web
- Usar formatos modernos (WebP, AVIF)
- Implementar lazy loading
- Usar CDN para assets estáticos

## 🚀 Uso en el Proyecto

```tsx
// Importar assets
import logo from '/images/logo-bitcoinbazaar.svg'
import bitcoinSymbol from '/images/bitcoin-symbol.svg'
import background from '/images/background-neural.jpg'

// Usar en componentes
<img src={logo} alt="BitcoinBaazar Logo" />
<img src={bitcoinSymbol} alt="Bitcoin Symbol" />
<div style={{ backgroundImage: `url(${background})` }} />
```

## 📝 Notas de Diseño

- **Colores Principales**: Bitcoin Orange (#F97316), Stacks Purple (#5546FF)
- **Estilo**: Futurista, cibernético, holográfico
- **Temática**: Bitcoin-native, blockchain, NFT marketplace
- **Audiencia**: Desarrolladores, traders, entusiastas de Bitcoin

## 🔄 Actualizaciones

Mantener esta carpeta actualizada con:
- Nuevos assets del proyecto
- Versiones optimizadas
- Assets para diferentes dispositivos
- Imágenes para marketing y redes sociales
