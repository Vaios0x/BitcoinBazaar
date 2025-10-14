'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, Grid, List } from 'lucide-react'
import { NFTGrid } from '@/components/nft/NFTGrid'
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

  // Filter NFTs based on search and filters
  const filteredNFTs = allNFTs.filter(nft => {
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
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Explore <span className="gradient-text">NFTs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Discover unique NFTs powered by Bitcoin. From Bitcoin-native collections to Stacks pioneers.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search NFTs, collections, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500 rounded-xl"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Filter and View Controls */}
            <div className="flex items-center space-x-4">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 glass-card rounded-xl hover:bg-white/10 transition-all"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex glass-card rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-stacks-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-stacks-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 glass-card rounded-2xl p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Payment Token Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Payment Token</label>
                  <select
                    value={selectedFilters.paymentToken}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, paymentToken: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
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
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
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
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
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
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
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

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing {filteredNFTs.length} of {allNFTs.length} NFTs
            </p>
            <div className="text-sm text-gray-400">
              {selectedFilters.paymentToken !== 'All' && `Filtered by ${selectedFilters.paymentToken} • `}
              {selectedFilters.collection !== 'All' && `${selectedFilters.collection} • `}
              Sorted by {selectedFilters.sortBy}
            </div>
          </div>

          {filteredNFTs.length > 0 ? (
            <NFTGrid 
              nfts={filteredNFTs} 
              showQuickBuy={true}
              columns={viewMode === 'grid' ? 4 : 1}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No NFTs found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedFilters({
                    paymentToken: 'All',
                    priceRange: 'All',
                    collection: 'All',
                    sortBy: 'Recently Listed'
                  })
                }}
                className="px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
