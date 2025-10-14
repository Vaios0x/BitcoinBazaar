'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Shield, Coins, Users, Star } from 'lucide-react'
import { NFTCard } from '@/components/nft/NFTCard'
import { NFTGrid } from '@/components/nft/NFTGrid'
import { BitcoinOrb } from '@/components/effects/BitcoinOrb'
import { GamingNFTCard } from '@/components/gaming/GamingNFTCard'
import { DeFiDashboard } from '@/components/defi/DeFiDashboard'
import { useWalletStore } from '@/lib/stores/walletStore'
import { useBitcoinPrice } from '@/lib/hooks/useBitcoinPrice'
import type { NFT } from '@/types/nft'

// Mock data for demo
const trendingNFTs: NFT[] = [
  {
    id: 1,
    name: 'Bitcoin Genesis #1',
    description: 'The first NFT minted on Bitcoin block 840,000',
    imageUri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    price: 0.1,
    paymentToken: 'sBTC',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 10,
    collectionName: 'Bitcoin Genesis Collection',
    collectionId: 1,
    isDynamicPricing: true,
    mintedAtBitcoinBlock: 840000,
    lastSalePrice: 0.08,
    usdPrice: 3200,
  },
  {
    id: 2,
    name: 'Stacks Pioneer #42',
    description: 'A rare NFT from the early days of Stacks',
    imageUri: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop&crop=center',
    price: 150,
    paymentToken: 'STX',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 5,
    collectionName: 'Stacks Pioneers',
    collectionId: 2,
    isDynamicPricing: false,
    lastSalePrice: 120,
    usdPrice: 72,
  },
  {
    id: 3,
    name: 'Lucky Block #1000',
    description: 'Minted during Bitcoin block 840,100 - a lucky block!',
    imageUri: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop&crop=center',
    price: 0.05,
    paymentToken: 'sBTC',
    creator: 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    royaltyPercent: 15,
    collectionName: 'Lucky Blocks',
    collectionId: 3,
    isDynamicPricing: true,
    mintedAtBitcoinBlock: 840100,
    lastSalePrice: 0.045,
    usdPrice: 1800,
  },
]

// Gaming NFTs with stats
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
  }
]

const stats = [
  { label: 'Total Volume', value: '$2.4M', icon: TrendingUp },
  { label: 'Active Users', value: '1,234', icon: Users },
  { label: 'NFTs Sold', value: '5,678', icon: Coins },
  { label: 'Collections', value: '89', icon: Star },
]

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const { isConnected } = useWalletStore()
  const { currentBlock, isDynamicPricing } = useBitcoinPrice(1)

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  The First{' '}
                  <span className="gradient-text">Bitcoin-Native</span>{' '}
                  NFT Marketplace
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Buy, sell, and create NFTs with Bitcoin's security and Stacks' programmability. 
                  Features impossible on any other blockchain.
                </p>
              </div>

              {/* Bitcoin Block Info */}
              {isDynamicPricing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-6 rounded-2xl border border-green-500/30"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap className="w-6 h-6 text-green-400" />
                    <span className="text-lg font-semibold text-green-400">
                      Lucky Bitcoin Block Active!
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Current Bitcoin block #{currentBlock} - Enjoy 10% discount on all NFTs!
                  </p>
                </motion.div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-stacks-500/50 transition-all btn-hover"
                >
                  Explore NFTs
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-card text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Create NFT
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass-card p-4 rounded-xl text-center"
                  >
                    <stat.icon className="w-6 h-6 text-stacks-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - 3D Bitcoin Orb */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-[500px]"
            >
              <BitcoinOrb />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Why BitcoinBazaar is{' '}
              <span className="gradient-text">Revolutionary</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another NFT marketplace. We're the first platform that enables 
              true Bitcoin-native NFTs with features impossible on any other blockchain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Coins,
                title: 'Dual-Token Payments',
                description: 'Buy NFTs with STX or sBTC (trustless Bitcoin peg). No wrapped tokens, no centralized custodians.',
                color: 'from-bitcoin-500 to-orange-600',
              },
              {
                icon: Zap,
                title: 'Dynamic Bitcoin Pricing',
                description: 'Prices change based on Bitcoin blockchain. Special discounts during "lucky" Bitcoin blocks.',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Shield,
                title: 'Bitcoin Block Verification',
                description: 'Prove NFT was minted during specific Bitcoin events. Verifiable rarity using Bitcoin blocks.',
                color: 'from-green-500 to-emerald-600',
              },
              {
                icon: TrendingUp,
                title: 'Automated Royalties',
                description: '0-50% customizable royalties that work for both STX and sBTC sales. Impossible to circumvent.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Star,
                title: 'Gas-Free Listings',
                description: 'Lazy minting like OpenSea Pro. Mint on first sale, creators list for free.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Users,
                title: 'Gamification',
                description: 'Earn platform tokens for activity. Streak bonuses, referral rewards, exclusive perks.',
                color: 'from-indigo-500 to-purple-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:shadow-lg hover:shadow-stacks-500/20 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming NFTs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Gaming <span className="gradient-text">NFTs</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Battle, level up, and earn Bitcoin with playable NFTs. 
              Each NFT has unique stats and can battle for sBTC prizes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gamingNFTs.map((nft) => (
              <GamingNFTCard
                key={nft.id}
                nft={nft}
                onBattle={() => console.log('Battle started')}
                onStake={() => console.log('Stake NFT')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DeFi Dashboard Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              DeFi <span className="gradient-text">Dashboard</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn passive income with your NFTs. Stake, lend, and provide liquidity 
              to earn up to 20% APY in Bitcoin.
            </p>
          </motion.div>

          <DeFiDashboard />
        </div>
      </section>

      {/* Trending NFTs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Trending <span className="gradient-text">NFTs</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the most popular NFTs on BitcoinBazaar. 
              From Bitcoin-native collections to Stacks pioneers.
            </p>
          </motion.div>

          <NFTGrid nfts={trendingNFTs} showQuickBuy={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 rounded-3xl"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Experience the{' '}
              <span className="gradient-text">Future</span> of NFTs?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users already trading Bitcoin-native NFTs. 
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-stacks-500/50 transition-all btn-hover"
              >
                Start Trading
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-card text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
