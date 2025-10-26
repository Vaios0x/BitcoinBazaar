'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  LogOut,
  Copy,
  ExternalLink,
  RefreshCw,
  Settings,
  ChevronDown,
  Wallet,
  Coins,
  Network
} from 'lucide-react'
import { useWalletStore } from '@/lib/stores/walletStore'
import toast from 'react-hot-toast'

export function WalletDropdown() {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement | null>(null)

  const {
    address,
    balance,
    walletType,
    network,
    isBalanceLoading,
    disconnect,
    refreshBalance,
    switchNetwork
  } = useWalletStore()

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-refresh balance every 30s
  React.useEffect(() => {
    if (!address) return

    const interval = setInterval(() => {
      refreshBalance()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [address, refreshBalance])

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard!')
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
    toast.success('Wallet disconnected')
  }

  const handleRefreshBalance = async () => {
    try {
      await refreshBalance()
      toast.success('Balance refreshed!')
    } catch (error) {
      toast.error('Failed to refresh balance')
    }
  }

  const handleNetworkSwitch = () => {
    const newNetwork = network === 'testnet' ? 'mainnet' : 'testnet'
    switchNetwork(newNetwork)
    toast.success(`Switched to ${newNetwork}`)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Wallet Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 glass-card px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
      >
        {/* Balance Display */}
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-semibold text-white">
              {balance.stx.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400">STX</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-bitcoin-500 font-semibold">
              {balance.sbtc.toFixed(4)}
            </span>
            <span className="text-xs text-gray-500">sBTC</span>
          </div>
        </div>

        {/* Wallet Icon - Leather only */}
        <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
        </div>

        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -210 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -210 }}
            className="absolute right-0 mt-96 w-80 glass-card rounded-2xl p-4 shadow-2xl z-50"
          >
            {/* Wallet Info Header */}
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Connected with</span>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Leather</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-sm">
                  {address && shortenAddress(address)}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={copyAddress}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                  <a
                    href={`https://explorer.hiro.so/address/${address}?chain=${network}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="View on explorer"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Balance Display */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Your Balance</span>
                <button
                  onClick={handleRefreshBalance}
                  disabled={isBalanceLoading}
                  className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                  title="Refresh balance"
                >
                  <RefreshCw className={`w-4 h-4 text-gray-400 ${isBalanceLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="space-y-2">
                {/* STX Balance */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-stacks-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-stacks-500 font-bold text-sm">STX</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{balance.stx.toFixed(2)}</div>
                      <div className="text-xs text-gray-400">
                        ≈ ${(balance.stx * 0.48).toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                </div>

                {/* sBTC Balance */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-bitcoin-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-bitcoin-500 font-bold text-sm">₿</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{balance.sbtc.toFixed(6)} sBTC</div>
                      <div className="text-xs text-gray-400">
                        ≈ ${(balance.sbtc * 60000).toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Indicator */}
            <div className="mb-3 p-3 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Network</span>
                </div>
                <button
                  onClick={handleNetworkSwitch}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    network === 'testnet'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {network === 'testnet' ? 'Testnet' : 'Mainnet'}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsOpen(false)
                  window.location.href = `/profile/${address}`
                }}
                className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>View Profile</span>
              </button>

              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
