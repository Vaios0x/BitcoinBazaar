'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swords, Trophy, Zap, Flame, Shield, Heart } from 'lucide-react'
import { GamingNFTCard } from '@/components/gaming/GamingNFTCard'
import { BattleArena } from '@/components/gaming/BattleArena'
import { StatsModal } from '@/components/gaming/StatsModal'
import { BattleModal } from '@/components/gaming/BattleModal'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'
import { useGamingModals } from '@/hooks/useGamingModals'

// Mock gaming NFTs data
const gamingNFTs = [
  {
    id: '1',
    name: 'CryptoPunk Warrior #1234',
    imageUri: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=400&fit=crop&crop=center',
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
    imageUri: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop&crop=center',
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
    imageUri: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=400&h=400&fit=crop&crop=center',
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
    imageUri: 'https://images.unsplash.com/photo-1614732489823-cf610c62399c?w=400&h=400&fit=crop&crop=center',
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
    imageUri: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop&crop=center',
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
    imageUri: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=400&fit=crop&crop=center',
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
  
  // Gaming modals
  const {
    isStatsOpen,
    isBattleOpen,
    selectedNFT: modalNFT,
    openStats,
    openBattle,
    closeStats,
    closeBattle
  } = useGamingModals()

  // Convert gaming NFT to regular NFT type
  const convertToNFT = (gamingNFT: any) => ({
    id: gamingNFT.id,
    name: gamingNFT.name,
    description: `A powerful gaming NFT with ${gamingNFT.stats.level} level and ${gamingNFT.stats.power} power`,
    imageUri: gamingNFT.imageUri,
    price: gamingNFT.price,
    paymentToken: gamingNFT.paymentToken,
    creator: 'Gaming Protocol',
    royaltyPercent: 2.5
  })

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
    <div className="min-h-screen relative">
      {/* Bitcoin Symbols Animation Background */}
      <BitcoinSymbols />
      
      {/* Hero Section */}
      <section className="relative -mt-[28rem] pt-0 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
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
      <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8">
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
                onStats={() => openStats(convertToNFT(nft))}
                onBattleModal={() => openBattle(convertToNFT(nft))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8">
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

      {/* Battle Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Battle <span className="gradient-text">Tips</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master the art of NFT combat with these strategic insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Power Matching</h3>
              <p className="text-gray-300 text-sm">
                Choose opponents based on your NFT's power level for optimal success rates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Higher Rewards</h3>
              <p className="text-gray-300 text-sm">
                Higher difficulty battles offer better rewards but require more strategy
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Special Abilities</h3>
              <p className="text-gray-300 text-sm">
                Use special abilities strategically to gain advantages in battle
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Critical Hits</h3>
              <p className="text-gray-300 text-sm">
                Watch for critical hit opportunities to maximize damage output
              </p>
            </motion.div>
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

      {/* Stats Modal */}
      {modalNFT && (
        <StatsModal
          isOpen={isStatsOpen}
          onClose={closeStats}
          nft={modalNFT}
        />
      )}

      {/* Battle Modal */}
      {modalNFT && (
        <BattleModal
          isOpen={isBattleOpen}
          onClose={closeBattle}
          nft={modalNFT}
        />
      )}
    </div>
  )
}
