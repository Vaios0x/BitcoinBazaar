'use client'

import { useState, useCallback } from 'react'
import type { NFT } from '@/types/nft'

interface CartItem {
  nft: NFT
  quantity: number
}

export function useShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback((nft: NFT, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.nft.id === nft.id)
      
      if (existingItem) {
        return prev.map(item =>
          item.nft.id === nft.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, { nft, quantity }]
      }
    })
    // Abre automáticamente el modal del carrito después de agregar un item
    setIsCartOpen(true)
  }, [])

  const updateQuantity = useCallback((nftId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(nftId)
      return
    }

    setCartItems(prev =>
      prev.map(item =>
        item.nft.id === nftId
          ? { ...item, quantity }
          : item
      )
    )
  }, [])

  const removeFromCart = useCallback((nftId: number) => {
    setCartItems(prev => prev.filter(item => item.nft.id !== nftId))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getCartTotal = useCallback(() => {
    let totalSTX = 0
    let totalsBTC = 0

    cartItems.forEach(item => {
      if (item.nft.paymentToken === 'STX') {
        totalSTX += item.nft.price * item.quantity
      } else if (item.nft.paymentToken === 'sBTC') {
        totalsBTC += item.nft.price * item.quantity
      }
    })

    return { totalSTX, totalsBTC }
  }, [cartItems])

  return {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    getCartItemCount,
    getCartTotal
  }
}
