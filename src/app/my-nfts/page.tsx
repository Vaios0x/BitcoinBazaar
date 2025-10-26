"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2, DollarSign, Eye, Copy, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react'
import { MyNFTCard } from '@/components/nft/MyNFTCard'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'
import { useNFTs } from '@/hooks/useNFTs'
import { useWalletStore } from '@/lib/stores/walletStore'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'
import toast from 'react-hot-toast'
import type { NFT } from '@/types/nft'

export default function MyNFTsPage() {
  const [editingNFT, setEditingNFT] = React.useState<NFT | null>(null)
  const [editPrice, setEditPrice] = React.useState('')
  const [editPaymentToken, setEditPaymentToken] = React.useState<'STX' | 'sBTC'>('STX')
  const [showUnlistedOnly, setShowUnlistedOnly] = React.useState(false)
  
  const { isConnected, address, userData, checkWalletConnection } = useWalletStore()
  const { nfts, loading, error, refreshNFTs, updateNFTPrice } = useNFTs()

  // Check wallet connection on component mount
  React.useEffect(() => {
    checkWalletConnection()
  }, [checkWalletConnection])

  // Filter NFTs created by the current user
  const myNFTs = React.useMemo(() => {
    if (!address) return []
    
    let filteredNFTs = nfts.filter(nft => nft.creator === address)
    
    if (showUnlistedOnly) {
      filteredNFTs = filteredNFTs.filter(nft => nft.price === 0)
    }
    
    return filteredNFTs.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime()
      const dateB = new Date(b.createdAt || 0).getTime()
      return dateB - dateA // Most recent first
    })
  }, [nfts, address, showUnlistedOnly])

  const handleEditPrice = (nft: NFT) => {
    setEditingNFT(nft)
    setEditPrice(nft.price.toString())
    setEditPaymentToken(nft.paymentToken)
  }

  const handleSavePrice = () => {
    if (!editingNFT || !editPrice) return
    
    const price = parseFloat(editPrice)
    if (price < 0) {
      toast.error('El precio debe ser mayor o igual a 0')
      return
    }
    
    updateNFTPrice(editingNFT.id, price, editPaymentToken)
    toast.success(`Precio actualizado a ${price} ${editPaymentToken}`)
    setEditingNFT(null)
    setEditPrice('')
  }

  const handleUnlistNFT = (nft: NFT) => {
    updateNFTPrice(nft.id, 0, nft.paymentToken)
    toast.success(`${nft.name} ha sido removido del marketplace`)
  }

  const handleCopyTransactionHash = (txHash: string) => {
    navigator.clipboard.writeText(txHash)
    toast.success('Hash de transacción copiado')
  }

  const totalNFTs = myNFTs.length
  const listedNFTs = myNFTs.filter(nft => nft.price > 0).length
  const unlistedNFTs = myNFTs.filter(nft => nft.price === 0).length
  const totalValue = myNFTs.reduce((sum, nft) => sum + (nft.usdPrice || 0), 0)

  if (!isConnected) {
    return (
      <div className="min-h-screen -mt-[28rem] pt-0 pb-8 px-4 sm:px-6 lg:px-8 relative">
        <BitcoinSymbols />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="text-6xl mb-6 relative">
              🔐
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
              Conecta tu wallet para ver y gestionar tus NFTs creados en BitcoinBazaar
            </p>
            <div className="space-y-4">
              <ConnectWallet />
              <motion.button
                onClick={() => checkWalletConnection()}
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🔄</span>
                <span>Refresh Connection</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen -mt-[20rem] sm:-mt-[24rem] lg:-mt-[28rem] pt-0 pb-8 px-4 sm:px-6 lg:px-8 relative">
      <BitcoinSymbols />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 relative">
            Mis <span className="gradient-text relative">
              NFTs
              <motion.span
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-bitcoin-500 text-xl sm:text-2xl"
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
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl">
            Gestiona todos tus NFTs creados en BitcoinBazaar. Actualiza precios, deslista o explora tus creaciones.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <div className="glass-card rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total NFTs</p>
                <p className="text-2xl font-bold text-white">{totalNFTs}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">₿</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Listados</p>
                <p className="text-2xl font-bold text-green-400">{listedNFTs}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">No Listados</p>
                <p className="text-2xl font-bold text-orange-400">{unlistedNFTs}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Valor Total</p>
                <p className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUnlistedOnly(!showUnlistedOnly)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  showUnlistedOnly
                    ? 'bg-orange-500 text-white'
                    : 'glass-card text-gray-300 hover:text-white'
                }`}
              >
                {showUnlistedOnly ? 'Mostrar Todos' : 'Solo No Listados'}
              </button>
              
              <button
                onClick={refreshNFTs}
                className="px-4 py-2 glass-card rounded-xl text-gray-300 hover:text-white transition-all flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Actualizar</span>
              </button>
            </div>

            <div className="text-sm text-gray-400">
              Mostrando {myNFTs.length} de {totalNFTs} NFTs
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="loading-dots mb-4">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="text-gray-400">Cargando tus NFTs...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">!</span>
              </div>
              <div>
                <h3 className="text-red-400 font-semibold">Error al cargar NFTs</h3>
                <p className="text-gray-300 text-sm">{error}</p>
                <button
                  onClick={refreshNFTs}
                  className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NFTs Grid */}
        {!loading && !error && myNFTs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myNFTs.map((nft) => (
                <MyNFTCard
                  key={nft.id}
                  nft={nft}
                  onEditPrice={handleEditPrice}
                  onUnlist={handleUnlistNFT}
                  onCopyTxHash={handleCopyTransactionHash}
                />
              ))}
            </div>
          </motion.div>
        ) : !loading && !error ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">🎨</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No tienes NFTs creados</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base px-4">
              Ve a la página de crear para mint tu primer NFT en BitcoinBazaar
            </p>
            <motion.button
              onClick={() => window.location.href = '/create'}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all relative overflow-hidden text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Crear Mi Primer NFT</span>
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
                <span className="text-white text-lg sm:text-xl">₿</span>
              </motion.div>
            </motion.button>
          </div>
        ) : null}

        {/* Edit Price Modal */}
        {editingNFT && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-white mb-4">Editar Precio</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    NFT: {editingNFT.name}
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Precio
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="0.00"
                      step="0.001"
                      min="0"
                      className="flex-1 px-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500"
                    />
                    <select
                      value={editPaymentToken}
                      onChange={(e) => setEditPaymentToken(e.target.value as 'STX' | 'sBTC')}
                      className="px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-stacks-500"
                    >
                      <option value="STX">STX</option>
                      <option value="sBTC">sBTC</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSavePrice}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingNFT(null)}
                    className="px-4 py-3 glass-card text-gray-300 hover:text-white rounded-xl font-semibold transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
