'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Image, DollarSign, Percent, Hash, Zap, Info, Sparkles, Copy } from 'lucide-react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'

export default function CreatePage() {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    image: null as File | null,
    royaltyPercent: 10,
    collectionId: '',
    price: '',
    paymentToken: 'STX' as 'STX' | 'sBTC',
    isDynamicPricing: false
  })
  const [isUploading, setIsUploading] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)
  const [templateApplied, setTemplateApplied] = React.useState(false)
  const { isConnected } = useWalletStore()

  // NFT Templates in English
  const nftTemplates = [
    {
      id: 'bitcoin-art',
      name: 'Bitcoin Digital Art',
      description: 'A unique digital artwork inspired by Bitcoin\'s revolutionary technology. This piece represents the decentralized future of digital currency and blockchain innovation.',
      category: 'Digital Art',
      suggestedPrice: '0.005',
      suggestedToken: 'sBTC'
    },
    {
      id: 'crypto-meme',
      name: 'Crypto Meme Collection',
      description: 'A humorous take on cryptocurrency culture. This meme captures the essence of the crypto community with wit and creativity.',
      category: 'Meme',
      suggestedPrice: '0.002',
      suggestedToken: 'STX'
    },
    {
      id: 'blockchain-tech',
      name: 'Blockchain Technology',
      description: 'An educational NFT showcasing blockchain technology concepts. Perfect for crypto enthusiasts and technology learners.',
      category: 'Educational',
      suggestedPrice: '0.008',
      suggestedToken: 'sBTC'
    },
    {
      id: 'bitcoin-history',
      name: 'Bitcoin Historical Moment',
      description: 'Commemorating a significant moment in Bitcoin\'s history. This NFT captures the essence of cryptocurrency evolution.',
      category: 'Historical',
      suggestedPrice: '0.012',
      suggestedToken: 'sBTC'
    },
    {
      id: 'defi-protocol',
      name: 'DeFi Protocol Visualization',
      description: 'A visual representation of decentralized finance protocols. This NFT illustrates the complexity and beauty of DeFi ecosystems.',
      category: 'DeFi',
      suggestedPrice: '0.015',
      suggestedToken: 'STX'
    },
    {
      id: 'nft-gaming',
      name: 'Gaming NFT Asset',
      description: 'A unique gaming asset for blockchain-based games. This NFT can be used across multiple gaming platforms and metaverses.',
      category: 'Gaming',
      suggestedPrice: '0.003',
      suggestedToken: 'STX'
    }
  ]

  const applyTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      name: template.name,
      description: template.description,
      price: template.suggestedPrice,
      paymentToken: template.suggestedToken as 'STX' | 'sBTC'
    }))
    setTemplateApplied(true)
    setTimeout(() => setTemplateApplied(false), 3000)
  }

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev: any) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    setIsCreating(true)
    try {
      // Simulate NFT creation
      await new Promise(resolve => setTimeout(resolve, 3000))
      alert('NFT created successfully!')
    } catch (error) {
      console.error('Creation failed:', error)
      alert('Creation failed')
    } finally {
      setIsCreating(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen -mt-[28rem] pt-0 pb-8 px-4 sm:px-6 lg:px-8 relative">
        {/* Bitcoin Symbols Animation Background */}
        <BitcoinSymbols />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="text-6xl mb-6 relative">
              🔐
              {/* Animated Bitcoin symbol near the lock */}
              <motion.span
                className="absolute -top-2 -right-2 text-bitcoin-500 text-2xl"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ₿
              </motion.span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 relative">
              Connect Your Wallet
              {/* Floating Bitcoin symbol near the title */}
              <motion.span
                className="absolute -top-2 -right-2 text-bitcoin-500 text-xl"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ₿
              </motion.span>
            </h1>
            <p className="text-gray-300 mb-8">
              You need to connect your wallet to create NFTs on BitcoinBazaar
            </p>
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Connect Wallet</span>
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
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen -mt-[28rem] pt-0 pb-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Bitcoin Symbols Animation Background */}
      <BitcoinSymbols />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 relative">
            Create <span className="gradient-text relative">
              NFT
              {/* Floating Bitcoin symbol near the text */}
              <motion.span
                className="absolute -top-4 -right-4 text-bitcoin-500 text-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ₿
              </motion.span>
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mint your unique NFT on BitcoinBazaar. Choose between STX or sBTC pricing with dynamic Bitcoin integration.
          </p>
        </motion.div>

        {/* NFT Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 relative">
              <Sparkles className="w-6 h-6 inline-block mr-2 text-bitcoin-500" />
              NFT Templates
              {/* Floating Bitcoin symbol near the title */}
              <motion.span
                className="absolute -top-1 -right-1 text-bitcoin-500 text-lg"
                animate={{
                  y: [0, -4, 0],
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ₿
              </motion.span>
            </h2>
            <p className="text-gray-300">Choose a template to get started quickly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nftTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-4 hover:bg-gradient-to-r hover:from-bitcoin-500/10 hover:to-stacks-500/10 transition-all cursor-pointer group"
                onClick={() => applyTemplate(template)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-bitcoin-400 transition-colors">
                      {template.name}
                    </h3>
                    <span className="text-xs text-bitcoin-500 bg-bitcoin-500/20 px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <motion.button
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-bitcoin-500/20 rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy className="w-4 h-4 text-bitcoin-500" />
                  </motion.button>
                </div>
                
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Suggested:</span>
                    <span className="text-bitcoin-500 font-semibold">
                      {template.suggestedPrice} {template.suggestedToken}
                    </span>
                  </div>
                  <motion.div
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
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Template Applied Notification */}
        {templateApplied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-gradient-to-r from-bitcoin-500/20 to-stacks-500/20 border border-bitcoin-500/30 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-bitcoin-500" />
              </motion.div>
              <div>
                <h3 className="text-white font-semibold">Template Applied!</h3>
                <p className="text-gray-300 text-sm">The template has been applied to your form. You can modify the details as needed.</p>
              </div>
              <motion.div
                className="text-bitcoin-500 text-xl"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ₿
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* NFT Image Upload */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">NFT Image</label>
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-stacks-500/50 transition-colors">
                {formData.image ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="NFT Preview"
                      className="w-32 h-32 object-cover rounded-xl mx-auto"
                    />
                    <p className="text-white font-semibold">{formData.image.name}</p>
                    <button
                      type="button"
                      onClick={() => setFormData((prev: any) => ({ ...prev, image: null }))}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-white font-semibold mb-2">Upload your NFT image</p>
                      <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* NFT Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <label className="block text-sm font-semibold text-white mb-2 relative">
                NFT Name *
                {/* Floating Bitcoin symbol near the label */}
                <motion.span
                  className="absolute -top-1 -right-1 text-bitcoin-500 text-sm"
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
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
              </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter NFT name"
                  required
                  className="w-full px-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Collection ID (Optional)
                </label>
                <input
                  type="text"
                  name="collectionId"
                  value={formData.collectionId}
                  onChange={handleInputChange}
                  placeholder="Enter collection ID"
                  className="w-full px-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 relative">
                Description *
                {/* Floating Bitcoin symbol near the label */}
                <motion.span
                  className="absolute -top-1 -right-1 text-bitcoin-500 text-sm"
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
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
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your NFT..."
                rows={4}
                required
                className="w-full px-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500 resize-none"
              />
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 relative">
                <DollarSign className="w-6 h-6" />
                <span>Pricing & Royalties</span>
                {/* Floating Bitcoin symbol near the title */}
                <motion.span
                  className="absolute -top-1 -right-1 text-bitcoin-500 text-lg"
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ₿
                </motion.span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Price
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.001"
                      min="0"
                      className="flex-1 px-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500"
                    />
                    <select
                      name="paymentToken"
                      value={formData.paymentToken}
                      onChange={handleInputChange}
                      className="px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-stacks-500"
                    >
                      <option value="STX">STX</option>
                      <option value="sBTC">sBTC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Royalty Percentage
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="royaltyPercent"
                      value={formData.royaltyPercent}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                      className="flex-1 px-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500"
                    />
                    <span className="text-white font-semibold">%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">0-50% of future sales</p>
                </div>
              </div>

              {/* Dynamic Pricing Option */}
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        name="isDynamicPricing"
                        checked={formData.isDynamicPricing}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-gray-600 text-green-500 focus:ring-green-500"
                      />
                      <label className="text-sm font-semibold text-green-400 relative">
                        Enable Dynamic Bitcoin Pricing
                        {/* Floating Bitcoin symbol near the label */}
                        <motion.span
                          className="absolute -top-1 -right-1 text-bitcoin-500 text-sm"
                          animate={{
                            y: [0, -3, 0],
                            rotate: [0, 5, -5, 0],
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
                      </label>
                    </div>
                    <p className="text-xs text-gray-400">
                      Your NFT price will fluctuate based on Bitcoin blockchain activity. 
                      Special discounts during "lucky" Bitcoin blocks (every 100th block).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bitcoin Block Info */}
            {formData.paymentToken === 'sBTC' && (
              <div className="p-4 bg-bitcoin-500/10 border border-bitcoin-500/30 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-bitcoin-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-bitcoin-500 mb-1 relative">
                      Bitcoin-Native NFT
                      {/* Floating Bitcoin symbol near the title */}
                      <motion.span
                        className="absolute -top-1 -right-1 text-bitcoin-500 text-sm"
                        animate={{
                          y: [0, -3, 0],
                          rotate: [0, 5, -5, 0],
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
                    </h4>
                    <p className="text-xs text-gray-400">
                      Your NFT will be minted with Bitcoin block verification. 
                      This creates provable scarcity and unique value tied to Bitcoin's security.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={!formData.name || !formData.description || !formData.image || isCreating}
                className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all relative overflow-hidden ${
                  !formData.name || !formData.description || !formData.image || isCreating
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white hover:shadow-lg hover:shadow-stacks-500/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCreating ? (
                  <div className="flex items-center space-x-2 relative z-10">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating NFT...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 relative z-10">
                    <Hash className="w-5 h-5" />
                    <span>Create NFT</span>
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
          </form>
        </motion.div>
      </div>
    </div>
  )
}
