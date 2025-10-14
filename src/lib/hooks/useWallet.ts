'use client'

import React from 'react'

export function useWallet() {
  const [address, setAddress] = React.useState<string | null>(null)
  const [isConnected, setIsConnected] = React.useState(false)
  const [balance, setBalance] = React.useState({ stx: 0, sbtc: 0 })
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate wallet connection check
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const connect = async () => {
    try {
      setIsLoading(true)
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setAddress('SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')
      setIsConnected(true)
      setBalance({ stx: 1250.5, sbtc: 0.025 })
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
    setBalance({ stx: 0, sbtc: 0 })
  }

  const refreshBalance = () => {
    // Simulate balance refresh
    setBalance((prev: any) => ({
      stx: prev.stx + Math.random() * 10,
      sbtc: prev.sbtc + Math.random() * 0.001
    }))
  }

  return {
    address,
    isConnected,
    balance,
    isLoading,
    connect,
    disconnect,
    refreshBalance
  }
}
