'use client'

import React from 'react'
import { Logo, BitcoinSymbol, StacksSymbol, Background, OptimizedImage } from '../assets/OptimizedImage'
import { 
  LOGO_ASSETS, 
  BITCOIN_SYMBOLS, 
  STACKS_SYMBOLS, 
  BACKGROUND_ASSETS,
  ICON_ASSETS,
  getAssetPath,
  getAssetWithFallback
} from '@/lib/assets'

// Ejemplos de uso de assets en BitcoinBaazar
export const AssetExamples = () => {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        🎨 BitcoinBaazar - Asset Examples
      </h1>

      {/* Logo Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Logo Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Logo variant="main" size="lg" animate={true} glow={true} />
          <Logo variant="dark" size="lg" animate={true} glow={true} />
          <Logo variant="light" size="lg" animate={true} glow={true} />
          <Logo variant="icon" size="lg" animate={true} glow={true} />
        </div>
      </section>

      {/* Bitcoin Symbol Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Bitcoin Symbol Examples</h2>
        <div className="flex flex-wrap gap-4">
          <BitcoinSymbol variant="default" size="lg" animate={true} glow={true} />
          <BitcoinSymbol variant="gold" size="lg" animate={true} glow={true} />
          <BitcoinSymbol variant="animated" size="lg" animate={true} glow={true} />
        </div>
      </section>

      {/* Stacks Symbol Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Stacks Symbol Examples</h2>
        <div className="flex flex-wrap gap-4">
          <StacksSymbol variant="default" size="lg" animate={true} glow={true} />
          <StacksSymbol variant="purple" size="lg" animate={true} glow={true} />
          <StacksSymbol variant="animated" size="lg" animate={true} glow={true} />
        </div>
      </section>

      {/* Background Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Background Examples</h2>
        <div className="grid grid-cols-2 gap-4">
          <Background variant="neural" className="h-32 rounded-lg" />
          <Background variant="cyber" className="h-32 rounded-lg" />
          <Background variant="holographic" className="h-32 rounded-lg" />
          <Background variant="bitcoin" className="h-32 rounded-lg" />
        </div>
      </section>

      {/* Icon Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Icon Examples</h2>
        <div className="grid grid-cols-4 gap-4">
          <OptimizedImage
            src={ICON_ASSETS.wallet}
            alt="Wallet Icon"
            className="w-12 h-12"
            animate={true}
            hover={true}
            glow={true}
            variant="bitcoin"
          />
          <OptimizedImage
            src={ICON_ASSETS.bitcoin}
            alt="Bitcoin Icon"
            className="w-12 h-12"
            animate={true}
            hover={true}
            glow={true}
            variant="bitcoin"
          />
          <OptimizedImage
            src={ICON_ASSETS.stacks}
            alt="Stacks Icon"
            className="w-12 h-12"
            animate={true}
            hover={true}
            glow={true}
            variant="stacks"
          />
          <OptimizedImage
            src={ICON_ASSETS.nft}
            alt="NFT Icon"
            className="w-12 h-12"
            animate={true}
            hover={true}
            glow={true}
            variant="holographic"
          />
        </div>
      </section>

      {/* Asset Path Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Asset Path Examples</h2>
        <div className="space-y-2 text-sm text-gray-300">
          <p>Logo Main: {getAssetPath('logo', 'main')}</p>
          <p>Bitcoin Symbol: {getAssetPath('bitcoin', 'default')}</p>
          <p>Stacks Symbol: {getAssetPath('stacks', 'default')}</p>
          <p>Neural Background: {getAssetPath('backgrounds', 'neural')}</p>
        </div>
      </section>

      {/* Fallback Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Fallback Examples</h2>
        <div className="space-y-2 text-sm text-gray-300">
          <p>With Fallback: {getAssetWithFallback('logo', 'main', '/images/placeholder.svg')}</p>
          <p>Bitcoin with Fallback: {getAssetWithFallback('bitcoin', 'default', '/images/bitcoin-placeholder.svg')}</p>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Loading States</h2>
        <div className="flex gap-4">
          <OptimizedImage
            src="/images/loading-example.jpg"
            alt="Loading Example"
            className="w-32 h-32"
            placeholder="Loading image..."
            fallback="/images/error-placeholder.svg"
            animate={true}
          />
        </div>
      </section>

      {/* Hover Effects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Hover Effects</h2>
        <div className="flex gap-4">
          <OptimizedImage
            src={LOGO_ASSETS.main}
            alt="Logo with Hover"
            className="w-24 h-24"
            hover={true}
            glow={true}
            variant="bitcoin"
          />
          <OptimizedImage
            src={BITCOIN_SYMBOLS.default}
            alt="Bitcoin with Hover"
            className="w-24 h-24"
            hover={true}
            glow={true}
            variant="bitcoin"
          />
          <OptimizedImage
            src={STACKS_SYMBOLS.default}
            alt="Stacks with Hover"
            className="w-24 h-24"
            hover={true}
            glow={true}
            variant="stacks"
          />
        </div>
      </section>

      {/* Glow Effects */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Glow Effects</h2>
        <div className="flex gap-4">
          <OptimizedImage
            src={LOGO_ASSETS.main}
            alt="Logo with Glow"
            className="w-24 h-24"
            glow={true}
            variant="bitcoin"
          />
          <OptimizedImage
            src={BITCOIN_SYMBOLS.default}
            alt="Bitcoin with Glow"
            className="w-24 h-24"
            glow={true}
            variant="bitcoin"
          />
          <OptimizedImage
            src={STACKS_SYMBOLS.default}
            alt="Stacks with Glow"
            className="w-24 h-24"
            glow={true}
            variant="stacks"
          />
          <OptimizedImage
            src={ICON_ASSETS.nft}
            alt="NFT with Glow"
            className="w-24 h-24"
            glow={true}
            variant="holographic"
          />
        </div>
      </section>
    </div>
  )
}

export default AssetExamples
