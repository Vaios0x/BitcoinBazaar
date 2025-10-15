'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Users, TrendingUp, Copy, ExternalLink, Heart, Share2, Filter, Grid, List } from 'lucide-react'
import type { Collection } from '@/types/nft'
import { CartModal } from '@/components/cart/CartModal'

interface CollectionModalProps {
  isOpen: boolean
  onClose: () => void
  collection: Collection | null
}

// Mock NFT data for the collection
const mockNfts = [
  {
    id: 1,
    name: 'Genesis Block #1',
    imageUri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    price: 0.15,
    rarity: 'Legendary',
    level: 25
  },
  {
    id: 2,
    name: 'Bitcoin Pioneer #42',
    imageUri: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop&crop=center',
    price: 0.12,
    rarity: 'Epic',
    level: 18
  },
  {
    id: 3,
    name: 'Stacks Builder #7',
    imageUri: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop&crop=center',
    price: 0.08,
    rarity: 'Rare',
    level: 12
  },
  {
    id: 4,
    name: 'Halving Hero #13',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    price: 0.25,
    rarity: 'Legendary',
    level: 22
  },
  {
    id: 5,
    name: 'Diamond Hand #99',
    imageUri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
    price: 0.18,
    rarity: 'Epic',
    level: 15
  },
  {
    id: 6,
    name: 'Lucky Block #256',
    imageUri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    price: 0.05,
    rarity: 'Common',
    level: 8
  },
  {
    id: 7,
    name: 'Satoshi Vision #88',
    imageUri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
    price: 0.22,
    rarity: 'Legendary',
    level: 20
  },
  {
    id: 8,
    name: 'Block Reward #144',
    imageUri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    price: 0.14,
    rarity: 'Epic',
    level: 16
  },
  {
    id: 9,
    name: 'Hash Power #77',
    imageUri: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop&crop=center',
    price: 0.09,
    rarity: 'Rare',
    level: 11
  },
  {
    id: 10,
    name: 'Mining Pool #33',
    imageUri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
    price: 0.07,
    rarity: 'Common',
    level: 9
  },
  {
    id: 11,
    name: 'Node Operator #55',
    imageUri: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop&crop=center',
    price: 0.11,
    rarity: 'Rare',
    level: 13
  },
  {
    id: 12,
    name: 'Lightning Network #22',
    imageUri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
    price: 0.19,
    rarity: 'Epic',
    level: 17
  }
]

export function CollectionModal({ isOpen, onClose, collection }: CollectionModalProps) {
  const [activeTab, setActiveTab] = useState<'items' | 'activity' | 'analytics'>('items')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('price')
  const [filterRarity, setFilterRarity] = useState('all')
  const [isLiked, setIsLiked] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  if (!collection) return null

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(collection.creator)
    // Aquí podrías agregar una notificación de éxito
  }

  const handleAddToCart = (nft: any) => {
    const existingItem = cartItems.find(item => item.id === nft.id)
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === nft.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...nft, quantity: 1 }])
    }
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id))
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/20'
      case 'Epic': return 'text-purple-400 bg-purple-400/20'
      case 'Rare': return 'text-blue-400 bg-blue-400/20'
      case 'Common': return 'text-gray-400 bg-gray-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const filteredNfts = mockNfts.filter(nft => {
    if (filterRarity === 'all') return true
    return nft.rarity.toLowerCase() === filterRarity.toLowerCase()
  })

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
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pb-8 collection-modal-container"
          >
            <div className="glass-card-premium rounded-2xl w-full max-w-4xl max-h-[75vh] overflow-y-auto border-2 border-bitcoin-500/30 shadow-2xl relative">
              {/* Header */}
              <div className="relative">
                {/* Banner */}
                <div className="relative h-32 bg-gradient-to-r from-bitcoin-500 to-stacks-500">
                  <img
                    src={collection.bannerUri}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-6 left-6 z-20 p-3 bg-red-500/80 hover:bg-red-600/80 rounded-xl transition-all shadow-lg"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Collection Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h1 className="text-2xl font-bold text-white">{collection.name}</h1>
                          {collection.verified && (
                            <div className="flex items-center space-x-1 px-3 py-1 glass-card rounded-full">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-xs font-semibold text-white">Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm max-w-2xl">{collection.description}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsLiked(!isLiked)}
                          className={`p-2 rounded-xl transition-all ${
                            isLiked ? 'bg-red-500/20 text-red-400' : 'glass-card text-gray-400 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 glass-card rounded-xl text-gray-400 hover:text-white transition-all">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collection Stats */}
                <div className="p-4 border-b border-white/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{collection.totalNfts}</div>
                      <div className="text-xs text-gray-400">Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{collection.floorPrice} sBTC</div>
                      <div className="text-xs text-gray-400">Floor Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{collection.totalVolume} sBTC</div>
                      <div className="text-xs text-gray-400">Volume</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">156</div>
                      <div className="text-xs text-gray-400">Owners</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Tabs */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex space-x-4">
                    {[
                      { id: 'items', label: 'Items', icon: Grid },
                      { id: 'activity', label: 'Activity', icon: TrendingUp },
                      { id: 'analytics', label: 'Analytics', icon: Users }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white'
                            : 'glass-card text-gray-400 hover:text-white'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* View Controls */}
                  {activeTab === 'items' && (
                    <div className="flex items-center space-x-4">
                      {/* Sort */}
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 glass-card rounded-xl text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
                      >
                        <option value="price">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rarity">Rarity</option>
                        <option value="level">Level</option>
                      </select>

                      {/* Filter */}
                      <select
                        value={filterRarity}
                        onChange={(e) => setFilterRarity(e.target.value)}
                        className="px-3 py-2 glass-card rounded-xl text-white bg-transparent border border-white/10 focus:border-stacks-500 focus:outline-none"
                      >
                        <option value="all">All Rarities</option>
                        <option value="legendary">Legendary</option>
                        <option value="epic">Epic</option>
                        <option value="rare">Rare</option>
                        <option value="common">Common</option>
                      </select>

                      {/* View Mode */}
                      <div className="flex glass-card rounded-xl p-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 rounded-lg transition-all ${
                            viewMode === 'grid' ? 'bg-stacks-500 text-white' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 rounded-lg transition-all ${
                            viewMode === 'list' ? 'bg-stacks-500 text-white' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === 'items' && (
                    <div className={`grid gap-3 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}>
                      {filteredNfts.map((nft) => (
                        <motion.div
                          key={nft.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card rounded-xl overflow-hidden hover:shadow-lg hover:shadow-stacks-500/20 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={nft.imageUri}
                              alt={nft.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(nft.rarity)}`}>
                                {nft.rarity}
                              </span>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <span className="px-2 py-1 glass-card rounded-full text-xs font-semibold text-white">
                                Level {nft.level}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-3">
                            <h3 className="font-bold text-white mb-2">{nft.name}</h3>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Price</p>
                                <p className="text-lg font-bold text-white">{nft.price} sBTC</p>
                              </div>
                              <button 
                                onClick={() => handleAddToCart(nft)}
                                className="px-4 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all"
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'activity' && (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="glass-card p-4 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">₿</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-semibold">NFT #{item * 1234} sold for 0.15 sBTC</p>
                              <p className="text-sm text-gray-400">2 hours ago</p>
                            </div>
                            <div className="text-right">
                              <p className="text-green-400 font-semibold">+0.15 sBTC</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-4">Price History</h3>
                        <div className="h-48 bg-gradient-to-r from-bitcoin-500/20 to-stacks-500/20 rounded-lg flex items-center justify-center">
                          <p className="text-gray-400">Chart placeholder</p>
                        </div>
                      </div>
                      
                      <div className="glass-card p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-4">Volume Stats</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-400">24h Volume</span>
                            <span className="text-white font-semibold">2.4 sBTC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">7d Volume</span>
                            <span className="text-white font-semibold">15.8 sBTC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">30d Volume</span>
                            <span className="text-white font-semibold">45.2 sBTC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">₿</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Creator</p>
                        <p className="text-sm font-semibold text-white">
                          {collection.creator.slice(0, 6)}...{collection.creator.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      className="p-2 glass-card rounded-lg text-gray-400 hover:text-white transition-all"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="px-3 py-2 glass-card rounded-lg text-white hover:bg-white/10 transition-all text-sm">
                      <ExternalLink className="w-4 h-4 mr-2 inline" />
                      View on Explorer
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all text-sm">
                      Create NFT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cart Modal */}
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </>
      )}
    </AnimatePresence>
  )
}
