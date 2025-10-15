'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  lazy?: boolean
  quality?: number
  placeholder?: string
  fallback?: string
  onLoad?: () => void
  onError?: () => void
  animate?: boolean
  hover?: boolean
  glow?: boolean
  variant?: 'bitcoin' | 'stacks' | 'holographic' | 'cyber' | 'neural'
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  lazy = true,
  quality = 85,
  placeholder,
  fallback,
  onLoad,
  onError,
  animate = false,
  hover = false,
  glow = false,
  variant = 'bitcoin'
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
    if (fallback) {
      setImageSrc(fallback)
    }
    onError?.()
  }, [fallback, onError])

  const variantClasses: Record<string, string> = {
    bitcoin: 'bitcoin-glow',
    stacks: 'stacks-glow',
    holographic: 'neon-glow',
    cyber: 'cyber-glow',
    neural: 'neural-glow'
  }

  const baseClasses = `
    transition-all duration-300 ease-out
    ${hover ? 'hover:scale-105 hover:shadow-xl' : ''}
    ${glow ? variantClasses[variant] : ''}
    ${animate ? 'animate-pulse' : ''}
    ${className}
  `

  if (hasError && !fallback) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${baseClasses}`}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load</span>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-200"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </motion.div>
      )}

      {/* Placeholder */}
      {placeholder && isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          style={{ width, height }}
        >
          <span className="text-gray-400 text-sm">{placeholder}</span>
        </div>
      )}

      {/* Main Image */}
      <motion.img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={baseClasses}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        initial={animate ? { opacity: 0, scale: 0.8 } : {}}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={animate ? { duration: 0.5, ease: 'easeOut' } : {}}
        whileHover={hover ? { scale: 1.05 } : {}}
        whileTap={hover ? { scale: 0.95 } : {}}
      />

      {/* Hover Effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  )
}

// Logo Component
interface LogoProps {
  variant?: 'main' | 'dark' | 'light' | 'icon'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
  hover?: boolean
  glow?: boolean
}

export const Logo = ({
  variant = 'main',
  size = 'md',
  className = '',
  animate = false,
  hover = true,
  glow = true
}: LogoProps) => {
  const sizeClasses: Record<string, string> = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const logoPaths: Record<string, string> = {
    main: '/images/logo-bitcoinbazaar.png',
    dark: '/images/logo-bitcoinbazaar.png',
    light: '/images/logo-bitcoinbazaar.png',
    icon: '/images/logo-bitcoinbazaar.png'
  }

  const glowClasses = glow ? 'bitcoin-glow' : ''
  const hoverClasses = hover ? 'hover:scale-105 transition-transform duration-300' : ''
  const animateClasses = animate ? 'animate-pulse' : ''

  return (
    <img
      src={logoPaths[variant]}
      alt="BitcoinBaazar Logo"
      className={`${sizeClasses[size]} ${glowClasses} ${hoverClasses} ${animateClasses} ${className}`}
      loading="eager"
    />
  )
}

// Bitcoin Symbol Component
interface BitcoinSymbolProps {
  variant?: 'default' | 'gold' | 'animated'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
  hover?: boolean
  glow?: boolean
}

export const BitcoinSymbol = ({
  variant = 'default',
  size = 'md',
  className = '',
  animate = true,
  hover = true,
  glow = true
}: BitcoinSymbolProps) => {
  const sizeClasses: Record<string, string> = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const symbolPaths: Record<string, string> = {
    default: '/images/bitcoin-symbol.svg',
    gold: '/images/bitcoin-symbol-gold.svg',
    animated: '/images/bitcoin-symbol-animated.svg'
  }

  return (
    <OptimizedImage
      src={symbolPaths[variant]}
      alt="Bitcoin Symbol"
      className={`${sizeClasses[size]} ${className}`}
      animate={animate}
      hover={hover}
      glow={glow}
      variant="bitcoin"
      priority={true}
      lazy={false}
    />
  )
}

// Stacks Symbol Component
interface StacksSymbolProps {
  variant?: 'default' | 'purple' | 'animated'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
  hover?: boolean
  glow?: boolean
}

export const StacksSymbol = ({
  variant = 'default',
  size = 'md',
  className = '',
  animate = true,
  hover = true,
  glow = true
}: StacksSymbolProps) => {
  const sizeClasses: Record<string, string> = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const symbolPaths: Record<string, string> = {
    default: '/images/stacks-symbol.svg',
    purple: '/images/stacks-symbol-purple.svg',
    animated: '/images/stacks-symbol-animated.svg'
  }

  return (
    <OptimizedImage
      src={symbolPaths[variant]}
      alt="Stacks Symbol"
      className={`${sizeClasses[size]} ${className}`}
      animate={animate}
      hover={hover}
      glow={glow}
      variant="stacks"
      priority={true}
      lazy={false}
    />
  )
}

// Background Component
interface BackgroundProps {
  variant?: 'neural' | 'cyber' | 'holographic' | 'bitcoin'
  className?: string
  overlay?: boolean
  opacity?: number
}

export const Background = ({
  variant = 'neural',
  className = '',
  overlay = true,
  opacity = 0.5
}: BackgroundProps) => {
  const backgroundPaths: Record<string, string> = {
    neural: '/images/background-neural.jpg',
    cyber: '/images/background-cyber.jpg',
    holographic: '/images/background-holographic.jpg',
    bitcoin: '/images/background-bitcoin.jpg'
  }

  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={backgroundPaths[variant]}
        alt={`${variant} background`}
        className="w-full h-full object-cover"
        priority={true}
        lazy={false}
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity }}
        />
      )}
    </div>
  )
}

export default OptimizedImage
