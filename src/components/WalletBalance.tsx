'use client'

import React from 'react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { motion } from 'framer-motion'
import { Wallet, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react'

export function WalletBalance() {
  const { balance, isBalanceLoading, refreshBalance } = useWalletStore()
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshBalance()
    } finally {
      setIsRefreshing(false)
    }
  }

  const hasMinimumBalance = balance.stx >= 0.001
  const isLowBalance = balance.stx < 0.01 && balance.stx > 0

  return (
    <div className="fixed top-4 left-4 z-50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-xl p-4 min-w-[280px]"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <span>Wallet Balance</span>
          </h3>
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing || isBalanceLoading}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RefreshCw className={`w-4 h-4 text-gray-400 ${isRefreshing || isBalanceLoading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <div className="space-y-2">
          {/* STX Balance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {hasMinimumBalance ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm text-gray-300">STX</span>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold ${hasMinimumBalance ? 'text-green-400' : 'text-red-400'}`}>
                {balance.stx.toFixed(6)} STX
              </div>
              {isLowBalance && (
                <div className="text-xs text-yellow-400">
                  Low balance
                </div>
              )}
            </div>
          </div>

          {/* sBTC Balance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-orange-500" />
              <span className="text-sm text-gray-300">sBTC</span>
            </div>
            <div className="text-sm font-semibold text-orange-400">
              {balance.sbtc.toFixed(6)} sBTC
            </div>
          </div>

          {/* Status Messages */}
          {!hasMinimumBalance && (
            <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="text-red-400 font-semibold mb-1">
                    Insufficient Balance
                  </p>
                  <p className="text-gray-400">
                    You need at least 0.001 STX to create NFTs. Get testnet STX from the faucet.
                  </p>
                  <a 
                    href="https://explorer.hiro.so/faucet?chain=testnet" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-xs mt-1 inline-block"
                  >
                    Get Testnet STX →
                  </a>
                </div>
              </div>
            </div>
          )}

          {hasMinimumBalance && isLowBalance && (
            <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="text-yellow-400 font-semibold mb-1">
                    Low Balance
                  </p>
                  <p className="text-gray-400">
                    Your balance is low. Consider getting more STX for multiple transactions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {hasMinimumBalance && !isLowBalance && (
            <div className="mt-3 p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="text-green-400 font-semibold mb-1">
                    Ready to Create NFTs
                  </p>
                  <p className="text-gray-400">
                    You have sufficient balance to create NFTs.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Bitcoin symbol animation */}
        <motion.div
          className="absolute -top-1 -right-1 text-bitcoin-500 text-sm"
          animate={{
            y: [0, -3, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ₿
        </motion.div>
      </motion.div>
    </div>
  )
}
