'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  CheckCircle2, 
  ExternalLink, 
  Loader2, 
  AlertCircle,
  Copy,
  Eye
} from 'lucide-react'
import toast from 'react-hot-toast'

interface TransactionCardProps {
  transaction: {
    id: string
    name: string
    description: string
    icon: any
    category: 'nft' | 'marketplace' | 'gaming' | 'defi' | 'oracle'
    status: 'pending' | 'success' | 'error' | 'idle'
    txId?: string
    explorerUrl?: string
    error?: string
  }
  onExecute: (transaction: any) => Promise<void>
  isRunning: boolean
  isCurrent: boolean
}

const CATEGORY_COLORS = {
  nft: 'from-purple-500 to-pink-500',
  marketplace: 'from-blue-500 to-cyan-500',
  gaming: 'from-green-500 to-emerald-500',
  defi: 'from-yellow-500 to-orange-500',
  oracle: 'from-bitcoin-500 to-orange-600'
}

const CATEGORY_GLOW = {
  nft: 'neon-glow',
  marketplace: 'stacks-glow',
  gaming: 'neon-glow',
  defi: 'bitcoin-glow',
  oracle: 'bitcoin-glow'
}

export function TransactionCard({ transaction, onExecute, isRunning, isCurrent }: TransactionCardProps) {
  const [isExecuting, setIsExecuting] = useState(false)

  const handleExecute = async () => {
    setIsExecuting(true)
    try {
      await onExecute(transaction)
    } finally {
      setIsExecuting(false)
    }
  }

  const copyTxId = (txId: string) => {
    navigator.clipboard.writeText(txId)
    toast.success('TX ID copiado al portapapeles')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Play className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-500/50 bg-yellow-500/10'
      case 'success':
        return 'border-green-500/50 bg-green-500/10'
      case 'error':
        return 'border-red-500/50 bg-red-500/10'
      default:
        return 'border-white/20 bg-white/5'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card-premium p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
        getStatusColor(transaction.status)
      } ${
        isCurrent ? 'ring-2 ring-bitcoin-500/50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${CATEGORY_COLORS[transaction.category]} flex items-center justify-center ${CATEGORY_GLOW[transaction.category]}`}>
            <transaction.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {transaction.name}
            </h3>
            <p className="text-sm text-gray-400 capitalize">
              {transaction.category}
            </p>
          </div>
        </div>
        {getStatusIcon(transaction.status)}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-4">
        {transaction.description}
      </p>

      {/* Transaction ID */}
      {transaction.txId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 bg-black/20 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Transaction ID:</span>
            <button
              onClick={() => copyTxId(transaction.txId!)}
              className="text-xs text-bitcoin-400 hover:text-bitcoin-300 flex items-center space-x-1 transition-colors"
            >
              <span className="font-mono">
                {transaction.txId.slice(0, 8)}...{transaction.txId.slice(-8)}
              </span>
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {transaction.error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <p className="text-xs text-red-400">
            {transaction.error}
          </p>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExecute}
          disabled={isRunning || transaction.status === 'pending' || isExecuting}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Ejecutando...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Ejecutar</span>
            </>
          )}
        </motion.button>

        {transaction.explorerUrl && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={transaction.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 glass-card-premium text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ver</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}
