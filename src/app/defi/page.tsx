'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DeFiDashboard } from '@/components/defi/DeFiDashboard'

export default function DeFiPage() {
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
              DeFi <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Earn passive income with your NFTs. Stake, lend, and provide liquidity 
              to earn up to 20% APY in Bitcoin.
            </p>
            
            {/* DeFi Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-2">$2.4M</div>
                <div className="text-sm text-gray-400">Total Value Locked</div>
                <div className="text-xs text-green-400 mt-1">↑ 24.5%</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-2">18%</div>
                <div className="text-sm text-gray-400">Average APY</div>
                <div className="text-xs text-gray-400 mt-1">Across all pools</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-2">1,247</div>
                <div className="text-sm text-gray-400">Active Stakers</div>
                <div className="text-xs text-green-400 mt-1">↑ 156 this week</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-2">89</div>
                <div className="text-sm text-gray-400">Liquidity Pools</div>
                <div className="text-xs text-gray-400 mt-1">NFT + sBTC pairs</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DeFi Dashboard */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <DeFiDashboard />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              How <span className="gradient-text">DeFi</span> Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn how to maximize your NFT earnings with our comprehensive DeFi suite.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Stake Your NFTs',
                description: 'Lock your NFTs for 7, 30, or 90 days to earn up to 20% APY in sBTC. Higher level NFTs earn bonus rewards.',
                icon: '🔒'
              },
              {
                step: '02',
                title: 'Borrow Against NFTs',
                description: 'Use your NFTs as collateral to borrow up to 50% of their floor price. Keep your NFTs while accessing liquidity.',
                icon: '💰'
              },
              {
                step: '03',
                title: 'Provide Liquidity',
                description: 'Add NFT + sBTC liquidity pairs and earn 0.3% trading fees. Compound your rewards automatically.',
                icon: '💧'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-2xl font-bold text-white mb-4">{item.title}</div>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
