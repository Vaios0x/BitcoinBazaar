'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, TrendingUp, Shield, Zap, AlertCircle } from 'lucide-react'
import type { Auction } from '@/types/nft'

interface BidModalProps {
  isOpen: boolean
  onClose: () => void
  auction: Auction | null
  onPlaceBid: (auctionId: number, amount: number) => void
}

export function BidModal({ isOpen, onClose, auction, onPlaceBid }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState(0)
  const [isPlacingBid, setIsPlacingBid] = useState(false)
  const [selectedMultiplier, setSelectedMultiplier] = useState(1.1)

  if (!auction) return null

  const minBid = auction.currentPrice + (auction.paymentToken === 'sBTC' ? 0.01 : 1)
  const isEnded = auction.status === 'ended'
  const isActive = auction.status === 'active' && !isEnded

  const handlePlaceBid = async () => {
    if (bidAmount < minBid) return
    
    setIsPlacingBid(true)
    try {
      await onPlaceBid(auction.id, bidAmount)
      onClose()
    } catch (error) {
      console.error('Bid failed:', error)
    } finally {
      setIsPlacingBid(false)
    }
  }

  const handleMultiplierSelect = (multiplier: number) => {
    setSelectedMultiplier(multiplier)
    setBidAmount(Math.ceil(auction.currentPrice * multiplier * 100) / 100)
  }

  const formatTimeLeft = (endTime: number) => {
    const now = Date.now()
    const diff = (endTime * 1000) - now
    
    if (diff <= 0) return 'Ended'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bid-modal-container"
          >
            <div className="glass-card-premium rounded-2xl w-full max-w-2xl max-h-[75vh] overflow-y-auto border-2 border-bitcoin-500/30 shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-bitcoin-500/10 to-stacks-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Place Your Bid</h2>
                      <p className="text-gray-400">NFT #{auction.nftId} • {auction.auctionType === 'english' ? 'English' : 'Dutch'} Auction</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 bg-red-500/80 hover:bg-red-600/80 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Auction Info */}
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Bitcoin Genesis Collection</h3>
                      <p className="text-gray-400">NFT #{auction.nftId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Current Bid</p>
                      <p className="text-xl font-bold text-white">{auction.currentPrice} {auction.paymentToken}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-stacks-500" />
                      <div>
                        <p className="text-xs text-gray-400">Time Remaining</p>
                        <p className="text-sm font-semibold text-white">{formatTimeLeft(auction.endTime)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-bitcoin-500" />
                      <div>
                        <p className="text-xs text-gray-400">Starting Price</p>
                        <p className="text-sm font-semibold text-white">{auction.startingPrice} {auction.paymentToken}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bidding Section */}
                {isActive ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Your Bid Amount ({auction.paymentToken})
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(Number(e.target.value))}
                          min={minBid}
                          step={auction.paymentToken === 'sBTC' ? 0.01 : 1}
                          className="w-full px-4 py-3 glass-card rounded-xl text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none text-lg"
                          placeholder={`Minimum: ${minBid} ${auction.paymentToken}`}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {auction.paymentToken}
                        </div>
                      </div>
                      {bidAmount < minBid && bidAmount > 0 && (
                        <p className="text-red-400 text-sm mt-1">
                          Bid must be at least {minBid} {auction.paymentToken}
                        </p>
                      )}
                    </div>

                    {/* Quick Bid Multipliers */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Quick Bid</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1.1, 1.2, 1.5, 2].map(multiplier => (
                          <button
                            key={multiplier}
                            onClick={() => handleMultiplierSelect(multiplier)}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                              selectedMultiplier === multiplier
                                ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
                                : 'glass-card text-white hover:bg-white/10'
                            }`}
                          >
                            {multiplier}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bid Summary */}
                    <div className="glass-card p-4 rounded-xl bg-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Your Bid</span>
                        <span className="text-white font-semibold">{bidAmount} {auction.paymentToken}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Platform Fee (2.5%)</span>
                        <span className="text-white font-semibold">{(bidAmount * 0.025).toFixed(3)} {auction.paymentToken}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-white/10 pt-2">
                        <span className="text-white font-bold">Total</span>
                        <span className="text-white font-bold">{(bidAmount * 1.025).toFixed(3)} {auction.paymentToken}</span>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-blue-400 font-semibold text-sm">Secure Bidding</p>
                        <p className="text-gray-400 text-xs">
                          Your bid will be locked in a smart contract. You can only be outbid, not withdraw.
                        </p>
                      </div>
                    </div>

                    {/* Bitcoin Native Notice */}
                    {auction.paymentToken === 'sBTC' && (
                      <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <Zap className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="text-green-400 font-semibold text-sm">Bitcoin-Native Pricing</p>
                          <p className="text-gray-400 text-xs">
                            Prices may fluctuate with Bitcoin block activity and network conditions.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 glass-card rounded-xl text-white hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePlaceBid}
                        disabled={bidAmount < minBid || isPlacingBid}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isPlacingBid ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Placing Bid...</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="w-4 h-4" />
                            <span>Place Bid</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {isEnded ? 'Auction Ended' : 'Auction Not Active'}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {isEnded 
                        ? 'This auction has ended and is no longer accepting bids.'
                        : 'This auction is not currently active.'
                      }
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
