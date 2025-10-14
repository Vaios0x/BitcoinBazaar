'use client'

import React from 'react'

export function useChatbot() {
  const [isOpen, setIsOpen] = React.useState(false)

  const openChatbot = () => setIsOpen(true)
  const closeChatbot = () => setIsOpen(false)
  const toggleChatbot = () => setIsOpen(prev => !prev)

  return {
    isOpen,
    openChatbot,
    closeChatbot,
    toggleChatbot
  }
}
