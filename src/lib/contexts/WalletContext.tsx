'use client'

import React from 'react'
import { useWallet } from '@/lib/hooks/useWallet'

interface WalletContextType {
  address: string | null
  isConnected: boolean
  balance: { stx: number; sbtc: number }
  isLoading: boolean
  connect: () => Promise<void>
  disconnect: () => void
  refreshBalance: () => void
}

const WalletContext = React.createContext(undefined)

export function WalletProvider({ children }: { children: any }) {
  const wallet = useWallet()

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  const context = React.useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider')
  }
  return context
}
