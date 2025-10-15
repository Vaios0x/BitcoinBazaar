'use client'

import { useState, useCallback } from 'react'
import type { NFT } from '@/types/nft'

export function useGamingModals() {
  const [isStatsOpen, setIsStatsOpen] = useState(false)
  const [isBattleOpen, setIsBattleOpen] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  const openStats = useCallback((nft: NFT) => {
    setSelectedNFT(nft)
    setIsStatsOpen(true)
  }, [])

  const openBattle = useCallback((nft: NFT) => {
    setSelectedNFT(nft)
    setIsBattleOpen(true)
  }, [])

  const closeStats = useCallback(() => {
    setIsStatsOpen(false)
    setSelectedNFT(null)
  }, [])

  const closeBattle = useCallback(() => {
    setIsBattleOpen(false)
    setSelectedNFT(null)
  }, [])

  return {
    isStatsOpen,
    isBattleOpen,
    selectedNFT,
    openStats,
    openBattle,
    closeStats,
    closeBattle
  }
}
