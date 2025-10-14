'use client'

import React from 'react'

export function useBitcoinPrice(nftId: number) {
  const [currentBlock, setCurrentBlock] = React.useState(840000)
  const [dynamicPrice, setDynamicPrice] = React.useState(0)
  const [isDynamicPricing, setIsDynamicPricing] = React.useState(false)
  const [discount, setDiscount] = React.useState(0)

  React.useEffect(() => {
    fetchBitcoinBlock()
    const interval = setInterval(fetchBitcoinBlock, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [nftId])

  const fetchBitcoinBlock = async () => {
    try {
      // Simulate Bitcoin block height
      const block = 840000 + Math.floor(Date.now() / 1000 / 600) // Simulate block progression
      setCurrentBlock(block)
      
      // Check if lucky block (divisible by 100)
      const isLucky = block % 100 === 0
      
      if (isLucky) {
        setIsDynamicPricing(true)
        setDiscount(10) // 10% discount
        setDynamicPrice(90) // 10% off base price
      } else {
        setIsDynamicPricing(false)
        setDiscount(0)
        setDynamicPrice(100) // Base price
      }
    } catch (error) {
      console.error('Error fetching Bitcoin block:', error)
    }
  }

  return {
    currentBlock,
    dynamicPrice,
    isDynamicPricing,
    discount
  }
}
