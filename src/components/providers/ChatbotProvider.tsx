'use client'

import React from 'react'
import { Chatbot } from '@/components/chatbot/Chatbot'
import { ChatbotButton } from '@/components/chatbot/ChatbotButton'
import { useChatbot } from '@/lib/hooks/useChatbot'

interface ChatbotProviderProps {
  children: any
}

export function ChatbotProvider({ children }: ChatbotProviderProps) {
  const { isOpen, openChatbot, closeChatbot } = useChatbot()

  return (
    <>
      {children}
      <ChatbotButton onClick={openChatbot} />
      <Chatbot isOpen={isOpen} onClose={closeChatbot} />
    </>
  )
}
