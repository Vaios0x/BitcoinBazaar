"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  DollarSign, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  Copy,
  Settings
} from 'lucide-react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { BitcoinSymbols } from '@/components/effects/BitcoinSymbols'
import { useNFTs } from '@/hooks/useNFTs'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'
import { listNFTSimple } from '@/lib/stacks/transactions-simple'
import toast from 'react-hot-toast'
import { NeuralNotification } from '@/components/notifications/NeuralNotification'
import type { NFT } from '@/types/nft'

export default function MyNFTsPage() {
  const [isListing, setIsListing] = React.useState<number | null>(null)
  const [listingModal, setListingModal] = React.useState<{
    isOpen: boolean
    nft: any
  }>({ isOpen: false, nft: null })
  const [listingForm, setListingForm] = React.useState({
    price: '',
    paymentToken: 'STX' as 'STX' | 'sBTC'
  })
  const [transactionStatus, setTransactionStatus] = React.useState<{
    type: 'loading' | 'success' | 'error'
    message: string
    txId?: string
    explorerUrl?: string
  } | null>(null)
  const [activeTab, setActiveTab] = React.useState<'created' | 'purchased'>('created')

  const { isConnected, address, userData, checkWalletConnection } = useWalletStore()
  const { nfts, refreshNFTs, updateNFT } = useNFTs()

  // Check wallet connection on component mount
  React.useEffect(() => {
    checkWalletConnection()
  }, [checkWalletConnection])

  // Listen for NFT purchase events
  React.useEffect(() => {
    const handleNFTPurchase = (event: CustomEvent) => {
      console.log('🔄 NFT Purchase event received:', event.detail)
      refreshNFTs()
    }

    window.addEventListener('nft-purchased', handleNFTPurchase as EventListener)
    
    return () => {
      window.removeEventListener('nft-purchased', handleNFTPurchase as EventListener)
    }
  }, [refreshNFTs])

  // Filter NFTs owned by current user
  const myCreatedNFTs = nfts.filter(nft => nft.creator === address)
  const myPurchasedNFTs = nfts.filter(nft => 
    nft.purchasedBy === address || 
    (nft.isPurchased && nft.purchasedBy === address)
  )
  
  // Debug logging
  console.log('🔍 My NFTs Debug:', {
    totalNFTs: nfts.length,
    address,
    myCreatedNFTs: myCreatedNFTs.length,
    myPurchasedNFTs: myPurchasedNFTs.length,
    allNFTs: nfts.map(n => ({
      id: n.id,
      name: n.name,
      creator: n.creator,
      purchasedBy: n.purchasedBy,
      isPurchased: n.isPurchased
    }))
  })

  // Debug function to check storage directly
  const debugStorage = () => {
    const { nftStorage } = require('@/lib/nft-storage')
    const storedNFTs = nftStorage.getStoredNFTs()
    console.log('🔍 Direct Storage Debug:', {
      totalStored: storedNFTs.length,
      address,
      purchasedNFTs: storedNFTs.filter((n: NFT) => n.purchasedBy === address),
      allStoredNFTs: storedNFTs.map((n: NFT) => ({
        id: n.id,
        name: n.name,
        creator: n.creator,
        purchasedBy: n.purchasedBy,
        isPurchased: n.isPurchased,
        price: n.price,
        isListed: n.isListed
      }))
    })
  }
  
  // Combine both types for stats
  const myNFTs = [...myCreatedNFTs, ...myPurchasedNFTs]

  const handleListNFT = async (nft: any) => {
    if (!isConnected || !address) {
      toast.error('Por favor conecta tu wallet primero')
      return
    }

    if (!listingForm.price || parseFloat(listingForm.price) <= 0) {
      toast.error('Por favor ingresa un precio válido')
      return
    }

    setIsListing(nft.id)
    
    try {
      setTransactionStatus({
        type: 'loading',
        message: 'Listando NFT en el marketplace...'
      })

      const nftPrice = parseFloat(listingForm.price)
      
      // Call the real listing function
      const listingTxId = await listNFTSimple(
        nft.id,
        nftPrice,
        listingForm.paymentToken
      )
      
      console.log('✅ NFT listed successfully:', listingTxId)
      
      // Update NFT in storage with listing information
      updateNFT(nft.id, {
        price: nftPrice,
        paymentToken: listingForm.paymentToken,
        isListed: true,
        listingTxId: listingTxId,
        usdPrice: nftPrice * 0.5
      })
      
      console.log('✅ NFT updated in storage:', nft.id)
      
      // Success notification
      const explorerUrl = `https://explorer.stacks.co/txid/${listingTxId}?chain=testnet`
      setTransactionStatus({
        type: 'success',
        message: `¡NFT listado exitosamente! Hash: ${listingTxId}`,
        txId: listingTxId,
        explorerUrl
      })
      
      toast.success(`NFT listado por ${nftPrice} ${listingForm.paymentToken}`, {
        duration: 6000,
        style: {
          background: '#10B981',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '500'
        }
      })
      
      // Close modal
      setListingModal({ isOpen: false, nft: null })
      setListingForm({ price: '', paymentToken: 'STX' })
      
      // Auto-hide success notification after 15 seconds
      setTimeout(() => {
        setTransactionStatus(null)
      }, 15000)
      
    } catch (error: any) {
      console.error('NFT listing failed:', error)
      
      setTransactionStatus({
        type: 'error',
        message: `Error al listar NFT: ${error.message || 'Unknown error'}`
      })
      
      toast.error(`Error al listar NFT: ${error.message || 'Unknown error'}`, {
        duration: 6000,
        style: {
          background: '#EF4444',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '500'
        }
      })
      
      // Auto-hide error notification after 8 seconds
      setTimeout(() => {
        setTransactionStatus(null)
      }, 8000)
    } finally {
      setIsListing(null)
    }
  }

  const openListingModal = (nft: any) => {
    setListingModal({ isOpen: true, nft })
    setListingForm({
      price: '',
      paymentToken: nft.paymentToken || 'STX'
    })
  }

  const closeListingModal = () => {
    setListingModal({ isOpen: false, nft: null })
    setListingForm({ price: '', paymentToken: 'STX' })
  }

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
              You need to connect your wallet to view your NFTs on BitcoinBazaar
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
          className="mb-8 text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 relative">
            Mis <span className="gradient-text relative">
              NFTs
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
            Gestiona tus NFTs creados. Lista, edita precios y controla tus activos digitales.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-card rounded-2xl p-6 text-center">
            <Package className="w-8 h-8 text-bitcoin-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">{myCreatedNFTs.length}</h3>
            <p className="text-gray-400">NFTs Creados</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">
              {myCreatedNFTs.filter(nft => nft.isListed).length}
            </h3>
            <p className="text-gray-400">Listados</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">
              {myCreatedNFTs.filter(nft => !nft.isListed).length}
            </h3>
            <p className="text-gray-400">Sin Listar</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-white mb-1">{myPurchasedNFTs.length}</h3>
            <p className="text-gray-400">NFTs Comprados</p>
          </div>
        </motion.div>

        {/* Debug Button - Temporary */}
        <div className="mb-4 text-center">
          <button
            onClick={debugStorage}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm hover:bg-red-500/30 transition-colors"
          >
            🔍 Debug Storage (Temporary)
          </button>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl w-fit mx-auto">
            <motion.button
              onClick={() => setActiveTab('created')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'created'
                  ? 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>NFTs Creados ({myCreatedNFTs.length})</span>
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('purchased')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'purchased'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>NFTs Comprados ({myPurchasedNFTs.length})</span>
              </div>
            </motion.button>
          </div>
        </motion.div>
        {(() => {
          const currentNFTs = activeTab === 'created' ? myCreatedNFTs : myPurchasedNFTs
          
          if (currentNFTs.length === 0) {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center py-16"
              >
                <Package className="w-24 h-24 text-gray-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {activeTab === 'created' ? 'No tienes NFTs creados' : 'No tienes NFTs comprados'}
                </h3>
                <p className="text-gray-400 mb-8">
                  {activeTab === 'created' 
                    ? 'Crea tu primer NFT para comenzar tu colección'
                    : 'Compra NFTs en la sección Explore para verlos aquí'
                  }
                </p>
                {activeTab === 'created' && (
                  <motion.a
                    href="/create"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Crear NFT</span>
                  </motion.a>
                )}
                {activeTab === 'purchased' && (
                  <motion.a
                    href="/explore"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-5 h-5" />
                    <span>Explorar NFTs</span>
                  </motion.a>
                )}
              </motion.div>
            )
          }
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {currentNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-stacks-500/20 transition-all group"
                >
                  {/* NFT Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={nft.imageUri}
                      alt={nft.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {activeTab === 'created' ? (
                        nft.isListed ? (
                          <div className="flex items-center space-x-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            <CheckCircle className="w-3 h-3" />
                            <span>Listado</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 bg-gray-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            <Clock className="w-3 h-3" />
                            <span>Sin Listar</span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center space-x-1 bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          <span>Comprado</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NFT Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-2 line-clamp-1">{nft.name}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{nft.description}</p>
                    
                    {/* Price or Purchase Info */}
                    {activeTab === 'created' && nft.isListed && nft.price > 0 ? (
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-white">{nft.price}</span>
                          <span className="text-sm text-gray-400">{nft.paymentToken}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          ${nft.usdPrice?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                    ) : activeTab === 'purchased' ? (
                      <div className="text-sm text-gray-500 mb-4">
                        Comprado el {nft.purchaseDate ? new Date(nft.purchaseDate).toLocaleDateString() : 'N/A'}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm mb-4">No listado</div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {activeTab === 'created' ? (
                        !nft.isListed ? (
                          <motion.button
                            onClick={() => openListingModal(nft)}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <DollarSign className="w-4 h-4" />
                            <span>Listar</span>
                          </motion.button>
                        ) : (
                          <motion.button
                            onClick={() => openListingModal(nft)}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Editar</span>
                          </motion.button>
                        )
                      ) : (
                        <motion.button
                          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Ver Detalles</span>
                        </motion.button>
                      )}
                      
                      <motion.button
                        className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        })()}
      </div>

      {/* Listing Modal */}
      {listingModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {listingModal.nft?.isListed ? 'Editar Precio' : 'Listar NFT'}
              </h3>
              <button
                onClick={closeListingModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* NFT Preview */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={listingModal.nft?.imageUri}
                alt={listingModal.nft?.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold text-white">{listingModal.nft?.name}</h4>
                <p className="text-gray-400 text-sm">{listingModal.nft?.description}</p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Precio
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={listingForm.price}
                    onChange={(e) => setListingForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    step="0.001"
                    min="0"
                    className="flex-1 px-4 py-3 glass-card rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500"
                  />
                  <select
                    value={listingForm.paymentToken}
                    onChange={(e) => setListingForm(prev => ({ ...prev, paymentToken: e.target.value as 'STX' | 'sBTC' }))}
                    className="px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-stacks-500"
                  >
                    <option value="STX">STX</option>
                    <option value="sBTC">sBTC</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  onClick={() => handleListNFT(listingModal.nft)}
                  disabled={!listingForm.price || parseFloat(listingForm.price) <= 0 || isListing === listingModal.nft?.id}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    !listingForm.price || parseFloat(listingForm.price) <= 0 || isListing === listingModal.nft?.id
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white hover:shadow-lg'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isListing === listingModal.nft?.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Listando...</span>
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4" />
                      <span>{listingModal.nft?.isListed ? 'Actualizar' : 'Listar'}</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  onClick={closeListingModal}
                  className="px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Neural Notification */}
      {transactionStatus && (
        <NeuralNotification
          type={transactionStatus.type}
          message={transactionStatus.message}
          txId={transactionStatus.txId}
          explorerUrl={transactionStatus.explorerUrl}
          onClose={() => setTransactionStatus(null)}
          autoClose={true}
          duration={15000}
        />
      )}
    </div>
  )
}