'use client'

import React from 'react'
import { useWalletStore } from '@/lib/stores/walletStore'

export function WalletProvider({ children }: { children: any }) {
  const { isConnected, refreshBalance } = useWalletStore()

  // Initialize wallet on mount
  React.useEffect(() => {
    if (isConnected) {
      refreshBalance()
    }
  }, [isConnected, refreshBalance])

  return <>{children}</>
}
