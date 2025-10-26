'use client'

import React from 'react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { motion } from 'framer-motion'
import { Wallet, RefreshCw, CheckCircle, XCircle } from 'lucide-react'

export function WalletStatus() {
  const { isConnected, address, userData, checkWalletConnection } = useWalletStore()
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await checkWalletConnection()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-xl p-4 min-w-[300px]"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
            <Wallet className="w-4 h-4" />
            <span>Wallet Status</span>
          </h3>
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RefreshCw className={`w-4 h-4 text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <div className="space-y-2">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connected' : 'Not Connected'}
            </span>
          </div>

          {/* Address */}
          {address && (
            <div className="text-xs text-gray-400">
              <span className="text-gray-500">Address:</span>
              <br />
              <span className="font-mono break-all">{address}</span>
            </div>
          )}

          {/* User Data Status */}
          <div className="flex items-center space-x-2">
            {userData ? (
              <CheckCircle className="w-3 h-3 text-green-400" />
            ) : (
              <XCircle className="w-3 h-3 text-red-400" />
            )}
            <span className={`text-xs ${userData ? 'text-green-400' : 'text-red-400'}`}>
              User Data: {userData ? 'Available' : 'Missing'}
            </span>
          </div>

          {/* Debug Info */}
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
            <div>isConnected: {isConnected ? 'true' : 'false'}</div>
            <div>address: {address ? 'present' : 'null'}</div>
            <div>userData: {userData ? 'present' : 'null'}</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
