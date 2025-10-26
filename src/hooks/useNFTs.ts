"use client"

/**
 * Custom hook for managing NFTs with real-time updates and global persistence
 */

import { useState, useEffect, useRef } from 'react'
import { getAllNFTs, getNFTById, getNFTsByCreator } from '@/lib/nft-fetcher'
import { nftStorage } from '@/lib/nft-storage'
import type { NFT } from '@/types/nft'

export function useNFTs() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastTokenId, setLastTokenId] = useState<number>(0)
  const [isPolling, setIsPolling] = useState(false)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchNFTs = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true)
      }
      setError(null)
      
      // Get NFTs from contract
      const contractNFTs = await getAllNFTs()
      
      // Merge with stored NFTs (from all users)
      const mergedNFTs = nftStorage.mergeNFTs(contractNFTs)
      
      // Check if there are new NFTs
      const newTokenId = mergedNFTs.length > 0 ? Math.max(...mergedNFTs.map(nft => nft.id)) : 0
      const hasNewNFTs = newTokenId > lastTokenId
      
      setNfts(mergedNFTs)
      setLastTokenId(newTokenId)
      
      // Store the merged NFTs for persistence
      nftStorage.storeNFTs(mergedNFTs)
      
      // If there are new NFTs, trigger a visual update
      if (hasNewNFTs && lastTokenId > 0) {
        console.log(`🎉 New NFTs detected! Total: ${mergedNFTs.length}, New: ${newTokenId - lastTokenId}`)
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching NFTs')
      console.error('Error in useNFTs:', err)
      
      // Fallback to stored NFTs if contract fails
      const storedNFTs = nftStorage.getStoredNFTs()
      if (storedNFTs.length > 0) {
        setNfts(storedNFTs)
        console.log('Using stored NFTs as fallback')
      }
    } finally {
      setLoading(false)
    }
  }

  const refreshNFTs = () => {
    fetchNFTs(true)
  }

  const startPolling = (intervalMs = 10000) => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
    }
    
    setIsPolling(true)
    pollingIntervalRef.current = setInterval(() => {
      fetchNFTs(false) // Don't show loading spinner for polling
    }, intervalMs)
  }

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }
    setIsPolling(false)
  }

  // Add NFT to global storage
  const addNFT = (nft: NFT) => {
    nftStorage.addNFT(nft)
    // Refresh the list to show the new NFT
    fetchNFTs(false)
  }

  // Update NFT price (for listing/unlisting)
  const updateNFTPrice = (nftId: number, price: number, paymentToken: 'STX' | 'sBTC') => {
    nftStorage.updateNFTPrice(nftId, price, paymentToken)
    // Refresh the list to show the updated NFT
    fetchNFTs(false)
  }

  // Update NFT completely (for listing status, transaction IDs, etc.)
  const updateNFT = (nftId: number, updates: Partial<NFT>) => {
    const existingNFTs = nftStorage.getStoredNFTs()
    const updatedNFTs = existingNFTs.map(nft => {
      if (nft.id === nftId) {
        return { ...nft, ...updates }
      }
      return nft
    })
    nftStorage.storeNFTs(updatedNFTs)
    // Refresh the list to show the updated NFT
    fetchNFTs(false)
  }

  useEffect(() => {
    // Load stored NFTs immediately
    const storedNFTs = nftStorage.getStoredNFTs()
    if (storedNFTs.length > 0) {
      setNfts(storedNFTs)
      setLoading(false)
    }
    
    // Then fetch from contract
    fetchNFTs()
    
    // Subscribe to storage updates
    const unsubscribe = nftStorage.subscribe((updatedNFTs) => {
      setNfts(updatedNFTs)
    })
    
    // Start polling after initial load
    const timer = setTimeout(() => {
      startPolling(15000) // Poll every 15 seconds
    }, 2000)
    
    // Start global sync
    nftStorage.startSync()
    
    return () => {
      clearTimeout(timer)
      stopPolling()
      unsubscribe()
      nftStorage.stopSync()
    }
  }, [])

  const getNFTById = async (id: number): Promise<NFT | null> => {
    try {
      return await getNFTById(id)
    } catch (err) {
      console.error('Error fetching NFT by ID:', err)
      return null
    }
  }

  const getNFTsByCreator = async (creatorAddress: string): Promise<NFT[]> => {
    try {
      return await getNFTsByCreator(creatorAddress)
    } catch (err) {
      console.error('Error fetching NFTs by creator:', err)
      return []
    }
  }

  return {
    nfts,
    loading,
    error,
    refreshNFTs,
    getNFTById,
    getNFTsByCreator,
    addNFT,
    updateNFTPrice,
    updateNFT,
    isPolling,
    startPolling,
    stopPolling,
    lastTokenId
  }
}
