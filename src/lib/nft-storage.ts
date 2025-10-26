/**
 * NFT Storage Service
 * Manages persistent storage and synchronization of NFTs across users
 */

import type { NFT } from '@/types/nft'

const STORAGE_KEY = 'bitcoinbazaar_nfts'
const SYNC_INTERVAL = 10000 // 10 seconds

interface NFTStorageData {
  nfts: NFT[]
  lastSync: number
  version: string
}

class NFTStorageService {
  private static instance: NFTStorageService
  private listeners: Set<(nfts: NFT[]) => void> = new Set()
  private syncInterval: NodeJS.Timeout | null = null

  static getInstance(): NFTStorageService {
    if (!NFTStorageService.instance) {
      NFTStorageService.instance = new NFTStorageService()
    }
    return NFTStorageService.instance
  }

  // Get NFTs from local storage
  getStoredNFTs(): NFT[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: NFTStorageData = JSON.parse(stored)
        return data.nfts || []
      }
    } catch (error) {
      console.error('Error reading stored NFTs:', error)
    }
    return []
  }

  // Store NFTs in local storage
  storeNFTs(nfts: NFT[]): void {
    try {
      const data: NFTStorageData = {
        nfts,
        lastSync: Date.now(),
        version: '1.0.0'
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      
      // Notify listeners
      this.notifyListeners(nfts)
    } catch (error) {
      console.error('Error storing NFTs:', error)
    }
  }

  // Add a new NFT to storage
  addNFT(nft: NFT): void {
    const existingNFTs = this.getStoredNFTs()
    
    // Check if NFT already exists (by ID and transaction hash)
    const exists = existingNFTs.some(existing => 
      existing.id === nft.id && existing.transactionHash === nft.transactionHash
    )
    
    if (!exists) {
      const updatedNFTs = [nft, ...existingNFTs]
      this.storeNFTs(updatedNFTs)
      console.log(`✅ NFT ${nft.name} added to global storage`)
    }
  }

  // Merge NFTs from contract with stored NFTs
  mergeNFTs(contractNFTs: NFT[]): NFT[] {
    const storedNFTs = this.getStoredNFTs()
    
    // Create a map of stored NFTs by transaction hash for quick lookup
    const storedMap = new Map<string, NFT>()
    storedNFTs.forEach(nft => {
      if (nft.transactionHash) {
        storedMap.set(nft.transactionHash, nft)
      }
    })
    
    // Merge contract NFTs with stored NFTs
    const mergedNFTs: NFT[] = []
    
    // Add all contract NFTs
    contractNFTs.forEach(contractNFT => {
      mergedNFTs.push(contractNFT)
    })
    
    // Add stored NFTs that are not in contract (recently created)
    storedNFTs.forEach(storedNFT => {
      const existsInContract = contractNFTs.some(contractNFT => 
        contractNFT.id === storedNFT.id && 
        contractNFT.transactionHash === storedNFT.transactionHash
      )
      
      if (!existsInContract) {
        mergedNFTs.push(storedNFT)
      }
    })
    
    // Sort by creation date (newest first)
    return mergedNFTs.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime()
      const dateB = new Date(b.createdAt || 0).getTime()
      return dateB - dateA
    })
  }

  // Subscribe to NFT updates
  subscribe(listener: (nfts: NFT[]) => void): () => void {
    this.listeners.add(listener)
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener)
    }
  }

  // Notify all listeners
  private notifyListeners(nfts: NFT[]): void {
    this.listeners.forEach(listener => {
      try {
        listener(nfts)
      } catch (error) {
        console.error('Error notifying NFT listener:', error)
      }
    })
  }

  // Start automatic synchronization
  startSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }
    
    this.syncInterval = setInterval(() => {
      this.performSync()
    }, SYNC_INTERVAL)
  }

  // Stop automatic synchronization
  stopSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }
  }

  // Perform synchronization with other users' data
  private async performSync(): Promise<void> {
    try {
      // In a real implementation, this would sync with a server
      // For now, we'll just ensure local data is consistent
      const storedNFTs = this.getStoredNFTs()
      
      // Clean up old NFTs (older than 24 hours)
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)
      const recentNFTs = storedNFTs.filter(nft => {
        const createdAt = new Date(nft.createdAt || 0).getTime()
        return createdAt > oneDayAgo
      })
      
      if (recentNFTs.length !== storedNFTs.length) {
        this.storeNFTs(recentNFTs)
      }
    } catch (error) {
      console.error('Error during NFT sync:', error)
    }
  }

  // Get public NFTs (all NFTs visible to everyone)
  getPublicNFTs(): NFT[] {
    return this.getStoredNFTs()
  }

  // Update NFT price (for listing/unlisting)
  updateNFTPrice(nftId: number, price: number, paymentToken: 'STX' | 'sBTC'): void {
    const existingNFTs = this.getStoredNFTs()
    const updatedNFTs = existingNFTs.map(nft => {
      if (nft.id === nftId) {
        return {
          ...nft,
          price: price,
          paymentToken: paymentToken,
          usdPrice: price * 0.5 // Approximate USD conversion
        }
      }
      return nft
    })
    
    this.storeNFTs(updatedNFTs)
    console.log(`✅ NFT ${nftId} price updated to ${price} ${paymentToken}`)
  }

  // Clear all stored NFTs (for testing)
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY)
    this.notifyListeners([])
  }
}

export const nftStorage = NFTStorageService.getInstance()
