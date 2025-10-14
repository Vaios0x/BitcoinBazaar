'use client'

import React from 'react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { ConnectWalletModal } from './ConnectWalletModal'
import { WalletDropdown } from './WalletDropdown'
import { Wallet } from 'lucide-react'

export function ConnectWallet() {
  const [showModal, setShowModal] = React.useState(false)
  const { isConnected } = useWalletStore()

  if (isConnected) {
    return <WalletDropdown />
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all flex items-center space-x-2"
      >
        <Wallet className="w-5 h-5" />
        <span>Connect Wallet</span>
      </button>

      <ConnectWalletModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}