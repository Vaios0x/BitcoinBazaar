'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Shield, Sword, Star, TrendingUp, Flame } from 'lucide-react'
import type { NFT } from '@/types/nft'

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
  nft: NFT
}

export function StatsModal({ isOpen, onClose, nft }: StatsModalProps) {
  // Mock gaming stats for the NFT
  const stats = {
    level: 15,
    xp: 750,
    maxXp: 7500,
    power: 365,
    defense: 280,
    speed: 120,
    magic: 190,
    health: 100,
    maxHealth: 100,
    wins: 42,
    losses: 8,
    winRate: 84,
    rank: 'Gold',
    rarity: 'Epic'
  }

  const xpPercentage = (stats.xp / stats.maxXp) * 100

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden mt-16">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Character Stats</h2>
                    <p className="text-xs text-gray-400">{nft.name}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column - Character Info */}
                  <div className="space-y-4">
                    {/* Character Image */}
                    <div className="relative">
                      <div className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={nft.imageUri}
                          alt={nft.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                        <span className="text-xs font-bold text-white">L{stats.level}</span>
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                        <span className="text-xs font-bold text-white">{stats.rarity}</span>
                      </div>
                    </div>

                    {/* XP Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">XP Progress</span>
                        <span className="text-xs text-gray-400">{stats.xp} / {stats.maxXp}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${xpPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Health Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">Health</span>
                        <span className="text-xs text-gray-400">{stats.health} / {stats.maxHealth}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(stats.health / stats.maxHealth) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Stats and Battle Info */}
                  <div className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-semibold text-white">Power</span>
                        </div>
                        <span className="text-2xl font-bold text-orange-500">{stats.power}</span>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-semibold text-white">Defense</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-500">{stats.defense}</span>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-semibold text-white">Speed</span>
                        </div>
                        <span className="text-2xl font-bold text-yellow-500">{stats.speed}</span>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-semibold text-white">Magic</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-500">{stats.magic}</span>
                      </div>
                    </div>

                    {/* Battle Record */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-white mb-3">Battle Record</h3>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-xl font-bold text-green-500">{stats.wins}</div>
                          <div className="text-xs text-gray-400">Wins</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-red-500">{stats.losses}</div>
                          <div className="text-xs text-gray-400">Losses</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-blue-500">{stats.winRate}%</div>
                          <div className="text-xs text-gray-400">Win Rate</div>
                        </div>
                      </div>
                    </div>

                    {/* Rank */}
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                        <Star className="w-4 h-4 text-white" />
                        <span className="text-sm font-bold text-white">{stats.rank} Rank</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
