'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Coins, Star, Zap, Activity } from 'lucide-react'

// Mock analytics data
const stats = {
  totalVolume: { stx: 125000, sbtc: 2.4, usd: 60000 },
  totalSales: 1234,
  activeUsers: 567,
  totalCollections: 89,
  floorPrice: { stx: 45, sbtc: 0.08 },
  averagePrice: { stx: 78, sbtc: 0.12 }
}

const trendingCollections = [
  { id: 1, name: 'Bitcoin Genesis', volume: 2.1, change: 15.2, isPositive: true },
  { id: 2, name: 'Stacks Pioneers', volume: 1.8, change: -5.3, isPositive: false },
  { id: 3, name: 'Lucky Blocks', volume: 1.5, change: 22.1, isPositive: true },
  { id: 4, name: 'Diamond Hands', volume: 1.2, change: 8.7, isPositive: true },
  { id: 5, name: 'Halving Heroes', volume: 0.9, change: -2.1, isPositive: false }
]

const recentActivity = [
  { type: 'sale', nft: 'Bitcoin Genesis #1', price: 0.15, token: 'sBTC', time: '2m ago' },
  { type: 'bid', nft: 'Stacks Pioneer #42', price: 120, token: 'STX', time: '5m ago' },
  { type: 'sale', nft: 'Lucky Block #1000', price: 0.08, token: 'sBTC', time: '8m ago' },
  { type: 'mint', nft: 'Diamond Hands #69', price: 0.2, token: 'sBTC', time: '12m ago' },
  { type: 'sale', nft: 'Halving Hero #2024', price: 0.3, token: 'sBTC', time: '15m ago' }
]

export default function StatsPage() {
  const [timeRange, setTimeRange] = React.useState('24h')
  const [bitcoinBlock, setBitcoinBlock] = React.useState(840000)

  React.useEffect(() => {
    // Simulate Bitcoin block updates
    const interval = setInterval(() => {
      setBitcoinBlock((prev: number) => prev + 1)
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

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
            Marketplace <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Real-time insights into BitcoinBazaar's activity. Track volume, trends, and Bitcoin-native metrics.
          </p>
        </motion.div>

        {/* Bitcoin Block Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-bitcoin-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">₿</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Current Bitcoin Block</h3>
                  <p className="text-2xl font-bold text-bitcoin-500">#{bitcoinBlock.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Lucky Block Status</p>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  bitcoinBlock % 100 === 0 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {bitcoinBlock % 100 === 0 ? 'Lucky Block Active!' : 'Normal Block'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-2">
            {['24h', '7d', '30d', 'All'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
                    : 'glass-card text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Total Volume', 
              value: `$${stats.totalVolume.usd.toLocaleString()}`, 
              change: '+12.5%',
              isPositive: true,
              icon: TrendingUp,
              color: 'text-green-400'
            },
            { 
              label: 'Total Sales', 
              value: stats.totalSales.toLocaleString(), 
              change: '+8.2%',
              isPositive: true,
              icon: Coins,
              color: 'text-stacks-500'
            },
            { 
              label: 'Active Users', 
              value: stats.activeUsers.toLocaleString(), 
              change: '+15.3%',
              isPositive: true,
              icon: Users,
              color: 'text-purple-400'
            },
            { 
              label: 'Collections', 
              value: stats.totalCollections.toString(), 
              change: '+3.1%',
              isPositive: true,
              icon: Star,
              color: 'text-yellow-400'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Volume Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Volume by Token */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Volume by Token</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">₿</span>
                  </div>
                  <span className="text-white font-semibold">sBTC</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{stats.totalVolume.sbtc} sBTC</p>
                  <p className="text-sm text-gray-400">${(stats.totalVolume.sbtc * 25000).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-stacks-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <span className="text-white font-semibold">STX</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{stats.totalVolume.stx.toLocaleString()} STX</p>
                  <p className="text-sm text-gray-400">${(stats.totalVolume.stx * 0.48).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floor Prices */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Floor Prices</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">₿</span>
                  </div>
                  <span className="text-white font-semibold">sBTC Floor</span>
                </div>
                <p className="text-lg font-bold text-white">{stats.floorPrice.sbtc} sBTC</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-stacks-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <span className="text-white font-semibold">STX Floor</span>
                </div>
                <p className="text-lg font-bold text-white">{stats.floorPrice.stx} STX</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trending Collections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Trending Collections</h3>
            <div className="space-y-4">
              {trendingCollections.map((collection, index) => (
                <div key={collection.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <p className="text-white font-semibold">{collection.name}</p>
                      <p className="text-sm text-gray-400">{collection.volume} sBTC volume</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${
                    collection.isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {collection.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{collection.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'sale' ? 'bg-green-500/20' :
                      activity.type === 'bid' ? 'bg-blue-500/20' :
                      'bg-purple-500/20'
                    }`}>
                      {activity.type === 'sale' ? <Coins className="w-4 h-4 text-green-400" /> :
                       activity.type === 'bid' ? <TrendingUp className="w-4 h-4 text-blue-400" /> :
                       <Zap className="w-4 h-4 text-purple-400" />}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{activity.nft}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {activity.price} {activity.token}
                    </p>
                    <p className="text-sm text-gray-400 capitalize">{activity.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bitcoin Integration Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Zap className="w-6 h-6 text-bitcoin-500" />
            <span>Bitcoin Integration Stats</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-bitcoin-500 mb-2">47</p>
              <p className="text-sm text-gray-400">NFTs minted during lucky blocks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-bitcoin-500 mb-2">12.3%</p>
              <p className="text-sm text-gray-400">Average discount from dynamic pricing</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-bitcoin-500 mb-2">156</p>
              <p className="text-sm text-gray-400">Bitcoin blocks with special events</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
