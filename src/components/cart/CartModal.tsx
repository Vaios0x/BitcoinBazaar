'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  imageUri: string
  quantity: number
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export function CartModal({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartModalProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simular proceso de checkout
    setTimeout(() => {
      setIsCheckingOut(false)
      onClose()
    }, 2000)
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
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 cart-modal-container"
          >
            <div className="glass-card-premium rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border-2 border-bitcoin-500/30 shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-bitcoin-500/10 to-stacks-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 rounded-lg">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                      <p className="text-gray-400">{totalItems} items</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 bg-red-500/80 hover:bg-red-600/80 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
                    <p className="text-gray-400 mb-6">Add some NFTs to get started</p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-4 rounded-xl"
                      >
                        <div className="flex items-center space-x-4">
                          {/* NFT Image */}
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <img
                              src={item.imageUri}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* NFT Info */}
                          <div className="flex-1">
                            <h3 className="font-bold text-white mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-400">Level 25 • Legendary</p>
                            <p className="text-lg font-bold text-white">{item.price} sBTC</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-1 glass-card rounded-lg hover:bg-white/10 transition-all"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 glass-card rounded-lg hover:bg-white/10 transition-all"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-gradient-to-r from-bitcoin-500/5 to-stacks-500/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-400">Total ({totalItems} items)</p>
                      <p className="text-2xl font-bold text-white">{totalPrice.toFixed(2)} sBTC</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-3 glass-card rounded-xl text-white hover:bg-white/10 transition-all"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Checkout</span>
                        </>
                      )}
                    </button>
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
