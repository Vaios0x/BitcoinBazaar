'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Bot } from 'lucide-react'

interface ChatbotButtonProps {
  onClick: () => void
}

export function ChatbotButton({ onClick }: ChatbotButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-lg hover:shadow-bitcoin-500/50 transition-all"
    >
      <MessageCircle className="w-5 h-5 text-white" />
      
      {/* Notification dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
        <Bot className="w-1.5 h-1.5 text-white" />
      </div>
    </motion.button>
  )
}
