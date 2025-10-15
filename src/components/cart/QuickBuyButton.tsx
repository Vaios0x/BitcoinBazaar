'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus } from 'lucide-react'
import type { NFT } from '@/types/nft'

interface QuickBuyButtonProps {
  nft: NFT
  onAddToCart: (nft: NFT) => void
  className?: string
}

export function QuickBuyButton({ nft, onAddToCart, className = '' }: QuickBuyButtonProps) {
  const handleClick = () => {
    onAddToCart(nft)
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`w-full py-3 px-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center space-x-2 relative z-10">
        <ShoppingCart className="w-4 h-4" />
        <span>Quick Buy</span>
        {nft.paymentToken === 'sBTC' && (
          <motion.span
            className="text-bitcoin-500"
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ₿
          </motion.span>
        )}
      </div>
      
      {/* Animated Bitcoin symbols in button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.5, 1.2, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-white text-xl">₿</span>
      </motion.div>
    </motion.button>
  )
}
