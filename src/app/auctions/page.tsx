'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, TrendingUp, Flame, Gavel, Timer } from 'lucide-react'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'

// Mock auction data
const auctions = [
  {
    id: '1',
    name: 'Genesis Bitcoin Block #1',
    description: 'The very first Bitcoin block ever mined. A piece of cryptocurrency history.',
    imageUri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    currentBid: 2.5,
    reservePrice: 1.0,
    timeLeft: '2d 14h 32m',
    bidders: 47,
    paymentToken: 'sBTC',
    verified: true,
    rarity: 'Legendary'
  },
  {
    id: '2',
    name: 'Satoshi\'s First Transaction',
    description: 'The first Bitcoin transaction ever made by Satoshi Nakamoto.',
    imageUri: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop&crop=center',
    currentBid: 1.8,
    reservePrice: 0.5,
    timeLeft: '1d 8h 15m',
    bidders: 23,
    paymentToken: 'sBTC',
    verified: true,
    rarity: 'Mythic'
  },
  {
    id: '3',
    name: 'Bitcoin Pizza Day NFT',
    description: 'Commemorating the famous 10,000 BTC pizza purchase.',
    imageUri: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop&crop=center',
    currentBid: 0.8,
    reservePrice: 0.3,
    timeLeft: '5h 42m',
    bidders: 12,
    paymentToken: 'sBTC',
    verified: false,
    rarity: 'Epic'
  },
  {
    id: '4',
    name: 'Halving Event #1',
    description: 'The first Bitcoin halving event that changed the mining landscape.',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    currentBid: 3.2,
    reservePrice: 2.0,
    timeLeft: '3d 12h 8m',
    bidders: 89,
    paymentToken: 'sBTC',
    verified: true,
    rarity: 'Legendary'
  },
  {
    id: '5',
    name: 'Mt. Gox Era NFT',
    description: 'A reminder of Bitcoin\'s early exchange days and lessons learned.',
    imageUri: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=400&h=400&fit=crop&crop=center',
    currentBid: 1.2,
    reservePrice: 0.8,
    timeLeft: '6h 25m',
    bidders: 34,
    paymentToken: 'sBTC',
    verified: true,
    rarity: 'Rare'
  },
  {
    id: '6',
    name: 'Bitcoin Whitepaper NFT',
    description: 'The original Bitcoin whitepaper as an NFT. Digital history preserved.',
    imageUri: 'https://images.unsplash.com/photo-1614732489823-cf610c62399c?w=400&h=400&fit=crop&crop=center',
    currentBid: 5.1,
    reservePrice: 3.0,
    timeLeft: '4d 2h 18m',
    bidders: 156,
    paymentToken: 'sBTC',
    verified: true,
    rarity: 'Mythic'
  }
]

const rarityColors = {
  'Common': 'text-gray-400',
  'Rare': 'text-blue-400',
  'Epic': 'text-purple-400',
  'Legendary': 'text-orange-400',
  'Mythic': 'text-red-400'
}

export default function AuctionsPage() {
  const [selectedFilter, setSelectedFilter] = React.useState('all')
  const [sortBy, setSortBy] = React.useState('timeLeft')

  const filteredAuctions = auctions.filter(auction => {
    if (selectedFilter === 'ending-soon') {
      return auction.timeLeft.includes('h') && !auction.timeLeft.includes('d')
    }
    if (selectedFilter === 'high-bids') {
      return auction.currentBid > 2.0
    }
    if (selectedFilter === 'verified') {
      return auction.verified
    }
    return true
  })

  return (
    <div className="min-h-screen relative">
      {/* Bitcoin Symbols Animation Background */}
      <BitcoinSymbols />
      
      {/* Hero Section - Enhanced Responsive */}
      <section className="relative -mt-[24rem] sm:-mt-[28rem] lg:-mt-[32rem] pt-0 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
              Live <span className="gradient-text">Auctions</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
              Bid on exclusive Bitcoin-native NFTs. From Genesis blocks to historical moments, 
              own a piece of cryptocurrency history.
            </p>
            
            {/* Auction Stats - Enhanced Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center">
                <Gavel className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-white">24</div>
                <div className="text-xs sm:text-sm text-gray-400">Active Auctions</div>
              </div>
              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-white">15.2</div>
                <div className="text-xs sm:text-sm text-gray-400">sBTC Volume</div>
              </div>
              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-white">342</div>
                <div className="text-xs sm:text-sm text-gray-400">Active Bidders</div>
              </div>
              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-white">8</div>
                <div className="text-xs sm:text-sm text-gray-400">Ending Soon</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls - Enhanced Responsive */}
      <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { key: 'all', label: 'All Auctions' },
                  { key: 'ending-soon', label: 'Ending Soon' },
                  { key: 'high-bids', label: 'High Bids' },
                  { key: 'verified', label: 'Verified Only' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${
                      selectedFilter === filter.key
                        ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
                        : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none text-sm sm:text-base"
              >
                <option value="timeLeft">Time Left</option>
                <option value="currentBid">Highest Bid</option>
                <option value="bidders">Most Bidders</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </motion.div>

          {/* Auctions Grid - Enhanced Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredAuctions.map((auction, index) => (
              <motion.div
                key={auction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-stacks-500/20 transition-all duration-300"
              >
                {/* Auction Image */}
                <div className="relative h-48 sm:h-56">
                  <img
                    src={auction.imageUri}
                    alt={auction.name}
                    className="w-full h-full object-cover"
                  />
                  {auction.verified && (
                    <div className="absolute top-3 right-3 px-2 py-1 glass-card rounded-full">
                      <span className="text-xs font-semibold text-white">✓ Verified</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 px-2 py-1 glass-card rounded-full">
                    <span className={`text-xs font-semibold ${rarityColors[auction.rarity as keyof typeof rarityColors]}`}>
                      {auction.rarity}
                    </span>
                  </div>
                </div>

                {/* Auction Info */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{auction.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{auction.description}</p>

                  {/* Current Bid */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Current Bid</span>
                      <span className="text-sm text-gray-400">Reserve Price</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl sm:text-3xl font-bold text-bitcoin-500">
                        {auction.currentBid} {auction.paymentToken}
                      </div>
                      <div className="text-lg font-semibold text-white">
                        {auction.reservePrice} {auction.paymentToken}
                      </div>
                    </div>
                  </div>

                  {/* Time Left and Bidders */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-400">Time Left</p>
                        <p className="text-sm font-semibold text-white">{auction.timeLeft}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-400">Bidders</p>
                        <p className="text-sm font-semibold text-white">{auction.bidders}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bid Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all">
                    Place Bid
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Auctions Found */}
          {filteredAuctions.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">🔨</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No auctions found</h3>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Try adjusting your filters</p>
              <button
                onClick={() => setSelectedFilter('all')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}