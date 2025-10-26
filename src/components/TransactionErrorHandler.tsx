'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, XCircle } from 'lucide-react'

interface TransactionErrorHandlerProps {
  error: string
  onRetry?: () => void
  onDismiss?: () => void
}

export function TransactionErrorHandler({ error, onRetry, onDismiss }: TransactionErrorHandlerProps) {
  const isCancellation = error.includes('cancelled by user')
  const isProviderError = error.includes('StacksProvider')
  
  const getErrorIcon = () => {
    if (isCancellation) return <XCircle className="w-5 h-5 text-yellow-400" />
    if (isProviderError) return <AlertTriangle className="w-5 h-5 text-orange-400" />
    return <AlertTriangle className="w-5 h-5 text-red-400" />
  }

  const getErrorMessage = () => {
    if (isCancellation) {
      return {
        title: 'Transaction Cancelled',
        message: 'You cancelled the transaction. You can try again anytime.',
        color: 'text-yellow-400'
      }
    }
    if (isProviderError) {
      return {
        title: 'Wallet Connection Issue',
        message: 'There was a problem with the wallet connection. Please try refreshing the page or reconnecting your wallet.',
        color: 'text-orange-400'
      }
    }
    return {
      title: 'Transaction Failed',
      message: error,
      color: 'text-red-400'
    }
  }

  const errorInfo = getErrorMessage()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto"
    >
      <div className={`glass-card rounded-xl p-4 border ${
        isCancellation ? 'border-yellow-500/30 bg-yellow-500/10' :
        isProviderError ? 'border-orange-500/30 bg-orange-500/10' :
        'border-red-500/30 bg-red-500/10'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getErrorIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-semibold ${errorInfo.color}`}>
              {errorInfo.title}
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              {errorInfo.message}
            </p>
            
            <div className="flex items-center space-x-2 mt-3">
              {onRetry && !isCancellation && (
                <motion.button
                  onClick={onRetry}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-lg hover:shadow-lg transition-all flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry</span>
                </motion.button>
              )}
              
              {isProviderError && (
                <motion.button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-lg hover:shadow-lg transition-all flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh Page</span>
                </motion.button>
              )}
              
              {onDismiss && (
                <motion.button
                  onClick={onDismiss}
                  className="px-3 py-1 bg-gray-600 text-white text-xs rounded-lg hover:bg-gray-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Dismiss
                </motion.button>
              )}
            </div>
          </div>
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
      </div>
    </motion.div>
  )
}
