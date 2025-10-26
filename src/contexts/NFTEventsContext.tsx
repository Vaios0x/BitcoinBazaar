"use client"

/**
 * NFT Events Context
 * Manages real-time NFT creation events and updates
 */

import React, { createContext, useContext, useState, useCallback } from 'react'

interface NFTEvent {
  id: string
  type: 'nft_created' | 'nft_updated' | 'nft_sold'
  nftId: number
  transactionHash: string
  timestamp: number
  creator: string
  name: string
}

interface NFTEventsContextType {
  events: NFTEvent[]
  addEvent: (event: Omit<NFTEvent, 'id' | 'timestamp'>) => void
  clearEvents: () => void
  getLatestEvent: () => NFTEvent | null
  hasNewEvents: boolean
  markEventsAsRead: () => void
}

const NFTEventsContext = createContext(undefined as any)

export function NFTEventsProvider({ children }: { children: any }) {
  const [events, setEvents] = useState<NFTEvent[]>([])
  const [hasNewEvents, setHasNewEvents] = useState(false)

  const addEvent = useCallback((eventData: Omit<NFTEvent, 'id' | 'timestamp'>) => {
    const newEvent: NFTEvent = {
      ...eventData,
      id: `${eventData.type}_${eventData.nftId}_${Date.now()}`,
      timestamp: Date.now()
    }
    
    setEvents(prev => [newEvent, ...prev])
    setHasNewEvents(true)
    
    // Auto-clear after 30 seconds
    setTimeout(() => {
      setEvents(prev => prev.filter(e => e.id !== newEvent.id))
    }, 30000)
  }, [])

  const clearEvents = useCallback(() => {
    setEvents([])
    setHasNewEvents(false)
  }, [])

  const getLatestEvent = useCallback(() => {
    return events.length > 0 ? events[0] : null
  }, [events])

  const markEventsAsRead = useCallback(() => {
    setHasNewEvents(false)
  }, [])

  return (
    <NFTEventsContext.Provider value={{
      events,
      addEvent,
      clearEvents,
      getLatestEvent,
      hasNewEvents,
      markEventsAsRead
    }}>
      {children}
    </NFTEventsContext.Provider>
  )
}

export function useNFTEvents() {
  const context = useContext(NFTEventsContext)
  if (context === undefined) {
    throw new Error('useNFTEvents must be used within an NFTEventsProvider')
  }
  return context
}
