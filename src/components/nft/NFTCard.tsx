'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, TrendingUp, Zap } from 'lucide-react'
import type { NFT } from '@/types/nft'

interface NFTCardProps {
  nft: NFT
  showQuickBuy?: boolean
}

export function NFTCard({ nft, showQuickBuy = false }: NFTCardProps) {
  const [isLiked, setIsLiked] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative nft-card"
    >
      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-stacks-500/20 transition-all duration-300">
        {/* NFT Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={nft.imageUri || '/placeholder-nft.jpg'}
            alt={nft.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Bitcoin Block Badge */}
          {nft.mintedAtBitcoinBlock && (
            <div className="absolute top-3 left-3 px-3 py-1 glass-card rounded-full flex items-center space-x-1">
              <Zap className="w-3 h-3 text-bitcoin-500" />
              <span className="text-xs font-semibold text-white">
                Block #{nft.mintedAtBitcoinBlock}
              </span>
            </div>
          )}
          
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 p-2 glass-card rounded-full hover:bg-white/20 transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>
          
          {/* Hover Overlay with Quick Buy */}
          {showQuickBuy && isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
              <button className="px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all">
                Quick Buy
              </button>
            </motion.div>
          )}
        </div>
        
        {/* NFT Info */}
        <div className="p-4">
          {/* Collection Name */}
          {nft.collectionName && (
            <Link
              href={`/collections/${nft.collectionId}`}
              className="text-sm text-stacks-500 hover:text-stacks-400 font-semibold"
            >
              {nft.collectionName}
            </Link>
          )}
          
          {/* NFT Name */}
          <Link href={`/nft/${nft.id}`}>
            <h3 className="text-lg font-bold text-white mt-1 hover:text-stacks-400 transition-colors truncate">
              {nft.name}
            </h3>
          </Link>
          
          {/* Price Section */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Current Price</p>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">
                  {nft.price}
                </span>
                <span className="text-sm text-gray-400">{nft.paymentToken}</span>
              </div>
              {nft.usdPrice && (
                <span className="text-xs text-gray-500">${nft.usdPrice.toFixed(2)}</span>
              )}
            </div>
            
            {/* Dynamic Pricing Indicator */}
            {nft.isDynamicPricing && (
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold">Dynamic</span>
              </div>
            )}
          </div>
          
          {/* Last Sale */}
          {nft.lastSalePrice && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Last sale: {nft.lastSalePrice} {nft.paymentToken}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
