'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Filter, Grid, List, TrendingUp } from 'lucide-react'
import { AuctionCard } from '@/components/auction/AuctionCard'
import { BidModal } from '@/components/auction/BidModal'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'
import type { Auction } from '@/types/nft'

// Mock auction data
const auctions: Auction[] = [
  {
    id: 1,
    nftId: 1,
    seller: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    startingPrice: 0.1,
    currentPrice: 0.15,
    highestBidder: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    endTime: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    auctionType: 'english',
    paymentToken: 'sBTC',
    status: 'active'
  },
  {
    id: 2,
    nftId: 2,
    seller: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    startingPrice: 100,
    currentPrice: 100,
    endTime: Math.floor(Date.now() / 1000) + 172800, // 48 hours
    auctionType: 'dutch',
    paymentToken: 'STX',
    status: 'active'
  },
  {
    id: 3,
    nftId: 3,
    seller: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    startingPrice: 0.05,
    currentPrice: 0.08,
    highestBidder: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR',
    endTime: Math.floor(Date.now() / 1000) - 3600, // Ended 1 hour ago
    auctionType: 'english',
    paymentToken: 'sBTC',
    status: 'ended'
  },
  {
    id: 4,
    nftId: 4,
    seller: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    startingPrice: 0.25,
    currentPrice: 0.32,
    highestBidder: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR',
    endTime: Math.floor(Date.now() / 1000) + 43200, // 12 hours
    auctionType: 'english',
    paymentToken: 'sBTC',
    status: 'active'
  },
  {
    id: 5,
    nftId: 5,
    seller: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR',
    startingPrice: 200,
    currentPrice: 180,
    endTime: Math.floor(Date.now() / 1000) + 7200, // 2 hours
    auctionType: 'dutch',
    paymentToken: 'STX',
    status: 'active'
  },
  {
    id: 6,
    nftId: 6,
    seller: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    startingPrice: 0.15,
    currentPrice: 0.18,
    highestBidder: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    endTime: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    auctionType: 'english',
    paymentToken: 'sBTC',
    status: 'active'
  },
  {
    id: 7,
    nftId: 7,
    seller: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    startingPrice: 0.08,
    currentPrice: 0.12,
    highestBidder: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR',
    endTime: Math.floor(Date.now() / 1000) - 7200, // Ended 2 hours ago
    auctionType: 'english',
    paymentToken: 'sBTC',
    status: 'ended'
  },
  {
    id: 8,
    nftId: 8,
    seller: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR',
    startingPrice: 150,
    currentPrice: 120,
    endTime: Math.floor(Date.now() / 1000) + 14400, // 4 hours
    auctionType: 'dutch',
    paymentToken: 'STX',
    status: 'active'
  },
  {
    id: 9,
    nftId: 9,
    seller: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    startingPrice: 0.3,
    currentPrice: 0.35,
    highestBidder: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    endTime: Math.floor(Date.now() / 1000) + 21600, // 6 hours
    auctionType: 'english',
    paymentToken: 'sBTC',
    status: 'active'
  }
]

const filterOptions = {
  status: ['All', 'Active', 'Ended', 'Starting Soon'],
  auctionType: ['All', 'English', 'Dutch'],
  paymentToken: ['All', 'STX', 'sBTC'],
  sortBy: ['Ending Soon', 'Highest Bid', 'Newest', 'Most Popular']
}

export default function AuctionsPage() {
  const [selectedFilters, setSelectedFilters] = React.useState({
    status: 'All',
    auctionType: 'All',
    paymentToken: 'All',
    sortBy: 'Ending Soon'
  })
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = React.useState(false)
  const [selectedAuction, setSelectedAuction] = React.useState<Auction | null>(null)
  const [isBidModalOpen, setIsBidModalOpen] = React.useState(false)

  // Filter auctions
  const filteredAuctions = auctions.filter(auction => {
    if (selectedFilters.status !== 'All') {
      const now = Math.floor(Date.now() / 1000)
      const isActive = auction.status === 'active' && auction.endTime > now
      const isEnded = auction.status === 'ended' || auction.endTime <= now
      
      if (selectedFilters.status === 'Active' && !isActive) return false
      if (selectedFilters.status === 'Ended' && !isEnded) return false
    }

    if (selectedFilters.auctionType !== 'All') {
      const typeMap = { 'English': 'english', 'Dutch': 'dutch' }
      if (auction.auctionType !== typeMap[selectedFilters.auctionType as keyof typeof typeMap]) return false
    }

    if (selectedFilters.paymentToken !== 'All' && auction.paymentToken !== selectedFilters.paymentToken) {
      return false
    }

    return true
  })

  const handleBid = (auctionId: number, amount: number) => {
    console.log(`Bidding ${amount} on auction ${auctionId}`)
    // Implement bid logic here
  }

  const handleOpenBidModal = (auction: Auction) => {
    setSelectedAuction(auction)
    setIsBidModalOpen(true)
  }

  const handleCloseBidModal = () => {
    setIsBidModalOpen(false)
    setSelectedAuction(null)
  }

  const handlePlaceBid = (auctionId: number, amount: number) => {
    console.log(`Placing bid: ${amount} on auction ${auctionId}`)
    // Implement actual bid placement logic here
    handleBid(auctionId, amount)
  }

  return (
    <div className="min-h-screen -mt-[28rem] pt-0 pb-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Bitcoin Symbols Animation Background */}
      <BitcoinSymbols />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Live <span className="gradient-text">Auctions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Bid on unique NFTs in real-time. English auctions, Dutch auctions, and Bitcoin-native pricing.
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
            { label: 'Active Auctions', value: '12', icon: Clock, color: 'text-green-400' },
            { label: 'Total Volume', value: '2.4 sBTC', icon: TrendingUp, color: 'text-bitcoin-500' },
            { label: 'Highest Bid', value: '0.5 sBTC', icon: TrendingUp, color: 'text-stacks-500' },
            { label: 'Ending Soon', value: '3', icon: Clock, color: 'text-yellow-400' }
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Status</label>
                  <select
                    value={selectedFilters.status}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
                  >
                    {filterOptions.status.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>

                {/* Auction Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Auction Type</label>
                  <select
                    value={selectedFilters.auctionType}
                    onChange={(e) => setSelectedFilters((prev: any) => ({ ...prev, auctionType: e.target.value }))}
                    className="w-full px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
                  >
                    {filterOptions.auctionType.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>

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

        {/* Auctions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing {filteredAuctions.length} of {auctions.length} auctions
            </p>
          </div>

          {filteredAuctions.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredAuctions.map((auction, index) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <AuctionCard 
                    auction={auction} 
                    onBid={handleOpenBidModal}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔨</div>
              <h3 className="text-2xl font-bold text-white mb-2">No auctions found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters</p>
              <button
                onClick={() => setSelectedFilters({
                  status: 'All',
                  auctionType: 'All',
                  paymentToken: 'All',
                  sortBy: 'Ending Soon'
                })}
                className="px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bid Modal */}
      <BidModal
        isOpen={isBidModalOpen}
        onClose={handleCloseBidModal}
        auction={selectedAuction}
        onPlaceBid={handlePlaceBid}
      />
    </div>
  )
}
