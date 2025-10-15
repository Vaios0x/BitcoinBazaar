'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Premium Branding System Component
export const BrandingSystem = () => {
  return (
    <div className="branding-system">
      {/* Holographic Background */}
      <div className="holographic-background" />
      
      {/* Neural Network Overlay */}
      <div className="neural-network-overlay" />
      
      {/* Floating Bitcoin Symbols */}
      <div className="floating-bitcoin-symbols" />
      
      {/* Cyber Grid */}
      <div className="cyber-grid" />
      
      {/* Energy Particles */}
      <div className="energy-particles" />
    </div>
  )
}

// Premium Button Component
interface PremiumButtonProps {
  variant: 'bitcoin' | 'stacks' | 'holographic' | 'cyber' | 'neural'
  size: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled = false,
  loading = false,
  className = ''
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300 ease-out'
  
  const variantClasses = {
    bitcoin: 'bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 text-white shadow-bitcoin hover:shadow-bitcoin-lg',
    stacks: 'bg-gradient-to-r from-stacks-500 to-stacks-600 text-white shadow-stacks hover:shadow-stacks-lg',
    holographic: 'bg-holographic-primary text-white shadow-holographic hover:shadow-holographic-lg',
    cyber: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/50 hover:shadow-cyan-500/70',
    neural: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-purple-500/50 hover:shadow-purple-500/70'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
  const loadingClasses = loading ? 'animate-pulse' : ''
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${loadingClasses}
        ${className}
      `}
    >
      {/* Holographic Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <span className="relative z-10">
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </span>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  )
}

// Premium Card Component
interface PremiumCardProps {
  variant: 'default' | 'premium' | 'bitcoin' | 'stacks' | 'holographic' | 'cyber' | 'neural'
  children: React.ReactNode
  hover?: boolean
  glow?: boolean
  className?: string
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  variant,
  children,
  hover = true,
  glow = false,
  className = ''
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300 ease-out'
  
  const variantClasses = {
    default: 'glass-card',
    premium: 'glass-card-premium',
    bitcoin: 'glass-card-bitcoin',
    stacks: 'glass-card-stacks',
    holographic: 'glass-card-holographic',
    cyber: 'glass-card-cyber',
    neural: 'glass-card-neural'
  }
  
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-xl' : ''
  const glowClasses = glow ? 'animate-glow' : ''
  
  return (
    <motion.div
      whileHover={{ scale: hover ? 1.02 : 1 }}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${glowClasses}
        ${className}
      `}
    >
      {/* Holographic Overlay */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-holographic-shift" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.div>
  )
}

// Premium Text Component
interface PremiumTextProps {
  variant: 'gradient' | 'bitcoin' | 'stacks' | 'holographic' | 'cyber' | 'neural'
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'
  children: React.ReactNode
  className?: string
}

export const PremiumText: React.FC<PremiumTextProps> = ({
  variant,
  size,
  children,
  className = ''
}) => {
  const baseClasses = 'font-bold'
  
  const variantClasses = {
    gradient: 'gradient-text',
    bitcoin: 'gradient-text-bitcoin',
    stacks: 'gradient-text-stacks',
    holographic: 'gradient-text-holographic',
    cyber: 'gradient-text-cyber',
    neural: 'gradient-text-neural'
  }
  
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl'
  }
  
  return (
    <span className={`
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </span>
  )
}

// Premium Icon Component
interface PremiumIconProps {
  icon: React.ComponentType<{ className?: string }>
  variant: 'bitcoin' | 'stacks' | 'holographic' | 'cyber' | 'neural'
  size: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

export const PremiumIcon: React.FC<PremiumIconProps> = ({
  icon: Icon,
  variant,
  size,
  animated = false,
  className = ''
}) => {
  const baseClasses = 'transition-all duration-300 ease-out'
  
  const variantClasses = {
    bitcoin: 'text-bitcoin-500',
    stacks: 'text-stacks-500',
    holographic: 'text-cyan-500',
    cyber: 'text-blue-500',
    neural: 'text-purple-500'
  }
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  const animatedClasses = animated ? 'animate-pulse' : ''
  
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${animatedClasses}
        ${className}
      `}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  )
}

// Premium Loading Component
interface PremiumLoadingProps {
  variant: 'dots' | 'spinner' | 'pulse' | 'bitcoin' | 'stacks' | 'holographic'
  size: 'sm' | 'md' | 'lg'
  className?: string
}

export const PremiumLoading: React.FC<PremiumLoadingProps> = ({
  variant,
  size,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  
  if (variant === 'dots') {
    return (
      <div className={`loading-dots ${className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
  
  if (variant === 'spinner') {
    return (
      <div className={`${sizeClasses[size]} border-2 border-white/30 border-t-white rounded-full animate-spin ${className}`} />
    )
  }
  
  if (variant === 'pulse') {
    return (
      <div className={`${sizeClasses[size]} bg-white/20 rounded-full animate-pulse ${className}`} />
    )
  }
  
  if (variant === 'bitcoin') {
    return (
      <div className={`${sizeClasses[size]} text-bitcoin-500 animate-bitcoin-pulse ${className}`}>
        ₿
      </div>
    )
  }
  
  if (variant === 'stacks') {
    return (
      <div className={`${sizeClasses[size]} text-stacks-500 animate-stacks-pulse ${className}`}>
        ⚡
      </div>
    )
  }
  
  if (variant === 'holographic') {
    return (
      <div className={`${sizeClasses[size]} text-cyan-500 animate-holographic-glow ${className}`}>
        ✨
      </div>
    )
  }
  
  return null
}

// Premium Badge Component
interface PremiumBadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info' | 'bitcoin' | 'stacks' | 'holographic'
  children: React.ReactNode
  className?: string
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  variant,
  children,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  
  const variantClasses = {
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    info: 'bg-info-100 text-info-800',
    bitcoin: 'bg-bitcoin-100 text-bitcoin-800',
    stacks: 'bg-stacks-100 text-stacks-800',
    holographic: 'bg-cyan-100 text-cyan-800'
  }
  
  return (
    <span className={`
      ${baseClasses}
      ${variantClasses[variant]}
      ${className}
    `}>
      {children}
    </span>
  )
}

// Premium Progress Component
interface PremiumProgressProps {
  value: number
  max?: number
  variant: 'bitcoin' | 'stacks' | 'holographic' | 'cyber' | 'neural'
  size: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

export const PremiumProgress: React.FC<PremiumProgressProps> = ({
  value,
  max = 100,
  variant,
  size,
  animated = false,
  className = ''
}) => {
  const percentage = (value / max) * 100
  
  const baseClasses = 'w-full bg-gray-200 rounded-full overflow-hidden'
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const variantClasses = {
    bitcoin: 'bg-gradient-to-r from-bitcoin-500 to-bitcoin-600',
    stacks: 'bg-gradient-to-r from-stacks-500 to-stacks-600',
    holographic: 'bg-holographic-primary',
    cyber: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    neural: 'bg-gradient-to-r from-purple-500 to-pink-600'
  }
  
  const animatedClasses = animated ? 'animate-pulse' : ''
  
  return (
    <div className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`
          h-full
          ${variantClasses[variant]}
          ${animatedClasses}
        `}
      />
    </div>
  )
}

// Premium Modal Component
interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  variant?: 'default' | 'premium' | 'bitcoin' | 'stacks' | 'holographic'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  if (!isOpen) return null
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full'
  }
  
  const variantClasses = {
    default: 'glass-card',
    premium: 'glass-card-premium',
    bitcoin: 'glass-card-bitcoin',
    stacks: 'glass-card-stacks',
    holographic: 'glass-card-holographic'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`
          relative w-full ${sizeClasses[size]} ${variantClasses[variant]} p-6 rounded-2xl
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        >
          <span className="text-white text-xl">×</span>
        </button>
        
        {/* Content */}
        {children}
      </motion.div>
    </motion.div>
  )
}

export default BrandingSystem
