'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, BarChart3, PieChart, LineChart } from 'lucide-react'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'

// Mock stats data
const marketStats = {
  totalVolume: 45.2,
  volumeChange: 12.5,
  totalSales: 1247,
  salesChange: 8.3,
  averagePrice: 0.036,
  priceChange: -2.1,
  activeUsers: 3421,
  usersChange: 15.7
}

const topCollections = [
  { name: 'Bitcoin Genesis Collection', volume: 12.4, change: 8.2, floorPrice: 0.15 },
  { name: 'Stacks Pioneers', volume: 8.7, change: -3.1, floorPrice: 0.08 },
  { name: 'Halving Heroes', volume: 6.2, change: 15.3, floorPrice: 0.12 },
  { name: 'Diamond Hands', volume: 4.8, change: 22.1, floorPrice: 0.09 },
  { name: 'Lucky Blocks', volume: 3.9, change: -5.7, floorPrice: 0.06 }
]

const recentActivity = [
  { type: 'sale', nft: 'Genesis Block #1', price: 2.5, time: '2m ago', user: '0x1234...5678' },
  { type: 'bid', nft: 'Satoshi Transaction', price: 1.8, time: '5m ago', user: '0x9876...5432' },
  { type: 'sale', nft: 'Bitcoin Pizza Day', price: 0.8, time: '12m ago', user: '0x4567...8901' },
  { type: 'bid', nft: 'Halving Event #1', price: 3.2, time: '18m ago', user: '0x2345...6789' },
  { type: 'sale', nft: 'Mt. Gox Era', price: 1.2, time: '25m ago', user: '0x7890...1234' }
]

const priceHistory = [
  { date: '2024-01-01', price: 0.025 },
  { date: '2024-01-02', price: 0.028 },
  { date: '2024-01-03', price: 0.031 },
  { date: '2024-01-04', price: 0.029 },
  { date: '2024-01-05', price: 0.033 },
  { date: '2024-01-06', price: 0.036 },
  { date: '2024-01-07', price: 0.034 }
]

export default function StatsPage() {
  const [timeRange, setTimeRange] = React.useState('7d')
  const [selectedMetric, setSelectedMetric] = React.useState('volume')

  return (
    <div className="min-h-screen relative">
      {/* Bitcoin Symbols Animation Background */}
      <BitcoinSymbols />
      
      {/* Hero Section - Enhanced Responsive */}
      <section className="relative -mt-[20rem] sm:-mt-[24rem] lg:-mt-[28rem] pt-0 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
              Market <span className="gradient-text">Analytics</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
              Real-time insights into BitcoinBazaar's activity. Track volume, trends, 
              and Bitcoin-native metrics.
            </p>
            
            {/* Time Range Selector */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
                      : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Stats Grid - Enhanced Responsive */}
      <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {/* Total Volume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-bitcoin-500" />
                {marketStats.volumeChange > 0 ? (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {marketStats.totalVolume} sBTC
              </div>
              <div className="text-sm text-gray-400 mb-1">Total Volume</div>
              <div className={`text-xs font-semibold ${
                marketStats.volumeChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {marketStats.volumeChange > 0 ? '+' : ''}{marketStats.volumeChange}%
              </div>
            </motion.div>

            {/* Total Sales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-stacks-500" />
                {marketStats.salesChange > 0 ? (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {marketStats.totalSales.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mb-1">Total Sales</div>
              <div className={`text-xs font-semibold ${
                marketStats.salesChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {marketStats.salesChange > 0 ? '+' : ''}{marketStats.salesChange}%
              </div>
            </motion.div>

            {/* Average Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                {marketStats.priceChange > 0 ? (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {marketStats.averagePrice} sBTC
              </div>
              <div className="text-sm text-gray-400 mb-1">Average Price</div>
              <div className={`text-xs font-semibold ${
                marketStats.priceChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {marketStats.priceChange > 0 ? '+' : ''}{marketStats.priceChange}%
              </div>
            </motion.div>

            {/* Active Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                {marketStats.usersChange > 0 ? (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {marketStats.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mb-1">Active Users</div>
              <div className={`text-xs font-semibold ${
                marketStats.usersChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {marketStats.usersChange > 0 ? '+' : ''}{marketStats.usersChange}%
              </div>
            </motion.div>
          </motion.div>

          {/* Charts and Data Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Price Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white">Price History</h3>
                <LineChart className="w-5 h-5 sm:w-6 sm:h-6 text-stacks-500" />
              </div>
              <div className="h-48 bg-gradient-to-r from-bitcoin-500/20 to-stacks-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {marketStats.averagePrice} sBTC
                  </div>
                  <div className="text-sm text-gray-400">Average Price (7d)</div>
                </div>
              </div>
            </motion.div>

            {/* Top Collections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white">Top Collections</h3>
                <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-stacks-500" />
              </div>
              <div className="space-y-3">
                {topCollections.map((collection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white">{collection.name}</div>
                      <div className="text-xs text-gray-400">Floor: {collection.floorPrice} sBTC</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-bold text-bitcoin-500">{collection.volume} sBTC</div>
                      <div className={`text-xs font-semibold ${
                        collection.change > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {collection.change > 0 ? '+' : ''}{collection.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card p-4 sm:p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">Recent Activity</h3>
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-stacks-500" />
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'sale' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white">{activity.nft}</div>
                      <div className="text-xs text-gray-400">{activity.user} • {activity.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-bold text-bitcoin-500">
                      {activity.price} sBTC
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{activity.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}