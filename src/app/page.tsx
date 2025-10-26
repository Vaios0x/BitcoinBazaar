'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Shield, Coins, Users, Star, CheckCircle, ArrowRight, Globe, Lock, Sparkles } from 'lucide-react'
import { BitcoinSymbolsIntense } from '@/components/effects/BitcoinSymbolsIntense'
import { useWalletStore } from '@/lib/stores/walletStore'
import { useBitcoinPrice } from '@/lib/hooks/useBitcoinPrice'

// Landing page data
const stats = [
  { label: 'Total Volume', value: '$2.4M', icon: TrendingUp },
  { label: 'Active Users', value: '1,234', icon: Users },
  { label: 'NFTs Sold', value: '5,678', icon: Coins },
  { label: 'Collections', value: '89', icon: Star },
]

const benefits = [
  {
    icon: Shield,
    title: 'Bitcoin Security',
    description: 'Your NFTs are secured by Bitcoin\'s immutable blockchain. No compromises, no bridges, no wrapped tokens.',
    color: 'from-green-500 to-emerald-600',
    glowColor: 'bitcoin-glow'
  },
  {
    icon: Coins,
    title: 'Dual-Token Payments',
    description: 'Pay with STX or sBTC (trustless Bitcoin peg). No centralized custodians, no wrapped tokens.',
    color: 'from-bitcoin-500 to-orange-600',
    glowColor: 'bitcoin-glow'
  },
  {
    icon: Zap,
    title: 'Dynamic Pricing',
    description: 'Prices change based on Bitcoin blockchain events. Special discounts during "lucky" Bitcoin blocks.',
    color: 'from-yellow-500 to-orange-500',
    glowColor: 'bitcoin-glow'
  },
  {
    icon: Lock,
    title: 'Bitcoin Block Verification',
    description: 'Prove your NFT was minted during specific Bitcoin events. Verifiable rarity using Bitcoin blocks.',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'stacks-glow'
  },
  {
    icon: Star,
    title: 'Gas-Free Listings',
    description: 'Lazy minting like OpenSea Pro. Mint on first sale, creators list for free.',
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'neon-glow'
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description: 'Access from anywhere in the world. No geographic restrictions, no KYC requirements.',
    color: 'from-indigo-500 to-purple-500',
    glowColor: 'neon-glow'
  }
]

const features = [
  {
    title: 'Bitcoin-Native NFTs',
    description: 'The first NFTs that are truly native to Bitcoin, not just stored on Bitcoin.',
    icon: CheckCircle,
    highlight: true
  },
  {
    title: 'Automated Royalties',
    description: '0-50% customizable royalties that work for both STX and sBTC sales.',
    icon: CheckCircle,
    highlight: false
  },
  {
    title: 'Gamification',
    description: 'Earn platform tokens for activity. Streak bonuses, referral rewards, exclusive perks.',
    icon: CheckCircle,
    highlight: false
  },
  {
    title: 'DeFi Integration',
    description: 'Stake, lend, and provide liquidity with your NFTs to earn up to 20% APY.',
    icon: CheckCircle,
    highlight: false
  }
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
      {/* Hero Section - Enhanced Responsive */}
      <section className="relative -mt-[20rem] sm:-mt-[24rem] lg:-mt-[28rem] pt-0 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        {/* Bitcoin Symbols Animation Background */}
        <BitcoinSymbolsIntense />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold relative leading-tight">
                  The First{' '}
                  <span className="gradient-text animate-gradient-shift">
                    Bitcoin-Native
                  </span>{' '}
                  NFT Marketplace
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
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
                  className="glass-card-bitcoin p-6 rounded-2xl border border-bitcoin-500/30 bitcoin-glow"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap className="w-6 h-6 text-bitcoin-400 animate-neon-flicker" />
                    <span className="text-lg font-semibold text-bitcoin-400">
                      Lucky Bitcoin Block Active!
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Current Bitcoin block #{currentBlock} - Enjoy 10% discount on all NFTs!
                  </p>
                </motion.div>
              )}

              {/* CTA Buttons - Enhanced Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-stacks-500/50 transition-all btn-hover btn-premium relative overflow-hidden"
                >
                  <span className="relative z-10">Explore NFTs</span>
                  {/* Animated Bitcoin symbols in button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-white text-lg sm:text-xl">₿</span>
                  </motion.div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 glass-card-premium text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-all btn-hover relative overflow-hidden"
                >
                  <span className="relative z-10">Create NFT</span>
                  {/* Animated Bitcoin symbols in button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: [0, 0.4, 0],
                      scale: [0.3, 1, 0.3],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-bitcoin-400 text-base sm:text-lg">₿</span>
                  </motion.div>
                </motion.button>
                <motion.a
                  href="/demo"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-green-500/50 transition-all btn-hover relative overflow-hidden"
                >
                  <span className="relative z-10">🚀 Demo Interactivo</span>
                  {/* Animated sparkles in button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [0.5, 1.5, 0.5],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-white text-lg sm:text-xl">✨</span>
                  </motion.div>
                </motion.a>
              </div>

              {/* Stats - Enhanced Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass-card-premium p-3 sm:p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300"
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-stacks-500 mx-auto mb-2 animate-pulse" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Benefits Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass-card-premium p-8 rounded-2xl border border-bitcoin-500/20 bitcoin-glow">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 text-bitcoin-500" />
                  <h3 className="text-2xl font-bold text-white">Bitcoin Security</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Your NFTs are secured by Bitcoin's immutable blockchain. No compromises, no bridges, no wrapped tokens.
                </p>
              </div>

              <div className="glass-card-premium p-8 rounded-2xl border border-stacks-500/20 stacks-glow">
                <div className="flex items-center space-x-3 mb-4">
                  <Coins className="w-8 h-8 text-stacks-500" />
                  <h3 className="text-2xl font-bold text-white">Dual-Token Payments</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Pay with STX or sBTC (trustless Bitcoin peg). No centralized custodians, no wrapped tokens.
                </p>
              </div>

              <div className="glass-card-premium p-8 rounded-2xl border border-yellow-500/20 neon-glow">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-white">Dynamic Pricing</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Prices change based on Bitcoin blockchain events. Special discounts during "lucky" Bitcoin blocks.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced Responsive */}
      <section className="pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Why BitcoinBazaar is{' '}
              <span className="gradient-text animate-gradient-shift">Revolutionary</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're not just another NFT marketplace. We're the first platform that enables 
              true Bitcoin-native NFTs with features impossible on any other blockchain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card-premium p-6 sm:p-8 rounded-2xl hover:shadow-lg hover:shadow-stacks-500/20 transition-all duration-300 hover:scale-105 group"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4 sm:mb-6 ${benefit.glowColor} group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-stacks-400 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced Responsive */}
      <section className="pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Key <span className="gradient-text">Features</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the unique features that make BitcoinBazaar the most advanced NFT marketplace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`glass-card-premium p-6 sm:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 group ${
                  feature.highlight ? 'border border-bitcoin-500/30 bitcoin-glow' : ''
                }`}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${
                    feature.highlight ? 'from-bitcoin-500 to-orange-600' : 'from-stacks-500 to-blue-600'
                  } flex items-center justify-center flex-shrink-0 ${feature.highlight ? 'bitcoin-glow' : 'stacks-glow'}`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-stacks-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced Responsive */}
      <section className="pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-premium p-8 sm:p-10 lg:p-12 rounded-3xl holographic floating-particles"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Ready to Experience the{' '}
              <span className="gradient-text animate-gradient-shift">Future</span> of NFTs?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users already trading Bitcoin-native NFTs. 
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-stacks-500/50 transition-all btn-hover btn-premium bitcoin-glow flex items-center justify-center space-x-2"
              >
                <span>Start Trading</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 glass-card-premium text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-all btn-hover stacks-glow flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Learn More</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
