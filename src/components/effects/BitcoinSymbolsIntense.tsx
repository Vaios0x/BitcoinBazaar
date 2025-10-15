'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function BitcoinSymbolsIntense() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Ultra-intense predefined values with maximum coverage
  const predefinedSymbols = [
    { id: 0, x: 15, y: 20, size: 0.4, delay: 0, duration: 18, opacity: 0.3 },
    { id: 1, x: 85, y: 15, size: 0.6, delay: 1, duration: 20, opacity: 0.25 },
    { id: 2, x: 25, y: 80, size: 0.5, delay: 2, duration: 22, opacity: 0.35 },
    { id: 3, x: 75, y: 70, size: 0.3, delay: 0.5, duration: 16, opacity: 0.2 },
    { id: 4, x: 45, y: 35, size: 0.7, delay: 1.5, duration: 24, opacity: 0.4 },
    { id: 5, x: 90, y: 85, size: 0.4, delay: 3, duration: 19, opacity: 0.3 },
    { id: 6, x: 10, y: 60, size: 0.6, delay: 0.8, duration: 21, opacity: 0.28 },
    { id: 7, x: 65, y: 25, size: 0.5, delay: 2.5, duration: 17, opacity: 0.32 },
    { id: 8, x: 35, y: 90, size: 0.4, delay: 1.2, duration: 23, opacity: 0.22 },
    { id: 9, x: 80, y: 45, size: 0.6, delay: 0.3, duration: 20, opacity: 0.38 },
    { id: 10, x: 55, y: 10, size: 0.5, delay: 2.2, duration: 18, opacity: 0.26 },
    { id: 11, x: 95, y: 55, size: 0.3, delay: 1.8, duration: 25, opacity: 0.24 },
    { id: 12, x: 5, y: 40, size: 0.7, delay: 0.7, duration: 19, opacity: 0.36 },
    { id: 13, x: 70, y: 95, size: 0.4, delay: 3.2, duration: 21, opacity: 0.29 },
    { id: 14, x: 40, y: 5, size: 0.6, delay: 1.1, duration: 17, opacity: 0.34 },
    { id: 15, x: 60, y: 75, size: 0.5, delay: 2.8, duration: 22, opacity: 0.27 },
    { id: 16, x: 20, y: 50, size: 0.4, delay: 0.4, duration: 20, opacity: 0.31 },
    { id: 17, x: 88, y: 30, size: 0.6, delay: 1.7, duration: 18, opacity: 0.23 },
    { id: 18, x: 12, y: 85, size: 0.5, delay: 2.1, duration: 24, opacity: 0.33 },
    { id: 19, x: 78, y: 65, size: 0.3, delay: 0.9, duration: 16, opacity: 0.21 },
    // Additional symbols for maximum coverage
    { id: 20, x: 50, y: 50, size: 0.8, delay: 1.5, duration: 26, opacity: 0.45 },
    { id: 21, x: 30, y: 10, size: 0.4, delay: 2.3, duration: 19, opacity: 0.28 },
    { id: 22, x: 70, y: 90, size: 0.5, delay: 0.6, duration: 23, opacity: 0.32 },
    { id: 23, x: 10, y: 30, size: 0.6, delay: 3.1, duration: 21, opacity: 0.29 },
    { id: 24, x: 90, y: 70, size: 0.4, delay: 1.9, duration: 17, opacity: 0.26 },
    { id: 25, x: 40, y: 60, size: 0.7, delay: 0.8, duration: 24, opacity: 0.37 },
    { id: 26, x: 60, y: 40, size: 0.5, delay: 2.7, duration: 20, opacity: 0.30 },
    { id: 27, x: 15, y: 85, size: 0.6, delay: 1.3, duration: 22, opacity: 0.34 },
    { id: 28, x: 85, y: 15, size: 0.4, delay: 0.9, duration: 18, opacity: 0.25 },
    { id: 29, x: 35, y: 25, size: 0.8, delay: 2.1, duration: 25, opacity: 0.39 },
    { id: 30, x: 65, y: 85, size: 0.5, delay: 1.6, duration: 21, opacity: 0.27 },
    { id: 31, x: 5, y: 70, size: 0.6, delay: 2.9, duration: 23, opacity: 0.31 },
    { id: 32, x: 95, y: 30, size: 0.4, delay: 0.7, duration: 19, opacity: 0.24 },
    { id: 33, x: 25, y: 45, size: 0.7, delay: 1.8, duration: 24, opacity: 0.35 },
    { id: 34, x: 75, y: 55, size: 0.5, delay: 2.4, duration: 20, opacity: 0.28 },
    { id: 35, x: 45, y: 15, size: 0.6, delay: 0.5, duration: 22, opacity: 0.33 },
    { id: 36, x: 55, y: 75, size: 0.4, delay: 3.3, duration: 18, opacity: 0.26 },
    { id: 37, x: 15, y: 55, size: 0.8, delay: 1.1, duration: 25, opacity: 0.40 },
    { id: 38, x: 85, y: 45, size: 0.5, delay: 2.6, duration: 21, opacity: 0.29 },
    { id: 39, x: 35, y: 75, size: 0.6, delay: 0.8, duration: 23, opacity: 0.32 }
  ]

  const symbols = isClient ? predefinedSymbols : []

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main floating symbols with enhanced intensity */}
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
            opacity: [symbol.opacity, symbol.opacity * 2.5, symbol.opacity],
            scale: [0.5, 1.5, 0.8],
            rotate: [0, 360, 720],
            x: [0, (symbol.id % 3) * 60 - 60],
            y: [0, (symbol.id % 4) * 50 - 75]
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
      
      {/* Ultra-intense floating Bitcoin symbols */}
      {isClient && Array.from({ length: 20 }, (_, i) => {
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
          { x: 95, y: 45, size: 0.7 },
          { x: 30, y: 60, size: 0.6 },
          { x: 70, y: 35, size: 0.8 },
          { x: 40, y: 80, size: 0.9 },
          { x: 60, y: 20, size: 0.7 },
          { x: 20, y: 40, size: 0.8 },
          { x: 80, y: 70, size: 0.6 },
          { x: 35, y: 50, size: 0.9 },
          { x: 65, y: 65, size: 0.7 }
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
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
              y: [0, -150, -300],
              x: [0, (i % 3) * 40 - 40, (i % 5) * 60 - 120]
            }}
            transition={{
              duration: 6 + (i % 3),
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            ₿
          </motion.div>
        )
      })}
      
      {/* Ultra-intense pulsing Bitcoin symbols */}
      {isClient && Array.from({ length: 15 }, (_, i) => {
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
          { x: 85, y: 55, size: 0.7 },
          { x: 15, y: 35, size: 0.6 },
          { x: 75, y: 65, size: 0.8 },
          { x: 50, y: 25, size: 0.7 },
          { x: 25, y: 65, size: 0.5 },
          { x: 65, y: 35, size: 0.9 }
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
              scale: [1, 2, 1],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: 2 + (i % 2),
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ₿
          </motion.div>
        )
      })}
      
      {/* Ultra-intense orbiting Bitcoin symbols */}
      {isClient && Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute text-bitcoin-400 font-bold select-none"
          style={{
            left: '50%',
            top: '50%',
            fontSize: `${0.6 + i * 0.3}rem`
          }}
          animate={{
            rotate: 360,
            x: [0, Math.cos(i * Math.PI / 2) * (120 + i * 60)],
            y: [0, Math.sin(i * Math.PI / 2) * (120 + i * 60)]
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ₿
        </motion.div>
      ))}
      
      {/* Bitcoin symbol waves with enhanced intensity */}
      {isClient && Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute text-bitcoin-300 font-bold select-none"
          style={{
            left: `${15 + i * 15}%`,
            top: `${25 + i * 12}%`,
            fontSize: `${0.8 + i * 0.3}rem`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.5, 0.8]
          }}
          transition={{
            duration: 3 + i,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ₿
        </motion.div>
      ))}
      
      {/* Bitcoin symbol sparkles with enhanced intensity */}
      {isClient && Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-bitcoin-400 font-bold select-none"
          style={{
            left: `${8 + (i % 4) * 22}%`,
            top: `${15 + Math.floor(i / 4) * 25}%`,
            fontSize: `${0.3 + (i % 4) * 0.2}rem`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
            rotate: [0, 360, 720]
          }}
          transition={{
            duration: 1.5 + (i % 3),
            delay: i * 0.1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ₿
        </motion.div>
      ))}
      
      {/* Bitcoin symbol rain effect */}
      {isClient && Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute text-bitcoin-500 font-bold select-none"
          style={{
            left: `${10 + (i % 5) * 20}%`,
            top: `-10%`,
            fontSize: `${0.4 + (i % 3) * 0.2}rem`
          }}
          animate={{
            y: ['-10%', '110%'],
            opacity: [0, 0.8, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8 + (i % 3),
            delay: i * 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ₿
        </motion.div>
      ))}
    </div>
  )
}
