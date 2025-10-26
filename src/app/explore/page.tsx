"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, Grid, List, Package } from 'lucide-react'
import { NFTGrid } from '@/components/nft/NFTGrid'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'
import { ShoppingCartModal } from '@/components/cart/ShoppingCartModal'
import { CartButton } from '@/components/cart/CartButton'
import { useNFTs } from '@/hooks/useNFTs'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { useNFTEvents } from '@/contexts/NFTEventsContext'
import type { NFT } from '@/types/nft'

// Mock data for demo
const allNFTs: NFT[] = [
  {
    id: 1,
    name: 'Bitcoin Genesis #1',
    description: 'The first NFT minted on Bitcoin block 840,000',
    imageUri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    price: 0.1,
    paymentToken: 'sBTC',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 10,
    collectionName: 'Bitcoin Genesis Collection',
    collectionId: 1,
    isDynamicPricing: true,
    mintedAtBitcoinBlock: 840000,
    lastSalePrice: 0.08,
    usdPrice: 3200,
  },
  {
    id: 2,
    name: 'Stacks Pioneer #42',
    description: 'A rare NFT from the early days of Stacks',
    imageUri: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop&crop=center',
    price: 150,
    paymentToken: 'STX',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 5,
    collectionName: 'Stacks Pioneers',
    collectionId: 2,
    isDynamicPricing: false,
    lastSalePrice: 120,
    usdPrice: 72,
  },
  {
    id: 3,
    name: 'Lucky Block #1000',
    description: 'Minted during Bitcoin block 840,100 - a lucky block!',
    imageUri: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop&crop=center',
    price: 0.05,
    paymentToken: 'sBTC',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 15,
    collectionName: 'Lucky Blocks',
    collectionId: 3,
    isDynamicPricing: true,
    mintedAtBitcoinBlock: 840100,
    lastSalePrice: 0.045,
    usdPrice: 1800,
  },
  {
    id: 4,
    name: 'Diamond Hands #69',
    description: 'For those who held Bitcoin through the bear market',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    price: 0.2,
    paymentToken: 'sBTC',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 20,
    collectionName: 'Diamond Hands',
    collectionId: 4,
    isDynamicPricing: false,
    lastSalePrice: 0.18,
    usdPrice: 7200,
  },
  {
    id: 5,
    name: 'Halving Hero #2024',
    description: 'Commemorating the 2024 Bitcoin halving',
    imageUri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
    price: 0.3,
    paymentToken: 'sBTC',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 25,
    collectionName: 'Halving Heroes',
    collectionId: 5,
    isDynamicPricing: true,
    mintedAtBitcoinBlock: 840000,
    lastSalePrice: 0.25,
    usdPrice: 12000,
  },
  {
    id: 6,
    name: 'Stacks Builder #1337',
    description: 'For the developers building on Stacks',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    price: 75,
    paymentToken: 'STX',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 8,
    collectionName: 'Stacks Builders',
    collectionId: 6,
    isDynamicPricing: false,
    lastSalePrice: 60,
    usdPrice: 36,
  },
]

const filterOptions = {
  paymentToken: ['All', 'STX', 'sBTC'],
  priceRange: ['All', 'Under 50 STX', '50-200 STX', '200+ STX'],
  collections: ['All', 'Bitcoin Genesis', 'Stacks Pioneers', 'Lucky Blocks', 'Diamond Hands', 'Halving Heroes', 'Stacks Builders'],
  sortBy: ['Recently Listed', 'Price: Low to High', 'Price: High to Low', 'Most Popular']
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedFilters, setSelectedFilters] = React.useState({
    paymentToken: 'All',
    priceRange: 'All',
    collection: 'All',
    sortBy: 'Recently Listed'
  })
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = React.useState(false)
  
  // Shopping cart functionality
  const {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    getCartItemCount
  } = useShoppingCart()

  // Use the custom hook to get NFTs from the contract
  const { nfts: contractNFTs, loading, error, refreshNFTs, isPolling, lastTokenId, addNFT } = useNFTs()
  
  // Use NFT events for real-time updates
  const { hasNewEvents, markEventsAsRead, getLatestEvent } = useNFTEvents()

  // Combine contract NFTs with mock data for demo
  const allNFTsCombined = [...contractNFTs, ...allNFTs]

  // Mark events as read when user interacts with the page
  React.useEffect(() => {
    if (hasNewEvents) {
      const timer = setTimeout(() => {
        markEventsAsRead()
      }, 5000) // Auto-mark as read after 5 seconds
      
      return () => clearTimeout(timer)
    }
  }, [hasNewEvents, markEventsAsRead])

  // Auto-refresh when new events are detected
  React.useEffect(() => {
    if (hasNewEvents) {
      refreshNFTs()
    }
  }, [hasNewEvents, refreshNFTs])

  // Filter NFTs based on search and filters
  const filteredNFTs = allNFTsCombined.filter(nft => {
    // Only show NFTs that have a price (are available for purchase)
    if (nft.price <= 0) {
      return false
    }

    // Search filter
    if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !nft.collectionName?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Payment token filter
    if (selectedFilters.paymentToken !== 'All' && nft.paymentToken !== selectedFilters.paymentToken) {
      return false
    }

    // Collection filter
    if (selectedFilters.collection !== 'All' && nft.collectionName !== selectedFilters.collection) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen -mt-[20rem] sm:-mt-[24rem] lg:-mt-[28rem] pt-0 pb-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Bitcoin Symbols Animation Background */}
      <BitcoinSymbols />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Enhanced Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 relative">
            Explore <span className="gradient-text relative">
              NFTs
              {/* Floating Bitcoin symbol near the text */}
              <motion.span
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-bitcoin-500 text-xl sm:text-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ₿
              </motion.span>
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl">
            Discover unique NFTs powered by Bitcoin. From Bitcoin-native collections to Stacks pioneers.
          </p>
        </motion.div>

        {/* Search and Filters - Enhanced Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar - Enhanced Responsive */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search NFTs, collections, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 pr-4 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500 rounded-xl text-sm sm:text-base"
                />
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>

            {/* Filter and View Controls - Enhanced Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-4 w-full lg:w-auto">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 glass-card rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex glass-card rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-stacks-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-stacks-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Shopping Cart Button */}
              <CartButton
                itemCount={getCartItemCount()}
                onClick={openCart}
              />
            </div>
          </div>

          {/* Filter Panel - Enhanced Responsive */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 glass-card rounded-2xl p-4 sm:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Payment Token Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Payment Token</label>
                  <select
                    value={selectedFilters.paymentToken}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, paymentToken: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none text-sm"
                  >
                    {filterOptions.paymentToken.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Price Range</label>
                  <select
                    value={selectedFilters.priceRange}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none text-sm"
                  >
                    {filterOptions.priceRange.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>

                {/* Collection Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Collection</label>
                  <select
                    value={selectedFilters.collection}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, collection: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none text-sm"
                  >
                    {filterOptions.collections.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Sort By</label>
                  <select
                    value={selectedFilters.sortBy}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none text-sm"
                  >
                    {filterOptions.sortBy.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results - Enhanced Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
            <p className="text-gray-400 text-sm sm:text-base">
              Showing {filteredNFTs.length} of {allNFTsCombined.length} NFTs
            </p>
            <div className="text-xs sm:text-sm text-gray-400">
              {selectedFilters.paymentToken !== 'All' && `Filtered by ${selectedFilters.paymentToken} • `}
              {selectedFilters.collection !== 'All' && `${selectedFilters.collection} • `}
              Sorted by {selectedFilters.sortBy}
              <button
                onClick={refreshNFTs}
                className="ml-2 px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs transition-colors"
              >
                🔄 Refresh
              </button>
              {isPolling && (
                <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                  🔄 Auto-updating
                </span>
              )}
              {hasNewEvents && (
                <span className="ml-2 px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs animate-pulse">
                  ✨ New NFTs!
                </span>
              )}
              <span className="ml-2 px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                🌐 Public NFTs
              </span>
            </div>
          </div>

          {/* Public NFTs Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🌐</span>
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold">NFTs Públicos</h3>
                <p className="text-gray-300 text-sm">
                  Todos los NFTs creados en BitcoinBazaar son visibles públicamente para usuarios con wallet conectado. 
                  Los NFTs se sincronizan automáticamente entre todos los usuarios.
                </p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="loading-dots mb-4">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p className="text-gray-400">Cargando NFTs desde la blockchain...</p>
                <p className="text-gray-500 text-sm mt-2">Conectando con contrato nft-core-simple</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <div>
                  <h3 className="text-red-400 font-semibold">Error al cargar NFTs</h3>
                  <p className="text-gray-300 text-sm">{error}</p>
                  <button
                    onClick={refreshNFTs}
                    className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NFT Grid */}
          {!loading && !error && filteredNFTs.length > 0 ? (
            <NFTGrid 
              nfts={filteredNFTs} 
              showQuickBuy={true}
              columns={viewMode === 'grid' ? 4 : 1}
              onAddToCart={addToCart}
            />
          ) : !loading && !error ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {allNFTsCombined.length === 0 ? 'No hay NFTs disponibles' : 'No hay NFTs listados'}
              </h3>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                {allNFTsCombined.length === 0 
                  ? 'Los NFTs aparecerán aquí cuando se creen'
                  : 'Los NFTs deben estar listados para aparecer aquí. Ve a "Mis NFTs" para listar tus NFTs.'
                }
              </p>
              {allNFTsCombined.length > 0 && (
                <motion.a
                  href="/my-nfts"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Package className="w-4 h-4" />
                  <span>Mis NFTs</span>
                </motion.a>
              )}
              <motion.button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedFilters({
                    paymentToken: 'All',
                    priceRange: 'All',
                    collection: 'All',
                    sortBy: 'Recently Listed'
                  })
                }}
                className="ml-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all relative overflow-hidden text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Limpiar Filtros</span>
              </motion.button>
            </div>
          ) : null}
        </motion.div>
      </div>

      {/* Shopping Cart Modal */}
      <ShoppingCartModal
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  )
}
