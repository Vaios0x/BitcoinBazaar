'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Star, Filter, Grid, List } from 'lucide-react'
import type { Collection } from '@/types/nft'

// Mock collection data
const collections: Collection[] = [
  {
    id: 1,
    name: 'Bitcoin Genesis Collection',
    description: 'The first NFTs minted on Bitcoin blocks. Each NFT represents a milestone in Bitcoin history.',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    bannerUri: 'https://via.placeholder.com/800x200/5546FF/FFFFFF?text=Bitcoin+Genesis',
    verified: true,
    totalNfts: 100,
    floorPrice: 0.1,
    totalVolume: 2.4
  },
  {
    id: 2,
    name: 'Stacks Pioneers',
    description: 'Early adopters and builders of the Stacks ecosystem. Rare NFTs for the visionaries.',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    bannerUri: 'https://via.placeholder.com/800x200/F97316/FFFFFF?text=Stacks+Pioneers',
    verified: true,
    totalNfts: 250,
    floorPrice: 50,
    totalVolume: 12.5
  },
  {
    id: 3,
    name: 'Lucky Blocks',
    description: 'NFTs minted during special Bitcoin blocks. Every 100th block brings unique opportunities.',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    bannerUri: 'https://via.placeholder.com/800x200/10B981/FFFFFF?text=Lucky+Blocks',
    verified: false,
    totalNfts: 50,
    floorPrice: 0.05,
    totalVolume: 0.8
  },
  {
    id: 4,
    name: 'Diamond Hands',
    description: 'For those who held Bitcoin through the bear market. Proof of conviction and belief.',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    bannerUri: 'https://via.placeholder.com/800x200/8B5CF6/FFFFFF?text=Diamond+Hands',
    verified: true,
    totalNfts: 75,
    floorPrice: 0.2,
    totalVolume: 3.2
  },
  {
    id: 5,
    name: 'Halving Heroes',
    description: 'Commemorating Bitcoin halving events. Historical moments captured as NFTs.',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    bannerUri: 'https://via.placeholder.com/800x200/F59E0B/FFFFFF?text=Halving+Heroes',
    verified: true,
    totalNfts: 25,
    floorPrice: 0.3,
    totalVolume: 1.5
  },
  {
    id: 6,
    name: 'Stacks Builders',
    description: 'For developers building the future on Stacks. Technical excellence and innovation.',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    bannerUri: 'https://via.placeholder.com/800x200/EF4444/FFFFFF?text=Stacks+Builders',
    verified: false,
    totalNfts: 150,
    floorPrice: 25,
    totalVolume: 5.8
  }
]

const filterOptions = {
  verified: ['All', 'Verified Only', 'Unverified'],
  sortBy: ['Volume', 'Floor Price', 'Recently Created', 'Most Popular'],
  paymentToken: ['All', 'STX', 'sBTC']
}

export default function CollectionsPage() {
  const [selectedFilters, setSelectedFilters] = React.useState({
    verified: 'All',
    sortBy: 'Volume',
    paymentToken: 'All'
  })
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = React.useState(false)

  // Filter collections
  const filteredCollections = collections.filter(collection => {
    if (selectedFilters.verified === 'Verified Only' && !collection.verified) return false
    if (selectedFilters.verified === 'Unverified' && collection.verified) return false
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
            NFT <span className="gradient-text">Collections</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Discover curated collections of Bitcoin-native NFTs. From Genesis blocks to Stacks pioneers.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Collections', value: '89', icon: Star, color: 'text-stacks-500' },
            { label: 'Verified Collections', value: '45', icon: Star, color: 'text-green-400' },
            { label: 'Total Volume', value: '25.2 sBTC', icon: TrendingUp, color: 'text-bitcoin-500' },
            { label: 'Active Creators', value: '156', icon: Users, color: 'text-purple-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card p-4 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
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

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 glass-card rounded-2xl p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Verified Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Verification</label>
                  <select
                    value={selectedFilters.verified}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, verified: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
                  >
                    {filterOptions.verified.map(option => (
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

                {/* Payment Token */}
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
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing {filteredCollections.length} of {collections.length} collections
            </p>
          </div>

          {filteredCollections.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-stacks-500/20 transition-all duration-300"
                >
                  {/* Collection Banner */}
                  <div className="relative h-32 bg-gradient-to-r from-bitcoin-500 to-stacks-500">
                    <img
                      src={collection.bannerUri}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                    {collection.verified && (
                      <div className="absolute top-4 right-4 px-3 py-1 glass-card rounded-full">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs font-semibold text-white">Verified</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Collection Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Floor Price</p>
                        <p className="text-lg font-semibold text-white">
                          {collection.floorPrice} {collection.floorPrice < 1 ? 'sBTC' : 'STX'}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {collection.description}
                    </p>

                    {/* Collection Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Total NFTs</p>
                        <p className="text-sm font-semibold text-white">{collection.totalNfts}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Volume</p>
                        <p className="text-sm font-semibold text-white">
                          {collection.totalVolume} {collection.totalVolume < 10 ? 'sBTC' : 'STX'}
                        </p>
                      </div>
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₿</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Creator</p>
                          <p className="text-sm font-semibold text-white">
                            {collection.creator.slice(0, 6)}...{collection.creator.slice(-4)}
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all">
                        View Collection
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">No collections found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters</p>
              <button
                onClick={() => setSelectedFilters({
                  verified: 'All',
                  sortBy: 'Volume',
                  paymentToken: 'All'
                })}
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
