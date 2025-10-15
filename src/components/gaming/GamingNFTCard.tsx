'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Zap, Heart, Swords, Shield, Flame } from 'lucide-react'

interface GamingNFT {
  id: string
  name: string
  imageUri: string
  price: string
  paymentToken: string
  stats: {
    hp: number
    attack: number
    defense: number
    speed: number
    level: number
    xp: number
    wins: number
    losses: number
    totalEarnings: number
  }
}

interface GamingNFTCardProps {
  nft: GamingNFT
  onBattle?: () => void
  onStake?: () => void
  onStats?: () => void
  onBattleModal?: () => void
}

export function GamingNFTCard({ nft, onBattle, onStake, onStats, onBattleModal }: GamingNFTCardProps) {
  const [showStats, setShowStats] = React.useState(false)

  const winRate = nft.stats.wins + nft.stats.losses > 0
    ? (nft.stats.wins / (nft.stats.wins + nft.stats.losses)) * 100
    : 0

  const powerLevel = nft.stats.attack + nft.stats.defense + nft.stats.speed + (nft.stats.level * 10)

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5 }}
      className="relative"
    >
      <div className="glass-card rounded-2xl overflow-hidden border-2 border-bitcoin-500/30">
        {/* Level Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="px-3 py-1 bg-gradient-to-r from-bitcoin-500 to-stacks-500 rounded-full flex items-center space-x-1">
            <Zap className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">Lv.{nft.stats.level}</span>
          </div>
        </div>

        {/* Win Rate Badge */}
        {nft.stats.wins + nft.stats.losses > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <div className={`px-3 py-1 rounded-full ${
              winRate >= 70 ? 'bg-green-500/80' : 
              winRate >= 50 ? 'bg-yellow-500/80' : 'bg-red-500/80'
            }`}>
              <span className="text-xs font-bold text-white">{winRate.toFixed(0)}% WR</span>
            </div>
          </div>
        )}
        
        {/* NFT Image with Power Glow */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={nft.imageUri || '/gaming-nft-placeholder.jpg'}
            alt={nft.name}
            fill
            className="object-cover"
          />
          
          {/* Power level glow effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-bitcoin-500/30 to-transparent"
            style={{ opacity: Math.min(powerLevel / 1000, 0.8) }}
          />
          
          {/* Hover: Show Stats Overlay */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm p-4 flex flex-col justify-center"
            >
              <h4 className="text-white font-bold mb-3 text-center">Battle Stats</h4>
              
              <div className="space-y-2">
                {/* HP Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-white mb-1">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      <span>HP</span>
                    </div>
                    <span className="font-bold">{nft.stats.hp}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${Math.min((nft.stats.hp / 200) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                {/* Attack Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-white mb-1">
                    <div className="flex items-center space-x-1">
                      <Swords className="w-3 h-3 text-orange-400" />
                      <span>Attack</span>
                    </div>
                    <span className="font-bold">{nft.stats.attack}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min((nft.stats.attack / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                {/* Defense Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-white mb-1">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-blue-400" />
                      <span>Defense</span>
                    </div>
                    <span className="font-bold">{nft.stats.defense}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${Math.min((nft.stats.defense / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                {/* Speed Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-white mb-1">
                    <div className="flex items-center space-x-1">
                      <Flame className="w-3 h-3 text-yellow-400" />
                      <span>Speed</span>
                    </div>
                    <span className="font-bold">{nft.stats.speed}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min((nft.stats.speed / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Battle Record */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">{nft.stats.wins}</div>
                    <div className="text-xs text-gray-400">Wins</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{nft.stats.losses}</div>
                    <div className="text-xs text-gray-400">Losses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-bitcoin-500">{powerLevel}</div>
                    <div className="text-xs text-gray-400">Power</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* NFT Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white truncate">{nft.name}</h3>
          
          {/* XP Progress Bar */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>XP Progress</span>
              <span>{nft.stats.xp} / {nft.stats.level * 500}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-stacks-500 to-bitcoin-500 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min((nft.stats.xp / (nft.stats.level * 500)) * 100, 100)}%` }}
              />
            </div>
          </div>
          
          {/* Price & Power Rating */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Price</p>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-white">{nft.price}</span>
                <span className="text-sm text-gray-400">{nft.paymentToken}</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-400">Power</p>
              <div className="flex items-center space-x-1">
                <Flame className="w-4 h-4 text-bitcoin-500" />
                <span className="text-lg font-bold text-bitcoin-500">{powerLevel}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={onStats}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold text-white transition-colors"
            >
              Stats
            </button>
            
            <button
              onClick={onBattleModal}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg hover:shadow-red-500/50 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center space-x-1"
            >
              <Swords className="w-4 h-4" />
              <span>Battle</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
