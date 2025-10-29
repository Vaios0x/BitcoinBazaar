'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ExternalLink, 
  Copy, 
  Hash,
  Sparkles,
  Zap,
  Bitcoin,
  Network,
  Layers
} from 'lucide-react'

interface NeuralNotificationProps {
  type: 'loading' | 'success' | 'error'
  message: string
  txId?: string
  explorerUrl?: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

export function NeuralNotification({ 
  type, 
  message, 
  txId, 
  explorerUrl, 
  onClose,
  autoClose = true,
  duration = 15000
}: NeuralNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const isClosingRef = useRef(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (autoClose && type === 'success') {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 500)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, type, onClose])

  const handleClose = () => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    try {
      onClose?.()
    } catch (e) {}
    setIsVisible(false)
  }

  const copyToClipboard = async (text: string) => {
    try {
      // Intentar usar la API moderna del clipboard
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      }
      
      // Fallback para navegadores más antiguos o contextos no seguros
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      
      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        throw new Error('Copy command failed')
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
      // Mostrar un mensaje de error o fallback
      alert('No se pudo copiar el hash. Por favor, selecciona y copia manualmente.')
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'loading':
        return <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-green-400" />
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />
    }
  }

  const getBgClass = () => {
    switch (type) {
      case 'loading':
        return 'glass-card-cyber'
      case 'success':
        return 'glass-card-holographic'
      case 'error':
        return 'glass-card-bitcoin'
    }
  }

  const getGlowClass = () => {
    switch (type) {
      case 'loading':
        return 'shadow-cyan-500/70'
      case 'success':
        return 'shadow-holographic-lg'
      case 'error':
        return 'shadow-bitcoin-lg'
    }
  }

  const getNeuralEffect = () => {
    switch (type) {
      case 'loading':
        return 'neural-grid'
      case 'success':
        return 'holographic-background'
      case 'error':
        return 'neural-network-overlay'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: -100, scale: 0.8, rotateX: 15 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.6
          }}
          role="dialog" aria-modal="true"
          className={`fixed top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-[calc(100vw-2rem)] max-w-sm sm:max-w-md md:max-w-lg mx-4 ${getBgClass()} ${getGlowClass()} border-2 rounded-2xl p-4 sm:p-6 backdrop-blur-xl pointer-events-auto`}
        >
          {/* Neural Background Effect */}
          <div className={`absolute inset-0 z-0 ${getNeuralEffect()} rounded-2xl opacity-30`} />
          
          {/* Main Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {getIcon()}
                  {/* Neural pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: type === 'success' ? 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)' :
                                   type === 'loading' ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)' :
                                   'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)'
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {type === 'success' && '¡NFT Creado!'}
                    {type === 'loading' && 'Creando NFT...'}
                    {type === 'error' && 'Error al Crear NFT'}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {message}
                  </p>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                type="button"
                aria-label="Cerrar notificación"
                onMouseDown={(e) => e.stopPropagation()}
                onClickCapture={(e) => { e.stopPropagation() }}
                className="relative z-50 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 pointer-events-auto"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Transaction Details */}
            {txId && (
              <div className="space-y-3">
                {/* Transaction ID */}
                <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-semibold text-white">Transaction Hash</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(txId)}
                      className={`relative z-20 flex items-center space-x-1 text-xs sm:text-sm transition-colors p-2 rounded cursor-pointer ${
                        copied 
                          ? 'text-green-400 bg-green-400/10 border border-green-400/30' 
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm text-gray-300 break-all leading-relaxed">
                    {txId}
                  </div>
                </div>

                {/* Explorer Link */}
                {explorerUrl && (
                  <motion.a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 rounded-xl p-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 neon-glow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      window.open(explorerUrl, '_blank', 'noopener,noreferrer')
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ver en Stacks Testnet Explorer</span>
                    <Network className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            )}

            {/* Neural Effects */}
            <div className="absolute -top-2 -right-2 z-5">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-bitcoin-400 text-lg"
              >
                ₿
              </motion.div>
            </div>

            <div className="absolute -bottom-1 -left-1 z-5">
              <motion.div
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-stacks-400 text-sm"
              >
                <Layers className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Floating Particles */}
            {type === 'success' && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-green-400 rounded-full z-5"
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.random() * 30 - 15, 0],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${15 + i * 12}%`,
                      top: `${25 + i * 8}%`
                    }}
                  />
                ))}
                {/* Bitcoin symbols floating */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`btc-${i}`}
                    className="absolute text-bitcoin-400 text-xs z-5"
                    animate={{
                      y: [0, -25, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0, 0.8, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${40 + i * 15}%`
                    }}
                  >
                    ₿
                  </motion.div>
                ))}
              </>
            )}

            {/* Holographic Border Animation */}
            <motion.div
              className="absolute inset-0 z-0 rounded-2xl border-2 border-transparent"
              animate={{
                background: [
                  'linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.3), transparent)',
                  'linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                  'linear-gradient(45deg, transparent, rgba(249, 115, 22, 0.3), transparent)',
                  'linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.3), transparent)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundClip: 'border-box',
                WebkitBackgroundClip: 'border-box'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
