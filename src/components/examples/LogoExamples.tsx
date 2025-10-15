'use client'

import React from 'react'
import { Logo } from '@/components/assets/OptimizedImage'
import { LOGO_ASSETS } from '@/lib/assets'

// Ejemplos de uso del logo en diferentes contextos
export const LogoExamples = () => {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        🎨 BitcoinBaazar - Logo Examples
      </h1>

      {/* Logo Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Logo Sizes</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="sm" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Small (sm)</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="md" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Medium (md)</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="lg" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Large (lg)</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="xl" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Extra Large (xl)</span>
          </div>
        </div>
      </section>

      {/* Logo Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Logo Variants</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="lg" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Main</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="dark" size="lg" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Dark</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="light" size="lg" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Light</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="icon" size="lg" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Icon</span>
          </div>
        </div>
      </section>

      {/* Logo with Effects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Logo with Effects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="lg" animate={false} glow={false} />
            <span className="text-sm text-gray-400">Static</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="lg" animate={true} glow={false} />
            <span className="text-sm text-gray-400">Animated</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="lg" animate={false} glow={true} />
            <span className="text-sm text-gray-400">Glow</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Logo variant="main" size="lg" animate={true} glow={true} />
            <span className="text-sm text-gray-400">Animated + Glow</span>
          </div>
        </div>
      </section>

      {/* Logo in Different Contexts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Logo in Different Contexts</h2>
        
        {/* Navbar Style */}
        <div className="glass-card-premium p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Navbar Style</h3>
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full blur-lg opacity-60 animate-bitcoin-pulse" />
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full bitcoin-glow">
                <Logo variant="main" size="md" animate={true} glow={true} className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">BitcoinBazaar</h4>
              <p className="text-xs text-gray-400">Powered by Bitcoin</p>
            </div>
          </div>
        </div>

        {/* Footer Style */}
        <div className="glass-card-premium p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Footer Style</h3>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
              <Logo variant="main" size="sm" animate={true} glow={true} className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">BitcoinBazaar</h4>
          </div>
        </div>

        {/* Hero Style */}
        <div className="glass-card-premium p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Hero Style</h3>
          <div className="text-center">
            <div className="inline-block mb-4">
              <Logo variant="main" size="xl" animate={true} glow={true} />
            </div>
            <h4 className="text-3xl font-bold text-white mb-2">BitcoinBazaar</h4>
            <p className="text-gray-400">The First Bitcoin-Native NFT Marketplace</p>
          </div>
        </div>

        {/* Card Style */}
        <div className="glass-card-premium p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Card Style</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo variant="main" size="md" animate={true} glow={true} />
              <div>
                <h4 className="text-lg font-semibold text-white">BitcoinBazaar</h4>
                <p className="text-sm text-gray-400">NFT Marketplace</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Volume</p>
              <p className="text-lg font-bold text-bitcoin-500">$2.4M</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo with Custom Styling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Logo with Custom Styling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card-premium p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Bitcoin Theme</h3>
            <div className="flex items-center space-x-3">
              <Logo 
                variant="main" 
                size="lg" 
                animate={true} 
                glow={true}
                className="w-16 h-16 bitcoin-glow"
              />
              <div>
                <h4 className="text-xl font-bold text-bitcoin-500">BitcoinBazaar</h4>
                <p className="text-sm text-gray-400">Bitcoin-Native NFTs</p>
              </div>
            </div>
          </div>

          <div className="glass-card-premium p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Stacks Theme</h3>
            <div className="flex items-center space-x-3">
              <Logo 
                variant="main" 
                size="lg" 
                animate={true} 
                glow={true}
                className="w-16 h-16 stacks-glow"
              />
              <div>
                <h4 className="text-xl font-bold text-stacks-500">BitcoinBazaar</h4>
                <p className="text-sm text-gray-400">Smart Contracts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Loading States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Logo Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card-premium p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Loading</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </div>
          </div>

          <div className="glass-card-premium p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Loaded</h3>
            <div className="flex items-center space-x-3">
              <Logo variant="main" size="md" animate={true} glow={true} />
              <div>
                <h4 className="text-lg font-semibold text-white">BitcoinBazaar</h4>
                <p className="text-sm text-gray-400">Ready to trade</p>
              </div>
            </div>
          </div>

          <div className="glass-card-premium p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Error</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-xl">⚠️</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-500">Error Loading</h4>
                <p className="text-sm text-gray-400">Please refresh</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LogoExamples
