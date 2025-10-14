'use client'

import React from 'react'
import { TrendingUp, Lock, Coins, PieChart, DollarSign } from 'lucide-react'

export function DeFiDashboard() {
  const [activeTab, setActiveTab] = React.useState<'lending' | 'staking' | 'liquidity'>('lending')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">DeFi Dashboard</h1>
        <p className="text-gray-400">Earn passive income with your NFTs</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Value Locked</span>
            <DollarSign className="w-5 h-5 text-bitcoin-500" />
          </div>
          <div className="text-3xl font-bold text-white">$2.4M</div>
          <div className="text-sm text-green-400 mt-1">↑ 24.5%</div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Your NFTs Staked</span>
            <Lock className="w-5 h-5 text-stacks-500" />
          </div>
          <div className="text-3xl font-bold text-white">12</div>
          <div className="text-sm text-gray-400 mt-1">Earning 18% APY</div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Earnings</span>
            <Coins className="w-5 h-5 text-bitcoin-500" />
          </div>
          <div className="text-3xl font-bold text-white">3.2 sBTC</div>
          <div className="text-sm text-gray-400 mt-1">≈ $192,000</div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Active Loans</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">3</div>
          <div className="text-sm text-gray-400 mt-1">1.5 sBTC borrowed</div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('lending')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'lending'
              ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          NFT Lending
        </button>
        <button
          onClick={() => setActiveTab('staking')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'staking'
              ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          NFT Staking
        </button>
        <button
          onClick={() => setActiveTab('liquidity')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'liquidity'
              ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          Liquidity Pools
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'lending' && <LendingPanel />}
      {activeTab === 'staking' && <StakingPanel />}
      {activeTab === 'liquidity' && <LiquidityPanel />}
    </div>
  )
}

function LendingPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Borrow Against NFT */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Borrow sBTC</h3>
        <p className="text-gray-400 mb-4">Use your NFTs as collateral to borrow sBTC</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Select NFT Collateral</label>
            <select className="w-full px-4 py-3 glass-card rounded-xl text-white">
              <option>CryptoPunk #1234 (Floor: 2.5 sBTC)</option>
              <option>Bored Ape #5678 (Floor: 4.0 sBTC)</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Borrow Amount</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 glass-card rounded-xl text-white"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                sBTC
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Max: 1.25 sBTC (50% LTV)</p>
          </div>
          
          <div className="glass-card p-4 rounded-xl bg-white/5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Interest Rate</span>
              <span className="text-white font-semibold">5% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Repayment Due</span>
              <span className="text-white font-semibold">30 days</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white font-bold rounded-xl hover:shadow-lg">
            Borrow sBTC
          </button>
        </div>
      </div>
      
      {/* Active Loans */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Your Active Loans</h3>
        
        <div className="space-y-3">
          {[1, 2, 3].map((loan) => (
            <div key={loan} className="glass-card p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-lg" />
                  <div>
                    <div className="font-semibold text-white">NFT #{loan * 1234}</div>
                    <div className="text-xs text-gray-400">Borrowed 0.5 sBTC</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">12 days left</div>
                  <div className="text-xs text-gray-400">To repay</div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold hover:bg-green-500/30">
                  Repay
                </button>
                <button className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-500/30">
                  Extend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StakingPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stake NFT */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Stake NFT for Yield</h3>
        <p className="text-gray-400 mb-4">Lock your NFTs to earn sBTC rewards</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Select NFT to Stake</label>
            <select className="w-full px-4 py-3 glass-card rounded-xl text-white">
              <option>Level 15 CryptoPunk (18% APY)</option>
              <option>Level 8 Bored Ape (15% APY)</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Lock Period</label>
            <div className="grid grid-cols-3 gap-2">
              <button className="px-4 py-3 glass-card rounded-xl text-white text-sm font-semibold hover:bg-white/10">
                7 days<br/>10% APY
              </button>
              <button className="px-4 py-3 glass-card rounded-xl text-white text-sm font-semibold hover:bg-white/10">
                30 days<br/>15% APY
              </button>
              <button className="px-4 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 rounded-xl text-white text-sm font-semibold">
                90 days<br/>20% APY
              </button>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-xl bg-white/5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Estimated Rewards</span>
              <span className="text-white font-semibold">0.15 sBTC/month</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Auto-compound</span>
              <span className="text-green-400 font-semibold">Enabled</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white font-bold rounded-xl hover:shadow-lg">
            Stake NFT
          </button>
        </div>
      </div>
      
      {/* Staked NFTs */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Your Staked NFTs</h3>
        
        <div className="space-y-3">
          {[1, 2, 3].map((stake) => (
            <div key={stake} className="glass-card p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-stacks-500 to-bitcoin-500 rounded-lg" />
                  <div>
                    <div className="font-semibold text-white">NFT #{stake * 5678}</div>
                    <div className="text-xs text-gray-400">Staked 15 days ago</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-400">+0.08 sBTC</div>
                  <div className="text-xs text-gray-400">Earned</div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold hover:bg-green-500/30">
                  Claim
                </button>
                <button className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-500/30">
                  Unstake
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LiquidityPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Add Liquidity */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Provide Liquidity</h3>
        <p className="text-gray-400 mb-4">Earn fees by providing NFT + sBTC liquidity</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">NFT Collection</label>
            <select className="w-full px-4 py-3 glass-card rounded-xl text-white">
              <option>CryptoPunks + sBTC</option>
              <option>Bored Apes + sBTC</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 mb-2 block">NFT Amount</label>
            <input
              type="number"
              placeholder="1"
              className="w-full px-4 py-3 glass-card rounded-xl text-white"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-400 mb-2 block">sBTC Amount</label>
            <input
              type="number"
              placeholder="2.5"
              className="w-full px-4 py-3 glass-card rounded-xl text-white"
            />
          </div>
          
          <div className="glass-card p-4 rounded-xl bg-white/5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Trading Fee</span>
              <span className="text-white font-semibold">0.3%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Your Share</span>
              <span className="text-green-400 font-semibold">0.1%</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white font-bold rounded-xl hover:shadow-lg">
            Add Liquidity
          </button>
        </div>
      </div>
      
      {/* LP Positions */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Your LP Positions</h3>
        
        <div className="space-y-3">
          {[1, 2].map((position) => (
            <div key={position} className="glass-card p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg" />
                  <div>
                    <div className="font-semibold text-white">CryptoPunks + sBTC</div>
                    <div className="text-xs text-gray-400">LP Token #{position * 9999}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-400">+0.05 sBTC</div>
                  <div className="text-xs text-gray-400">Fees earned</div>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold hover:bg-green-500/30">
                  Claim Fees
                </button>
                <button className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold hover:bg-red-500/30">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
