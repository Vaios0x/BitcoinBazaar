'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function BitcoinSymbols() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Enhanced predefined values with more symbols and varied animations
  const predefinedSymbols = [
    { id: 0, x: 15, y: 20, size: 0.4, delay: 0, duration: 18, opacity: 0.2 },
    { id: 1, x: 85, y: 15, size: 0.6, delay: 1, duration: 20, opacity: 0.15 },
    { id: 2, x: 25, y: 80, size: 0.5, delay: 2, duration: 22, opacity: 0.25 },
    { id: 3, x: 75, y: 70, size: 0.3, delay: 0.5, duration: 16, opacity: 0.1 },
    { id: 4, x: 45, y: 35, size: 0.7, delay: 1.5, duration: 24, opacity: 0.3 },
    { id: 5, x: 90, y: 85, size: 0.4, delay: 3, duration: 19, opacity: 0.2 },
    { id: 6, x: 10, y: 60, size: 0.6, delay: 0.8, duration: 21, opacity: 0.18 },
    { id: 7, x: 65, y: 25, size: 0.5, delay: 2.5, duration: 17, opacity: 0.22 },
    { id: 8, x: 35, y: 90, size: 0.4, delay: 1.2, duration: 23, opacity: 0.12 },
    { id: 9, x: 80, y: 45, size: 0.6, delay: 0.3, duration: 20, opacity: 0.28 },
    { id: 10, x: 55, y: 10, size: 0.5, delay: 2.2, duration: 18, opacity: 0.16 },
    { id: 11, x: 95, y: 55, size: 0.3, delay: 1.8, duration: 25, opacity: 0.14 },
    { id: 12, x: 5, y: 40, size: 0.7, delay: 0.7, duration: 19, opacity: 0.26 },
    { id: 13, x: 70, y: 95, size: 0.4, delay: 3.2, duration: 21, opacity: 0.19 },
    { id: 14, x: 40, y: 5, size: 0.6, delay: 1.1, duration: 17, opacity: 0.24 },
    { id: 15, x: 60, y: 75, size: 0.5, delay: 2.8, duration: 22, opacity: 0.17 },
    { id: 16, x: 20, y: 50, size: 0.4, delay: 0.4, duration: 20, opacity: 0.21 },
    { id: 17, x: 88, y: 30, size: 0.6, delay: 1.7, duration: 18, opacity: 0.13 },
    { id: 18, x: 12, y: 85, size: 0.5, delay: 2.1, duration: 24, opacity: 0.23 },
    { id: 19, x: 78, y: 65, size: 0.3, delay: 0.9, duration: 16, opacity: 0.11 },
    // Additional symbols for enhanced coverage
    { id: 20, x: 50, y: 50, size: 0.8, delay: 1.5, duration: 26, opacity: 0.35 },
    { id: 21, x: 30, y: 10, size: 0.4, delay: 2.3, duration: 19, opacity: 0.18 },
    { id: 22, x: 70, y: 90, size: 0.5, delay: 0.6, duration: 23, opacity: 0.22 },
    { id: 23, x: 10, y: 30, size: 0.6, delay: 3.1, duration: 21, opacity: 0.19 },
    { id: 24, x: 90, y: 70, size: 0.4, delay: 1.9, duration: 17, opacity: 0.16 },
    { id: 25, x: 40, y: 60, size: 0.7, delay: 0.8, duration: 24, opacity: 0.27 },
    { id: 26, x: 60, y: 40, size: 0.5, delay: 2.7, duration: 20, opacity: 0.20 },
    { id: 27, x: 15, y: 85, size: 0.6, delay: 1.3, duration: 22, opacity: 0.24 },
    { id: 28, x: 85, y: 15, size: 0.4, delay: 0.9, duration: 18, opacity: 0.15 },
    { id: 29, x: 35, y: 25, size: 0.8, delay: 2.1, duration: 25, opacity: 0.29 }
  ]

  const symbols = isClient ? predefinedSymbols : []

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main floating symbols */}
      {symbols.map((symbol) => (
        <motion.div
          key={symbol.id}
          className="absolute text-bitcoin-500 font-bold select-none"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}rem`,
            opacity: symbol.opacity
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{
            opacity: [symbol.opacity, symbol.opacity * 2, symbol.opacity],
            scale: [0.5, 1.2, 0.8],
            rotate: [0, 360, 720],
            x: [0, (symbol.id % 3) * 50 - 50],
            y: [0, (symbol.id % 4) * 40 - 60]
          }}
          transition={{
            duration: symbol.duration,
            delay: symbol.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ₿
        </motion.div>
      ))}
      
      {/* Enhanced floating Bitcoin symbols with different animations */}
      {isClient && Array.from({ length: 12 }, (_, i) => {
        const positions = [
          { x: 20, y: 30, size: 0.8 },
          { x: 80, y: 20, size: 1.2 },
          { x: 15, y: 70, size: 0.9 },
          { x: 85, y: 80, size: 1.1 },
          { x: 50, y: 10, size: 0.7 },
          { x: 10, y: 90, size: 1.3 },
          { x: 90, y: 60, size: 0.6 },
          { x: 60, y: 40, size: 1.0 },
          { x: 25, y: 15, size: 0.5 },
          { x: 75, y: 85, size: 0.9 },
          { x: 5, y: 50, size: 0.8 },
          { x: 95, y: 45, size: 0.7 }
        ]
        const pos = positions[i] || { x: 50, y: 50, size: 0.8 }
        
        return (
          <motion.div
            key={`floating-${i}`}
            className="absolute text-bitcoin-400 font-bold select-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontSize: `${pos.size}rem`
            }}
            initial={{ 
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -100, -200],
              x: [0, (i % 3) * 30 - 30, (i % 5) * 40 - 80]
            }}
            transition={{
              duration: 8 + (i % 4),
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            ₿
          </motion.div>
        )
      })}
      
      {/* Enhanced pulsing Bitcoin symbols */}
      {isClient && Array.from({ length: 10 }, (_, i) => {
        const positions = [
          { x: 30, y: 25, size: 0.6 },
          { x: 70, y: 15, size: 0.8 },
          { x: 20, y: 75, size: 0.5 },
          { x: 80, y: 85, size: 0.9 },
          { x: 45, y: 50, size: 0.7 },
          { x: 90, y: 35, size: 0.4 },
          { x: 10, y: 45, size: 0.6 },
          { x: 60, y: 80, size: 0.8 },
          { x: 40, y: 15, size: 0.5 },
          { x: 85, y: 55, size: 0.7 }
        ]
        const pos = positions[i] || { x: 50, y: 50, size: 0.6 }
        
        return (
          <motion.div
            key={`pulse-${i}`}
            className="absolute text-bitcoin-500 font-bold select-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontSize: `${pos.size}rem`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + (i % 2),
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ₿
          </motion.div>
        )
      })}
      
      {/* Enhanced orbiting Bitcoin symbols */}
      {isClient && Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute text-bitcoin-400 font-bold select-none"
          style={{
            left: '50%',
            top: '50%',
            fontSize: `${0.6 + i * 0.2}rem`
          }}
          animate={{
            rotate: 360,
            x: [0, Math.cos(i * Math.PI / 2) * (100 + i * 50)],
            y: [0, Math.sin(i * Math.PI / 2) * (100 + i * 50)]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ₿
        </motion.div>
      ))}
      
      {/* Bitcoin symbol waves */}
      {isClient && Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute text-bitcoin-300 font-bold select-none"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
            fontSize: `${0.8 + i * 0.2}rem`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 4 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ₿
        </motion.div>
      ))}
      
      {/* Bitcoin symbol sparkles */}
      {isClient && Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-bitcoin-400 font-bold select-none"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${20 + Math.floor(i / 4) * 30}%`,
            fontSize: `${0.3 + (i % 3) * 0.2}rem`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2 + (i % 3),
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ₿
        </motion.div>
      ))}
    </div>
  )
}
