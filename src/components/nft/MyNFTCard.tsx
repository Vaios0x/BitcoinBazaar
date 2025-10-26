'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Edit, Trash2, DollarSign, Eye, Copy, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react'
import type { NFT } from '@/types/nft'

interface MyNFTCardProps {
  nft: NFT
  onEditPrice: (nft: NFT) => void
  onUnlist: (nft: NFT) => void
  onCopyTxHash: (txHash: string) => void
}

export function MyNFTCard({ nft, onEditPrice, onUnlist, onCopyTxHash }: MyNFTCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="glass-card-premium rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-stacks-500/30 transition-all duration-500">
        {/* NFT Image */}
        <div className="relative aspect-square overflow-hidden">
          {!imageError ? (
            <Image
              src={nft.imageUri || '/placeholder-nft.jpg'}
              alt={nft.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">₿</span>
                </div>
                <p className="text-gray-400 text-sm">BitcoinBazaar NFT</p>
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            {nft.price > 0 ? (
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs font-semibold text-green-400">Listado</span>
              </div>
            ) : (
              <div className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center space-x-1">
                <TrendingDown className="w-3 h-3 text-orange-400" />
                <span className="text-xs font-semibold text-orange-400">No Listado</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => onEditPrice(nft)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Editar Precio"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                
                {nft.price > 0 && (
                  <motion.button
                    onClick={() => onUnlist(nft)}
                    className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Deslistar"
                  >
                    <TrendingDown className="w-4 h-4" />
                  </motion.button>
                )}
                
                <motion.button
                  onClick={() => window.open(nft.explorerUrl, '_blank')}
                  className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Ver en Explorer"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* NFT Info */}
        <div className="p-4">
          {/* Collection Name */}
          <Link
            href={`/collections/${nft.collectionId}`}
            className="text-sm text-stacks-500 hover:text-stacks-400 font-semibold"
          >
            {nft.collectionName}
          </Link>
          
          {/* NFT Name */}
          <Link href={`/nft/${nft.id}`}>
            <h3 className="text-lg font-bold text-white mt-1 hover:text-stacks-400 transition-colors truncate">
              {nft.name}
            </h3>
          </Link>
          
          {/* Price Section */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Precio Actual</p>
              {nft.price > 0 ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-white">
                    {nft.price}
                  </span>
                  <span className="text-sm text-gray-400">{nft.paymentToken}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-500">
                    No listado
                  </span>
                </div>
              )}
              {nft.usdPrice && (
                <span className="text-xs text-gray-500">${nft.usdPrice.toFixed(2)}</span>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => onEditPrice(nft)}
                className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs transition-colors flex items-center space-x-1"
              >
                <Edit className="w-3 h-3" />
                <span>Editar</span>
              </button>
              
              {nft.transactionHash && (
                <button
                  onClick={() => onCopyTxHash(nft.transactionHash!)}
                  className="p-1.5 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded text-xs transition-colors flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Hash</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Creation Date */}
          {nft.createdAt && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Creado: {new Date(nft.createdAt).toLocaleDateString('es-ES')}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
