'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, TrendingDown, Info, Loader2 } from 'lucide-react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { useBitcoinPrice } from '@/lib/hooks/useBitcoinPrice'
import type { NFT } from '@/types/nft'

interface BuyNFTModalProps {
  nft: NFT
  isOpen: boolean
  onClose: () => void
}

export function BuyNFTModal({ nft, isOpen, onClose }: BuyNFTModalProps) {
  const [paymentToken, setPaymentToken] = React.useState<'STX' | 'sBTC'>('STX')
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [agreedToTerms, setAgreedToTerms] = React.useState(false)
  
  const { address, balance, isConnected } = useWalletStore()
  const { currentBlock, isDynamicPricing, discount } = useBitcoinPrice(nft.id)

  const finalPrice = isDynamicPricing ? nft.price * (1 - discount / 100) : nft.price
  const platformFee = finalPrice * 0.025 // 2.5%
  const royaltyFee = finalPrice * (nft.royaltyPercent / 100)
  const totalCost = finalPrice + platformFee + royaltyFee
  
  const hasEnoughBalance = paymentToken === 'STX' 
    ? balance.stx >= totalCost 
    : balance.sbtc >= totalCost

  const handleBuy = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!hasEnoughBalance) {
      alert(`Insufficient ${paymentToken} balance`)
      return
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      alert('Purchase successful!')
      onClose()
    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Purchase failed')
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card rounded-3xl max-w-md w-full p-6 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Complete Purchase</h2>
                <p className="text-gray-400">You're about to purchase <span className="text-white font-semibold">{nft.name}</span></p>
              </div>
              
              {/* Payment Token Selection */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentToken('STX')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentToken === 'STX'
                        ? 'border-stacks-500 bg-stacks-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">STX</div>
                    <div className="text-xs text-gray-400">Stacks Token</div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {finalPrice.toFixed(2)} STX
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setPaymentToken('sBTC')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentToken === 'sBTC'
                        ? 'border-bitcoin-500 bg-bitcoin-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">sBTC</div>
                    <div className="text-xs text-gray-400">Bitcoin on Stacks</div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {(finalPrice * 0.001).toFixed(6)} sBTC
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Dynamic Pricing Info */}
              {isDynamicPricing && discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">
                      {discount.toFixed(1)}% Bitcoin Block Discount!
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Current Bitcoin block #{currentBlock} gives you a special discount.
                    Original price: {nft.price.toFixed(2)} {paymentToken}
                  </p>
                </motion.div>
              )}
              
              {/* Price Breakdown */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Item Price</span>
                  <span className="text-white font-semibold">
                    {finalPrice.toFixed(2)} {paymentToken}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-400">Creator Royalty</span>
                    <Info className="w-3 h-3 text-gray-500" />
                  </div>
                  <span className="text-white">
                    {royaltyFee.toFixed(2)} {paymentToken} ({nft.royaltyPercent}%)
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Platform Fee</span>
                  <span className="text-white">
                    {platformFee.toFixed(2)} {paymentToken} (2.5%)
                  </span>
                </div>
                
                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">
                      {totalCost.toFixed(2)} {paymentToken}
                    </div>
                    <div className="text-xs text-gray-400">
                      ≈ ${(totalCost * 0.48).toFixed(2)} USD
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Balance Check */}
              <div className="mb-4 p-3 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Your Balance</span>
                  <span className={`font-semibold ${hasEnoughBalance ? 'text-green-400' : 'text-red-400'}`}>
                    {paymentToken === 'STX' ? balance.stx.toFixed(2) : balance.sbtc.toFixed(6)} {paymentToken}
                  </span>
                </div>
                {!hasEnoughBalance && (
                  <p className="text-xs text-red-400 mt-2">Insufficient balance to complete purchase</p>
                )}
              </div>
              
              {/* Terms Agreement */}
              <label className="flex items-start space-x-2 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-600 text-stacks-500 focus:ring-stacks-500"
                />
                <span className="text-xs text-gray-400">
                  I understand this purchase is final and non-refundable. I agree to the{' '}
                  <a href="/terms" className="text-stacks-400 hover:underline">terms of service</a>.
                </span>
              </label>
              
              {/* Buy Button */}
              <button
                onClick={handleBuy}
                disabled={!hasEnoughBalance || !agreedToTerms || isProcessing}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                  !hasEnoughBalance || !agreedToTerms || isProcessing
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white hover:shadow-lg hover:shadow-stacks-500/50'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Complete Purchase</span>
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Transaction will be verified on Bitcoin blockchain via Stacks
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
