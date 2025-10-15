'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, Plus, Minus, CreditCard, Bitcoin } from 'lucide-react'
import type { NFT } from '@/types/nft'

interface CartItem {
  nft: NFT
  quantity: number
}

interface ShoppingCartModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (nftId: number, quantity: number) => void
  onRemoveItem: (nftId: number) => void
  onClearCart: () => void
}

export function ShoppingCartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: ShoppingCartModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate totals
  const calculateTotals = () => {
    let totalSTX = 0
    let totalsBTC = 0
    let totalItems = 0

    cartItems.forEach(item => {
      totalItems += item.quantity
      if (item.nft.paymentToken === 'STX') {
        totalSTX += item.nft.price * item.quantity
      } else if (item.nft.paymentToken === 'sBTC') {
        totalsBTC += item.nft.price * item.quantity
      }
    })

    return { totalSTX, totalsBTC, totalItems }
  }

  const { totalSTX, totalsBTC, totalItems } = calculateTotals()

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      alert('Purchase successful! Your NFTs have been transferred to your wallet.')
      
      // Clear cart and close modal
      onClearCart()
      onClose()
    } catch (error) {
      alert('Purchase failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-md max-h-[70vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-gradient-to-r from-bitcoin-500 to-stacks-500 rounded">
                    <ShoppingCart className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Shopping Cart</h2>
                    <p className="text-xs text-gray-400">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
                    <p className="text-gray-400">Add some NFTs to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.nft.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded border border-white/5"
                      >
                        {/* NFT Image */}
                        <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.nft.imageUri}
                            alt={item.nft.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* NFT Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">{item.nft.name}</h4>
                          <p className="text-xs text-gray-400 truncate">{item.nft.collectionName}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-sm font-bold text-white">
                              {item.nft.price} {item.nft.paymentToken}
                            </span>
                            {item.nft.paymentToken === 'sBTC' && (
                              <motion.span
                                className="text-bitcoin-500 text-xs"
                                animate={{
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ₿
                              </motion.span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => onUpdateQuantity(item.nft.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 text-gray-400" />
                          </button>
                          <span className="w-6 text-center text-xs text-white font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.nft.id, item.quantity + 1)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemoveItem(item.nft.id)}
                          className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 p-3">
                  {/* Totals */}
                  <div className="space-y-1 mb-3">
                    {totalSTX > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">STX Total:</span>
                        <span className="text-white font-semibold">{totalSTX.toFixed(2)} STX</span>
                      </div>
                    )}
                    {totalsBTC > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">sBTC Total:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold">{totalsBTC.toFixed(6)} sBTC</span>
                          <motion.span
                            className="text-bitcoin-500"
                            animate={{
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            ₿
                          </motion.span>
                        </div>
                      </div>
                    )}
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">Total Items:</span>
                        <span className="text-lg font-bold text-white">{totalItems}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-1">
                    <button
                      onClick={onClearCart}
                      className="flex-1 px-2 py-1.5 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors text-xs"
                    >
                      Clear Cart
                    </button>
                    <motion.button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="flex-1 px-3 py-1.5 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all relative overflow-hidden disabled:opacity-50 text-xs"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <CreditCard className="w-5 h-5" />
                          <span>Checkout</span>
                        </div>
                      )}
                      
                      {/* Animated Bitcoin symbols in button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          opacity: [0, 0.3, 0],
                          scale: [0.5, 1.2, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-white text-xl">₿</span>
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Testnet Notice */}
                  <div className="mt-2 p-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded">
                    <div className="flex items-center space-x-1">
                      <Bitcoin className="w-2.5 h-2.5 text-yellow-500" />
                      <span className="text-xs text-yellow-400">
                        <strong>Testnet:</strong> No real transactions.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
