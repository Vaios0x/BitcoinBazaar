'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, TrendingUp, Zap } from 'lucide-react'
import type { Auction } from '@/types/nft'

interface AuctionCardProps {
  auction: Auction
  onBid?: (auctionId: number, amount: number) => void
}

export function AuctionCard({ auction, onBid }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = React.useState('')
  const [bidAmount, setBidAmount] = React.useState(auction.currentPrice + 1)

  React.useEffect(() => {
    const updateTimeLeft = () => {
      const now = Date.now()
      const endTime = auction.endTime * 1000
      const diff = endTime - now

      if (diff <= 0) {
        setTimeLeft('Ended')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`)
      } else {
        setTimeLeft(`${minutes}m`)
      }
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [auction.endTime])

  const handleBid = () => {
    if (onBid && bidAmount > auction.currentPrice) {
      onBid(auction.id, bidAmount)
    }
  }

  const isEnded = auction.status === 'ended'
  const isActive = auction.status === 'active' && !isEnded

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-stacks-500/20 transition-all duration-300"
    >
      {/* Auction Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-stacks-500" />
            <span className="text-sm font-semibold text-white">
              {auction.auctionType === 'english' ? 'English Auction' : 'Dutch Auction'}
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isActive ? 'bg-green-500/20 text-green-400' : 
            isEnded ? 'bg-red-500/20 text-red-400' : 
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {isActive ? 'Live' : isEnded ? 'Ended' : 'Starting Soon'}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Time Remaining</p>
            <p className="text-lg font-bold text-white">{timeLeft}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Current Bid</p>
            <p className="text-lg font-bold text-white">
              {auction.currentPrice} {auction.paymentToken}
            </p>
          </div>
        </div>
      </div>

      {/* NFT Preview */}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">₿</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">NFT #{auction.nftId}</h3>
            <p className="text-sm text-gray-400">Bitcoin Genesis Collection</p>
          </div>
        </div>

        {/* Bidding Section */}
        {isActive && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your Bid ({auction.paymentToken})
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={auction.currentPrice + 1}
                  className="flex-1 px-3 py-2 glass-card rounded-lg text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
                  placeholder="Enter bid amount"
                />
                <button
                  onClick={handleBid}
                  disabled={bidAmount <= auction.currentPrice}
                  className="px-4 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Bid
                </button>
              </div>
            </div>

            {/* Quick Bid Buttons */}
            <div className="flex space-x-2">
              {[1.1, 1.2, 1.5, 2].map(multiplier => (
                <button
                  key={multiplier}
                  onClick={() => setBidAmount(Math.ceil(auction.currentPrice * multiplier))}
                  className="flex-1 px-3 py-2 glass-card rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-all"
                >
                  {multiplier}x
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Auction Stats */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-400">Starting Price</p>
              <p className="text-sm font-semibold text-white">
                {auction.startingPrice} {auction.paymentToken}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Highest Bidder</p>
              <p className="text-sm font-semibold text-white">
                {auction.highestBidder ? 
                  `${auction.highestBidder.slice(0, 6)}...${auction.highestBidder.slice(-4)}` : 
                  'No bids yet'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Indicator */}
        {auction.paymentToken === 'sBTC' && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">
                Bitcoin-Native Auction
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Prices may fluctuate with Bitcoin block activity
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
