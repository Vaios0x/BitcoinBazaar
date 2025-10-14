'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Bitcoin, Zap, Shield } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy el asistente de BitcoinBazaar. Soy experto en Bitcoin, sBTC, Stacks, NFTs y DeFi. ¿En qué puedo ayudarte?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Bitcoin & sBTC expertise
    if (input.includes('bitcoin') || input.includes('btc')) {
      return `Bitcoin es la base de BitcoinBazaar. Nuestros NFTs están asegurados por la red Bitcoin y usamos sBTC (trustless Bitcoin peg) para pagos. sBTC es único porque no requiere custodios centralizados - es completamente descentralizado. ¿Te interesa saber más sobre cómo funciona sBTC en Stacks?`
    }

    if (input.includes('sbtc') || input.includes('stacked bitcoin')) {
      return `sBTC es Bitcoin trustless en Stacks. A diferencia de wBTC, sBTC no requiere custodios centralizados. Se crea mediante stacking de STX y está respaldado por la seguridad de Bitcoin. En BitcoinBazaar puedes comprar NFTs con sBTC directamente. ¿Quieres saber cómo obtener sBTC?`
    }

    // Stacks expertise
    if (input.includes('stacks') || input.includes('stx')) {
      return `Stacks es la blockchain que hace posible BitcoinBazaar. Permite smart contracts asegurados por Bitcoin. STX es el token nativo para gas fees y stacking. Nuestro marketplace usa tanto STX como sBTC para pagos. ¿Te interesa el stacking de STX?`
    }

    if (input.includes('testnet') || input.includes('mainnet')) {
      return `BitcoinBazaar soporta tanto Testnet como Mainnet de Stacks. En Testnet puedes probar todas las funciones sin costo real. Mainnet es para transacciones reales. Puedes cambiar entre redes en tu wallet. ¿En qué red quieres operar?`
    }

    // NFT expertise
    if (input.includes('nft') || input.includes('colección')) {
      return `BitcoinBazaar tiene NFTs únicos: Bitcoin-native NFTs con verificación de bloques Bitcoin, Gaming NFTs con stats y batallas, y DeFi NFTs para staking. Cada NFT tiene metadata rica y royalties automáticos. ¿Te interesa crear, comprar o vender NFTs?`
    }

    if (input.includes('crear') || input.includes('mint')) {
      return `Para crear NFTs en BitcoinBazaar: 1) Conecta tu wallet, 2) Sube tu imagen, 3) Configura metadata y royalties, 4) Elige precio en STX o sBTC, 5) Mint gratis con lazy minting. Los NFTs se verifican con bloques Bitcoin. ¿Necesitas ayuda con algún paso?`
    }

    // Gaming expertise
    if (input.includes('gaming') || input.includes('battle') || input.includes('juego')) {
      return `Nuestro sistema de Gaming NFTs es único: cada NFT tiene stats (HP, Attack, Defense, Speed), puede luchar contra otros, ganar XP y level up, y ganar sBTC en batallas. Los NFTs más fuertes ganan más. ¿Quieres saber cómo funciona el sistema de batallas?`
    }

    if (input.includes('stats') || input.includes('estadísticas')) {
      return `Los Gaming NFTs tienen 8 stats principales: HP (vida), Attack (ataque), Defense (defensa), Speed (velocidad), Level (nivel), XP (experiencia), Wins (victorias), y Total Earnings (ganancias). Puedes mejorar estos stats con entrenamiento y batallas. ¿Te interesa algún stat específico?`
    }

    // DeFi expertise
    if (input.includes('defi') || input.includes('staking') || input.includes('lending')) {
      return `BitcoinBazaar tiene DeFi avanzado: puedes hacer staking de NFTs para ganar hasta 20% APY, prestar contra NFTs como colateral, y proveer liquidez. Todo está asegurado por Bitcoin. ¿Te interesa el staking o lending?`
    }

    if (input.includes('apy') || input.includes('rendimiento')) {
      return `Los rendimientos en BitcoinBazaar: Staking de NFTs hasta 20% APY, Lending con tasas competitivas, y Yield farming en pools de liquidez. Todo está respaldado por la seguridad de Bitcoin. ¿Quieres saber cómo maximizar tus rendimientos?`
    }

    // Wallet expertise
    if (input.includes('wallet') || input.includes('conectar')) {
      return `BitcoinBazaar soporta Xverse y Leather wallets. Xverse es ideal para Bitcoin + Stacks + sBTC. Leather es perfecto para Stacks. Ambos funcionan en Testnet y Mainnet. ¿Necesitas ayuda conectando tu wallet?`
    }

    if (input.includes('xverse') || input.includes('leather')) {
      return `Xverse es la wallet recomendada para BitcoinBazaar - soporta Bitcoin, Stacks y sBTC nativamente. Leather es excelente para Stacks. Ambas son seguras y fáciles de usar. ¿Tienes alguna wallet instalada?`
    }

    // Pricing expertise
    if (input.includes('precio') || input.includes('price') || input.includes('costo')) {
      return `Los precios en BitcoinBazaar son dinámicos y únicos: cambian según bloques Bitcoin, hay descuentos en "lucky blocks", y puedes pagar con STX o sBTC. Los precios se ajustan automáticamente. ¿Te interesa saber sobre pricing dinámico?`
    }

    if (input.includes('lucky') || input.includes('descuento')) {
      return `Los "lucky blocks" de Bitcoin dan descuentos automáticos en BitcoinBazaar. Cuando Bitcoin mina un bloque especial, todos los NFTs tienen descuentos. Es una característica única que solo es posible en Stacks. ¿Quieres saber cuándo es el próximo lucky block?`
    }

    // Technical expertise
    if (input.includes('contrato') || input.includes('smart contract') || input.includes('clarity')) {
      return `BitcoinBazaar usa 10 smart contracts en Clarity: NFT Core, Marketplace, Gaming, DeFi, Bitcoin Oracle, y más. Todos están optimizados para Stacks y Bitcoin. ¿Te interesa algún contrato específico?`
    }

    if (input.includes('oracle') || input.includes('bitcoin oracle')) {
      return `Nuestro Bitcoin Oracle es único: usa datos de Bitcoin blockchain para features imposibles en otras chains. Precios dinámicos, verificaciones de bloques, y eventos especiales. Es nuestro killer feature. ¿Quieres saber cómo funciona?`
    }

    // General help
    if (input.includes('ayuda') || input.includes('help') || input.includes('¿qué')) {
      return `Puedo ayudarte con: Bitcoin y sBTC, Stacks y STX, NFTs y colecciones, Gaming y batallas, DeFi y staking, Wallets y conexión, Precios dinámicos, Smart contracts, y más. ¿Sobre qué quieres saber?`
    }

    // Default response
    return `Interesante pregunta. Como experto en BitcoinBazaar, puedo ayudarte con Bitcoin, sBTC, Stacks, NFTs, Gaming, DeFi, wallets, precios dinámicos, y smart contracts. ¿Podrías ser más específico sobre qué te interesa?`
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Chatbot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-4 right-4 w-80 h-[500px] glass-card rounded-2xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">BitcoinBazaar AI</h3>
                  <p className="text-xs text-gray-400">Experto en Bitcoin & Stacks</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-stacks-500' 
                        : 'bg-gradient-to-br from-bitcoin-500 to-stacks-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className={`glass-card p-2 rounded-xl ${
                      message.type === 'user' 
                        ? 'bg-stacks-500/20 border-stacks-500/30' 
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <p className="text-xs text-white">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-bitcoin-500 to-stacks-500 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="glass-card p-2 rounded-xl bg-white/5 border-white/10">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pregunta sobre Bitcoin, sBTC, Stacks..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-stacks-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-3 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
