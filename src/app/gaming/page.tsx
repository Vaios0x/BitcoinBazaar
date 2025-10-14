'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swords, Trophy, Zap, Flame, Shield, Heart } from 'lucide-react'
import { GamingNFTCard } from '@/components/gaming/GamingNFTCard'
import { BattleArena } from '@/components/gaming/BattleArena'

// Mock gaming NFTs data
const gamingNFTs = [
  {
    id: '1',
    name: 'CryptoPunk Warrior #1234',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    price: '2.5',
    paymentToken: 'sBTC',
    stats: {
      hp: 150,
      attack: 85,
      defense: 70,
      speed: 60,
      level: 15,
      xp: 750,
      wins: 12,
      losses: 3,
      totalEarnings: 2.4
    }
  },
  {
    id: '2',
    name: 'Bored Ape Mage #5678',
    imageUri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
    price: '1.8',
    paymentToken: 'sBTC',
    stats: {
      hp: 120,
      attack: 95,
      defense: 45,
      speed: 80,
      level: 12,
      xp: 600,
      wins: 8,
      losses: 5,
      totalEarnings: 1.6
    }
  },
  {
    id: '3',
    name: 'Stacks Guardian #9999',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    price: '3.2',
    paymentToken: 'sBTC',
    stats: {
      hp: 200,
      attack: 60,
      defense: 120,
      speed: 40,
      level: 20,
      xp: 1000,
      wins: 18,
      losses: 2,
      totalEarnings: 4.1
    }
  },
  {
    id: '4',
    name: 'Bitcoin Berserker #7777',
    imageUri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
    price: '4.1',
    paymentToken: 'sBTC',
    stats: {
      hp: 180,
      attack: 110,
      defense: 50,
      speed: 70,
      level: 18,
      xp: 900,
      wins: 15,
      losses: 4,
      totalEarnings: 3.2
    }
  },
  {
    id: '5',
    name: 'Ethereum Assassin #3333',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    price: '2.8',
    paymentToken: 'sBTC',
    stats: {
      hp: 100,
      attack: 120,
      defense: 30,
      speed: 100,
      level: 14,
      xp: 700,
      wins: 10,
      losses: 6,
      totalEarnings: 2.1
    }
  },
  {
    id: '6',
    name: 'Solana Paladin #5555',
    imageUri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
    price: '3.5',
    paymentToken: 'sBTC',
    stats: {
      hp: 220,
      attack: 70,
      defense: 140,
      speed: 30,
      level: 22,
      xp: 1100,
      wins: 20,
      losses: 1,
      totalEarnings: 5.2
    }
  }
]

const leaderboard = [
  { rank: 1, name: 'Solana Paladin #5555', wins: 20, losses: 1, earnings: 5.2 },
  { rank: 2, name: 'Stacks Guardian #9999', wins: 18, losses: 2, earnings: 4.1 },
  { rank: 3, name: 'Bitcoin Berserker #7777', wins: 15, losses: 4, earnings: 3.2 },
  { rank: 4, name: 'CryptoPunk Warrior #1234', wins: 12, losses: 3, earnings: 2.4 },
  { rank: 5, name: 'Ethereum Assassin #3333', wins: 10, losses: 6, earnings: 2.1 }
]

export default function GamingPage() {
  const [selectedNFT1, setSelectedNFT1] = React.useState<any>(null)
  const [selectedNFT2, setSelectedNFT2] = React.useState<any>(null)
  const [showBattleArena, setShowBattleArena] = React.useState(false)
  const [wager, setWager] = React.useState(0.1)

  const startBattle = (nft1: any, nft2: any) => {
    setSelectedNFT1(nft1)
    setSelectedNFT2(nft2)
    setShowBattleArena(true)
  }

  const handleBattleComplete = (result: any) => {
    console.log('Battle completed:', result)
    setShowBattleArena(false)
    setSelectedNFT1(null)
    setSelectedNFT2(null)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Gaming <span className="gradient-text">NFTs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Battle, level up, and earn Bitcoin with playable NFTs. 
              Each NFT has unique stats and can battle for sBTC prizes.
            </p>
            
            {/* Gaming Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-2xl text-center">
                <Swords className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-sm text-gray-400">Battles Today</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">42.3</div>
                <div className="text-sm text-gray-400">sBTC Won</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-sm text-gray-400">Active Players</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-sm text-gray-400">Level Ups</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gaming NFTs Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Battle-Ready <span className="gradient-text">NFTs</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your champion and enter the arena. Each NFT has unique stats 
              that determine battle outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gamingNFTs.map((nft) => (
              <GamingNFTCard
                key={nft.id}
                nft={nft}
                onBattle={() => {
                  // For demo, battle against a random opponent
                  const opponents = gamingNFTs.filter(o => o.id !== nft.id)
                  const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)]
                  startBattle(nft, randomOpponent)
                }}
                onStake={() => console.log('Stake NFT')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Battle <span className="gradient-text">Leaderboard</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The strongest warriors in the BitcoinBazaar arena. 
              Climb the ranks and earn your place among legends.
            </p>
          </motion.div>

          <div className="glass-card rounded-3xl p-8">
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 glass-card rounded-2xl hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      entry.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      entry.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                      entry.rank === 3 ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                      'bg-gradient-to-r from-gray-600 to-gray-700'
                    }`}>
                      {entry.rank}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white">{entry.name}</div>
                      <div className="text-sm text-gray-400">
                        {entry.wins}W - {entry.losses}L
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-bitcoin-500">{entry.earnings} sBTC</div>
                    <div className="text-sm text-gray-400">Total Earnings</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Battle Arena Modal */}
      {showBattleArena && selectedNFT1 && selectedNFT2 && (
        <BattleArena
          nft1={selectedNFT1}
          nft2={selectedNFT2}
          wager={wager}
          onBattleComplete={handleBattleComplete}
          onClose={() => setShowBattleArena(false)}
        />
      )}
    </div>
  )
}
