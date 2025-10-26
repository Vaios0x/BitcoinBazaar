'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle, XCircle, Loader } from 'lucide-react'

interface TransactionNotificationProps {
  type: 'loading' | 'success' | 'error'
  message: string
  txId?: string
  explorerUrl?: string
  onClose?: () => void
}

export function TransactionNotification({ 
  type, 
  message, 
  txId, 
  explorerUrl, 
  onClose 
}: TransactionNotificationProps) {
  const getIcon = () => {
    switch (type) {
      case 'loading':
        return <Loader className="w-5 h-5 animate-spin text-blue-400" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        // Check if it's a cancellation message
        if (message.includes('cancelled')) {
          return <XCircle className="w-5 h-5 text-yellow-400" />
        }
        return <XCircle className="w-5 h-5 text-red-400" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'loading':
        return 'bg-blue-500/10 border-blue-500/30'
      case 'success':
        return 'bg-green-500/10 border-green-500/30'
      case 'error':
        // Check if it's a cancellation message
        if (message.includes('cancelled')) {
          return 'bg-yellow-500/10 border-yellow-500/30'
        }
        return 'bg-red-500/10 border-red-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getBgColor()} border rounded-xl p-4 shadow-lg backdrop-blur-sm`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">
            {message}
          </p>
          
          {txId && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-1">
                Transaction ID: {txId.substring(0, 8)}...{txId.substring(txId.length - 8)}
              </p>
              
              {explorerUrl && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>View on Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
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
  )
}
