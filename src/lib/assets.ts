/**
 * BitcoinBaazar - Assets Configuration
 * Configuración centralizada de todos los assets del proyecto
 */

// Logo Assets
export const LOGO_ASSETS = {
  main: '/images/logo-bitcoinbazaar.png',
  mainPNG: '/images/logo-bitcoinbazaar.png',
  dark: '/images/logo-bitcoinbazaar.png',
  light: '/images/logo-bitcoinbazaar.png',
  icon: '/images/logo-bitcoinbazaar.png',
  iconPNG: '/images/logo-bitcoinbazaar.png',
} as const

// Favicon Assets
export const FAVICON_ASSETS = {
  ico: '/images/favicon.ico',
  png16: '/images/favicon-16x16.png',
  png32: '/images/favicon-32x32.png',
  png192: '/images/favicon-192x192.png',
  png512: '/images/favicon-512x512.png',
  apple: '/images/apple-touch-icon.png',
} as const

// Bitcoin Symbols
export const BITCOIN_SYMBOLS = {
  default: '/images/bitcoin-symbol.svg',
  gold: '/images/bitcoin-symbol-gold.svg',
  animated: '/images/bitcoin-symbol-animated.svg',
} as const

// Stacks Symbols
export const STACKS_SYMBOLS = {
  default: '/images/stacks-symbol.svg',
  purple: '/images/stacks-symbol-purple.svg',
  animated: '/images/stacks-symbol-animated.svg',
} as const

// Background Assets
export const BACKGROUND_ASSETS = {
  neural: '/images/background-neural.jpg',
  cyber: '/images/background-cyber.jpg',
  holographic: '/images/background-holographic.jpg',
  bitcoin: '/images/background-bitcoin.jpg',
} as const

// NFT Placeholders
export const NFT_PLACEHOLDERS = {
  placeholder1: '/images/nft-placeholder-1.jpg',
  placeholder2: '/images/nft-placeholder-2.jpg',
  placeholder3: '/images/nft-placeholder-3.jpg',
  placeholder4: '/images/nft-placeholder-4.jpg',
} as const

// Icon Assets
export const ICON_ASSETS = {
  wallet: '/images/icon-wallet.svg',
  bitcoin: '/images/icon-bitcoin.svg',
  stacks: '/images/icon-stacks.svg',
  nft: '/images/icon-nft.svg',
  auction: '/images/icon-auction.svg',
  gaming: '/images/icon-gaming.svg',
  defi: '/images/icon-defi.svg',
  stats: '/images/icon-stats.svg',
} as const

// Social Media Assets
export const SOCIAL_ASSETS = {
  ogImage: '/images/og-image.jpg',
  twitterCard: '/images/twitter-card.jpg',
  linkedinBanner: '/images/linkedin-banner.jpg',
} as const

// Asset Dimensions
export const ASSET_DIMENSIONS = {
  logo: { width: 512, height: 512 },
  favicon: { width: 32, height: 32 },
  ogImage: { width: 1200, height: 630 },
  twitterCard: { width: 1200, height: 675 },
  linkedinBanner: { width: 1200, height: 627 },
  background: { width: 1920, height: 1080 },
} as const

// Asset Alt Texts
export const ASSET_ALT_TEXTS = {
  logo: 'BitcoinBaazar - Bitcoin-Native NFT Marketplace',
  bitcoinSymbol: 'Bitcoin Symbol',
  stacksSymbol: 'Stacks Symbol',
  wallet: 'Wallet Icon',
  nft: 'NFT Icon',
  auction: 'Auction Icon',
  gaming: 'Gaming Icon',
  defi: 'DeFi Icon',
  stats: 'Statistics Icon',
} as const

// Asset Loading States
export const ASSET_LOADING_STATES = {
  loading: 'Loading...',
  error: 'Failed to load image',
  placeholder: 'Image placeholder',
} as const

// Asset Optimization Settings
export const ASSET_OPTIMIZATION = {
  quality: 85,
  format: 'webp' as const,
  lazy: true,
  priority: false,
} as const

// Export all assets
export const ALL_ASSETS = {
  logo: LOGO_ASSETS,
  favicon: FAVICON_ASSETS,
  bitcoin: BITCOIN_SYMBOLS,
  stacks: STACKS_SYMBOLS,
  backgrounds: BACKGROUND_ASSETS,
  nftPlaceholders: NFT_PLACEHOLDERS,
  icons: ICON_ASSETS,
  social: SOCIAL_ASSETS,
} as const

// Utility function to get asset path
export const getAssetPath = (category: keyof typeof ALL_ASSETS, asset: string): string => {
  const categoryAssets = ALL_ASSETS[category] as Record<string, string>
  return categoryAssets[asset] || ''
}

// Utility function to get asset with fallback
export const getAssetWithFallback = (
  category: keyof typeof ALL_ASSETS,
  asset: string,
  fallback: string = '/images/placeholder.svg'
): string => {
  const assetPath = getAssetPath(category, asset)
  return assetPath || fallback
}

// Utility function to preload critical assets
export const getCriticalAssets = (): string[] => [
  LOGO_ASSETS.main,
  BITCOIN_SYMBOLS.default,
  STACKS_SYMBOLS.default,
  BACKGROUND_ASSETS.neural,
]

// Utility function to get asset metadata
export const getAssetMetadata = (path: string) => {
  const filename = path.split('/').pop()?.split('.')[0] || ''
  const extension = path.split('.').pop() || ''
  
  return {
    filename,
    extension,
    path,
    isSVG: extension === 'svg',
    isPNG: extension === 'png',
    isJPG: extension === 'jpg' || extension === 'jpeg',
    isWebP: extension === 'webp',
  }
}

export default ALL_ASSETS
