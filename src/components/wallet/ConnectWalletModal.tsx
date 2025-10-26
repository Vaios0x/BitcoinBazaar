'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useWalletStore } from '@/lib/stores/walletStore'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { connect, isLoading } = useWalletStore()
  const [detectedWallets, setDetectedWallets] = React.useState({
    leather: false
  })

  // Detect installed wallets
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const detectWallets = () => {
      // Only detect Leather wallet (previously Hiro Wallet)
      const leatherInstalled = !!(window as any).LeatherProvider || 
                               !!(window as any).HiroWalletProvider

      setDetectedWallets({
        leather: leatherInstalled
      })
    }

    // Check immediately and after short delay (wallets inject async)
    detectWallets()
    const timeout = setTimeout(detectWallets, 1000)

    return () => clearTimeout(timeout)
  }, [isOpen])

  const handleConnect = async (walletType: 'leather') => {
    try {
      await connect(walletType)
      toast.success('Leather wallet connected!')
      onClose()
    } catch (error) {
      console.error('Connection error:', error)
      toast.error('Failed to connect wallet. Please try again.')
    }
  }

  const wallets = [
    {
      id: 'leather' as const,
      name: 'Leather',
      description: 'Stacks wallet (Required for BitcoinBazaar)',
      icon: '/wallets/leather.png',
      downloadUrl: 'https://leather.io/install-extension',
      isInstalled: detectedWallets.leather,
      features: ['Stacks', 'Bitcoin', 'sBTC', 'Testing Section']
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          >
            <div className="glass-card rounded-2xl max-w-sm w-full p-4 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1">
                  Connect Your Wallet
                </h2>
                <p className="text-sm text-gray-400">
                  Choose a wallet to connect to BitcoinBazaar
                </p>
              </div>

              {/* Wallet Options */}
              <div className="space-y-2">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => wallet.isInstalled && handleConnect(wallet.id)}
                    disabled={!wallet.isInstalled || isLoading}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      wallet.isInstalled
                        ? 'border-white/20 hover:border-bitcoin-500/50 hover:bg-white/5 cursor-pointer'
                        : 'border-white/10 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Wallet Icon */}
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" fill="#5546FF"/>
                          </svg>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-base font-bold text-white">
                              {wallet.name}
                            </h3>
                            {wallet.isInstalled && (
                              <CheckCircle2 className="w-3 h-3 text-green-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400">
                            {wallet.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {wallet.features.map((feature) => (
                              <span
                                key={feature}
                                className="text-xs px-1.5 py-0.5 bg-white/10 rounded-full text-gray-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Status Icon */}
                      <div>
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 text-bitcoin-500 animate-spin" />
                        ) : wallet.isInstalled ? (
                          <ExternalLink className="w-5 h-5 text-gray-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    </div>

                    {/* Install prompt if not installed */}
                    {!wallet.isInstalled && (
                      <a
                        href={wallet.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center justify-center space-x-2 px-4 py-2 bg-bitcoin-500/20 text-bitcoin-500 rounded-lg text-sm font-semibold hover:bg-bitcoin-500/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Install {wallet.name}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </button>
                ))}
              </div>

              {/* Info Banner */}
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="text-green-400 font-semibold mb-1">
                      BitcoinBazaar requires Leather Wallet
                    </p>
                    <p className="text-gray-400">
                      All transactions in the <span className="text-white font-semibold">Testing Section</span> 
                      require <span className="text-white font-semibold">Leather Wallet</span> for 
                      Stacks and Bitcoin integration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <p className="text-xs text-gray-500 text-center mt-3">
                By connecting, you agree to our{' '}
                <a href="/terms" className="text-bitcoin-500 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
