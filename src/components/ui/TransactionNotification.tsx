'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ExternalLink, X, Copy } from 'lucide-react'

interface TransactionNotificationProps {
  isOpen: boolean
  onClose: () => void
  txId: string
  type: 'borrow' | 'battle' | 'mint' | 'buy'
}

export function TransactionNotification({ isOpen, onClose, txId, type }: TransactionNotificationProps) {
  const [copied, setCopied] = React.useState(false)
  
  const getNotificationContent = () => {
    switch (type) {
      case 'borrow':
        return {
          title: '🎉 ¡Préstamo sBTC Exitoso!',
          description: 'Has tomado un préstamo usando tu NFT como colateral',
          color: 'from-green-500 to-emerald-500',
          icon: '💰'
        }
      case 'battle':
        return {
          title: '⚔️ ¡Batalla Completada!',
          description: 'Tu NFT ha ganado la batalla épica',
          color: 'from-orange-500 to-red-500',
          icon: '🏆'
        }
      case 'mint':
        return {
          title: '🎨 ¡NFT Creado!',
          description: 'Tu NFT único ha sido minteado exitosamente',
          color: 'from-purple-500 to-pink-500',
          icon: '✨'
        }
      case 'buy':
        return {
          title: '🛒 ¡Compra Exitosa!',
          description: 'Has adquirido un nuevo NFT',
          color: 'from-blue-500 to-cyan-500',
          icon: '💎'
        }
      default:
        return {
          title: '✅ ¡Transacción Exitosa!',
          description: 'Tu transacción se ha completado',
          color: 'from-gray-500 to-gray-600',
          icon: '✓'
        }
    }
  }

  const content = getNotificationContent()
  const explorerUrl = `https://explorer.hiro.so/txid/${txId}?chain=testnet`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(txId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Notification Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card p-8 rounded-3xl max-w-md w-full mx-4 relative overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${content.color} opacity-10 rounded-3xl`} />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  {content.icon}
                </motion.div>
                
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {content.title}
                </motion.h2>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-6"
                >
                  {content.description}
                </motion.p>
                
                {/* Transaction ID */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/5 rounded-xl p-4 mb-6"
                >
                  <p className="text-sm text-gray-400 mb-2">Transaction ID:</p>
                  <div className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                    <code className="text-green-400 text-sm font-mono break-all">
                      {txId.slice(0, 8)}...{txId.slice(-8)}
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
                      title="Copy full transaction ID"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {copied && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 text-xs mt-2"
                    >
                      ✓ Copied to clipboard!
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex space-x-3"
                >
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ver en Explorer</span>
                  </a>
                  
                  <button
                    onClick={onClose}
                    className="px-6 py-3 glass-card text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Cerrar
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
