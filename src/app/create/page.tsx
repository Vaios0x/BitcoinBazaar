'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Image, DollarSign, Percent, Hash, Zap, Info } from 'lucide-react'
import { useWallet } from '@/lib/hooks/useWallet'

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
  const { isConnected } = useWallet()

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
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-12"
          >
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-gray-300 mb-8">
              You need to connect your wallet to create NFTs on BitcoinBazaar
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all">
              Connect Wallet
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Create <span className="gradient-text">NFT</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mint your unique NFT on BitcoinBazaar. Choose between STX or sBTC pricing with dynamic Bitcoin integration.
          </p>
        </motion.div>

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
                <label className="block text-sm font-semibold text-white mb-2">
                  NFT Name *
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
              <label className="block text-sm font-semibold text-white mb-2">
                Description *
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
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <DollarSign className="w-6 h-6" />
                <span>Pricing & Royalties</span>
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
                      step="0.01"
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
                      <label className="text-sm font-semibold text-green-400">
                        Enable Dynamic Bitcoin Pricing
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
                    <h4 className="text-sm font-semibold text-bitcoin-500 mb-1">
                      Bitcoin-Native NFT
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
              <button
                type="submit"
                disabled={!formData.name || !formData.description || !formData.image || isCreating}
                className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all ${
                  !formData.name || !formData.description || !formData.image || isCreating
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white hover:shadow-lg hover:shadow-stacks-500/50'
                }`}
              >
                {isCreating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating NFT...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Hash className="w-5 h-5" />
                    <span>Create NFT</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
