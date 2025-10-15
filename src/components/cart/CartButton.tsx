'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

interface CartButtonProps {
  itemCount: number
  onClick: () => void
  className?: string
}

export function CartButton({ itemCount, onClick, className = '' }: CartButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative p-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-2">
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
          >
            {itemCount > 99 ? '99+' : itemCount}
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
