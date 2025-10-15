'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Holographic Background Effect
export const HolographicBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="holographic-grid" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="floating-particles" />
      </div>
      
      {/* Neural Network */}
      <div className="absolute inset-0">
        <div className="neural-network-overlay" />
      </div>
      
      {/* Cyber Aurora */}
      <div className="absolute inset-0">
        <div className="cyber-aurora" />
      </div>
    </div>
  )
}

// Bitcoin Symbol Animation
export const BitcoinSymbolAnimation = ({ 
  count = 20, 
  intensity = 'medium', 
  className = '' 
}: { 
  count?: number
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}) => {
  const intensityClasses: Record<string, string> = {
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-70'
  }
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${intensityClasses[intensity]} ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-bitcoin-500 text-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 5
          }}
        >
          ₿
        </motion.div>
      ))}
    </div>
  )
}

// Neural Network Overlay
export const NeuralNetworkOverlay = ({ 
  nodes = 50, 
  connections = 100, 
  className = '' 
}: { 
  nodes?: number
  connections?: number
  className?: string
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full opacity-20">
        {/* Neural Nodes */}
        {Array.from({ length: nodes }).map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={Math.random() * 100 + '%'}
            cy={Math.random() * 100 + '%'}
            r="2"
            fill="url(#neuralGradient)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5
            }}
          />
        ))}
        
        {/* Neural Connections */}
        {Array.from({ length: connections }).map((_, i) => (
          <motion.line
            key={`connection-${i}`}
            x1={Math.random() * 100 + '%'}
            y1={Math.random() * 100 + '%'}
            x2={Math.random() * 100 + '%'}
            y2={Math.random() * 100 + '%'}
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              pathLength: [0, 1, 0]
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 4
            }}
          />
        ))}
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#5546FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Cyber Grid Effect
export const CyberGridEffect = ({ 
  size = 50, 
  opacity = 0.1, 
  className = '' 
}: { 
  size?: number
  opacity?: number
  className?: string
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(85, 70, 255, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(85, 70, 255, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        animation: 'cyber-grid 20s linear infinite'
      }}
    />
  )
}

// Energy Flow Effect
export const EnergyFlowEffect = ({ 
  intensity = 'medium', 
  className = '' 
}: { 
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}) => {
  const intensityClasses: Record<string, string> = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60'
  }
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${intensityClasses[intensity]} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2
        }}
      />
    </div>
  )
}

// Holographic Scan Effect
export const HolographicScanEffect = ({ 
  speed = 2, 
  className = '' 
}: { 
  speed?: number
  className?: string
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
        animate={{
          y: ['-100%', '100%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

// Particle Burst Effect
export const ParticleBurstEffect = ({ 
  trigger, 
  position, 
  color = '#F97316', 
  className = '' 
}: { 
  trigger: boolean
  position: { x: number; y: number }
  color?: string
  className?: string
}) => {
  const [particles, setParticles] = React.useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])
  
  React.useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: position.x,
        y: position.y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10
      }))
      setParticles(newParticles)
      
      setTimeout(() => setParticles([]), 1000)
    }
  }, [trigger, position])
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
          animate={{
            x: particle.x + particle.vx * 50,
            y: particle.y + particle.vy * 50,
            opacity: 0,
            scale: 0
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// Blockchain Verification Effect
export const BlockchainVerificationEffect = ({ 
  isVerifying, 
  className = '' 
}: { 
  isVerifying: boolean
  className?: string
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {isVerifying && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}
    </div>
  )
}

// Premium Glow Effect
export const PremiumGlowEffect = ({ 
  color = '#F97316', 
  intensity = 0.5, 
  size = 100, 
  className = '' 
}: { 
  color?: string
  intensity?: number
  size?: number
  className?: string
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        filter: `blur(${size}px)`,
        animation: 'premium-glow 2s ease-in-out infinite alternate'
      }}
    />
  )
}

// Cyber Aurora Effect
export const CyberAuroraEffect = ({ 
  intensity = 'medium', 
  className = '' 
}: { 
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}) => {
  const intensityClasses: Record<string, string> = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60'
  }
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${intensityClasses[intensity]} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

// Neural Sync Effect
export const NeuralSyncEffect = ({ 
  isActive, 
  className = '' 
}: { 
  isActive: boolean
  className?: string
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </div>
  )
}

// Holographic Rainbow Effect
export const HolographicRainbowEffect = ({ 
  speed = 8, 
  className = '' 
}: { 
  speed?: number
  className?: string
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 via-purple-500/20 to-pink-500/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

// Premium Shimmer Effect
export const PremiumShimmerEffect = ({ 
  duration = 3, 
  className = '' 
}: { 
  duration?: number
  className?: string
}) => {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={{
        background: [
          'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
          'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)'
        ]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

// Cyber Energy Effect
export const CyberEnergyEffect = ({ 
  intensity = 0.3, 
  className = '' 
}: { 
  intensity?: number
  className?: string
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
        animate={{
          opacity: [0, intensity, 0],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  )
}

// Blockchain Pulse Effect
export const BlockchainPulseEffect = ({ 
  isActive, 
  className = '' 
}: { 
  isActive: boolean
  className?: string
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </div>
  )
}

// Premium Effects Container
export const PremiumEffectsContainer = ({ 
  children, 
  effects = [], 
  className = '' 
}: { 
  children: React.ReactNode
  effects?: string[]
  className?: string
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Effects */}
      <HolographicBackground />
      
      {/* Neural Network */}
      {effects.includes('neural') && <NeuralNetworkOverlay />}
      
      {/* Cyber Grid */}
      {effects.includes('cyber') && <CyberGridEffect />}
      
      {/* Energy Flow */}
      {effects.includes('energy') && <EnergyFlowEffect />}
      
      {/* Holographic Scan */}
      {effects.includes('scan') && <HolographicScanEffect />}
      
      {/* Cyber Aurora */}
      {effects.includes('aurora') && <CyberAuroraEffect />}
      
      {/* Neural Sync */}
      {effects.includes('sync') && <NeuralSyncEffect isActive={true} />}
      
      {/* Holographic Rainbow */}
      {effects.includes('rainbow') && <HolographicRainbowEffect />}
      
      {/* Premium Shimmer */}
      {effects.includes('shimmer') && <PremiumShimmerEffect />}
      
      {/* Cyber Energy */}
      {effects.includes('cyber-energy') && <CyberEnergyEffect />}
      
      {/* Blockchain Pulse */}
      {effects.includes('pulse') && <BlockchainPulseEffect isActive={true} />}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default PremiumEffectsContainer
