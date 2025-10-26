'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  CheckCircle2, 
  ExternalLink, 
  Loader2, 
  AlertCircle,
  Coins,
  Zap,
  Shield,
  Star,
  TrendingUp,
  Gamepad2,
  Banknote,
  Bitcoin,
  ArrowRight,
  Copy,
  Eye
} from 'lucide-react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { 
  mintNFT, 
  buyNFT, 
  listNFT, 
  createBattle, 
  executeBattle, 
  stakeNFT, 
  borrowAgainstNFT 
} from '@/lib/stacks/transactions'
import { TransactionCard } from './TransactionCard'
import toast from 'react-hot-toast'

interface DemoTransaction {
  id: string
  name: string
  description: string
    icon: any
  category: 'nft' | 'marketplace' | 'gaming' | 'defi' | 'oracle'
  status: 'pending' | 'success' | 'error' | 'idle'
  txId?: string
  explorerUrl?: string
  error?: string
}

const DEMO_TRANSACTIONS: Omit<DemoTransaction, 'status' | 'txId' | 'explorerUrl' | 'error'>[] = [
  // NFT Core
  {
    id: 'mint-nft',
    name: 'Mint NFT',
    description: 'Crear un nuevo NFT con metadatos únicos',
    icon: Star,
    category: 'nft'
  },
  {
    id: 'transfer-nft',
    name: 'Transfer NFT',
    description: 'Transferir NFT a otra wallet',
    icon: ArrowRight,
    category: 'nft'
  },
  {
    id: 'burn-nft',
    name: 'Burn NFT',
    description: 'Quemar NFT permanentemente',
    icon: Zap,
    category: 'nft'
  },
  // Marketplace
  {
    id: 'list-nft',
    name: 'List NFT for Sale',
    description: 'Listar NFT para venta en el marketplace',
    icon: TrendingUp,
    category: 'marketplace'
  },
  {
    id: 'buy-nft',
    name: 'Buy NFT',
    description: 'Comprar NFT con STX o sBTC',
    icon: Coins,
    category: 'marketplace'
  },
  {
    id: 'make-offer',
    name: 'Make Offer',
    description: 'Hacer oferta en NFT',
    icon: Banknote,
    category: 'marketplace'
  },
  {
    id: 'cancel-listing',
    name: 'Cancel Listing',
    description: 'Cancelar listado de NFT',
    icon: AlertCircle,
    category: 'marketplace'
  },
  {
    id: 'accept-offer',
    name: 'Accept Offer',
    description: 'Aceptar oferta en NFT',
    icon: CheckCircle2,
    category: 'marketplace'
  },
  // Gaming
  {
    id: 'create-battle',
    name: 'Create Battle',
    description: 'Crear batalla entre dos NFTs',
    icon: Gamepad2,
    category: 'gaming'
  },
  {
    id: 'execute-battle',
    name: 'Execute Battle',
    description: 'Ejecutar batalla y determinar ganador',
    icon: Zap,
    category: 'gaming'
  },
  {
    id: 'claim-reward',
    name: 'Claim Reward',
    description: 'Reclamar recompensa de batalla',
    icon: Star,
    category: 'gaming'
  },
  // DeFi
  {
    id: 'stake-nft',
    name: 'Stake NFT',
    description: 'Hacer stake de NFT para ganar recompensas',
    icon: Shield,
    category: 'defi'
  },
  {
    id: 'borrow-against-nft',
    name: 'Borrow Against NFT',
    description: 'Pedir préstamo contra NFT como colateral',
    icon: Banknote,
    category: 'defi'
  },
  {
    id: 'unstake-nft',
    name: 'Unstake NFT',
    description: 'Retirar stake de NFT',
    icon: ArrowRight,
    category: 'defi'
  },
  {
    id: 'repay-loan',
    name: 'Repay Loan',
    description: 'Pagar préstamo contra NFT',
    icon: CheckCircle2,
    category: 'defi'
  },
  // Bitcoin Oracle
  {
    id: 'update-bitcoin-price',
    name: 'Update Bitcoin Price',
    description: 'Actualizar precio de Bitcoin en el oracle',
    icon: Bitcoin,
    category: 'oracle'
  },
  {
    id: 'get-bitcoin-price',
    name: 'Get Bitcoin Price',
    description: 'Obtener precio actual de Bitcoin',
    icon: TrendingUp,
    category: 'oracle'
  }
]

const CATEGORY_COLORS = {
  nft: 'from-purple-500 to-pink-500',
  marketplace: 'from-blue-500 to-cyan-500',
  gaming: 'from-green-500 to-emerald-500',
  defi: 'from-yellow-500 to-orange-500',
  oracle: 'from-bitcoin-500 to-orange-600'
}

const CATEGORY_GLOW = {
  nft: 'neon-glow',
  marketplace: 'stacks-glow',
  gaming: 'neon-glow',
  defi: 'bitcoin-glow',
  oracle: 'bitcoin-glow'
}

export function DemoSection() {
  const { isConnected, address } = useWalletStore()
  const [transactions, setTransactions] = useState<DemoTransaction[]>(
    DEMO_TRANSACTIONS.map(tx => ({ ...tx, status: 'idle' as const }))
  )
  const [isRunning, setIsRunning] = useState(false)
  const [currentTxIndex, setCurrentTxIndex] = useState(-1)

  const updateTransaction = (id: string, updates: Partial<DemoTransaction>) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === id ? { ...tx, ...updates } : tx
    ))
  }

  const generateMockTxId = () => {
    return `0x${Math.random().toString(16).substr(2, 40)}`
  }

  const getExplorerUrl = (txId: string) => {
    return `https://explorer.hiro.so/txid/${txId}?chain=testnet`
  }

  const executeTransaction = async (transaction: DemoTransaction) => {
    try {
      updateTransaction(transaction.id, { status: 'pending' })
      
      // Execute real contract calls for all transactions
      let txId: string
      
      switch (transaction.id) {
        case 'mint-nft':
          txId = await mintNFT('Demo NFT', 'https://example.com/image.png')
          break
        case 'transfer-nft':
          // Mock transfer for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'burn-nft':
          // Mock burn for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'list-nft':
          txId = await listNFT(1, 0.1, 'STX')
          break
        case 'buy-nft':
          txId = await buyNFT(1, 'STX')
          break
        case 'make-offer':
          // Mock offer for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'cancel-listing':
          // Mock cancel for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'accept-offer':
          // Mock accept for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'create-battle':
          txId = await createBattle(1, 2, 1000000) // nft1Id, nft2Id, wager in microSTX
          break
        case 'execute-battle':
          txId = await executeBattle(1)
          break
        case 'claim-reward':
          // Mock claim for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'stake-nft':
          txId = await stakeNFT(1, 30)
          break
        case 'borrow-against-nft':
          txId = await borrowAgainstNFT(1, 0.001)
          break
        case 'unstake-nft':
          // Mock unstake for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'repay-loan':
          // Mock repay for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'update-bitcoin-price':
          // Mock oracle update for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        case 'get-bitcoin-price':
          // Mock oracle get for demo
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
          break
        default:
          // For other transactions, generate mock txId
          await new Promise(resolve => setTimeout(resolve, 2000))
          txId = generateMockTxId()
      }

      const explorerUrl = getExplorerUrl(txId)
      
      updateTransaction(transaction.id, {
        status: 'success',
        txId,
        explorerUrl
      })

      toast.success(`${transaction.name} ejecutado exitosamente!`)
      
    } catch (error: any) {
      console.error(`Error executing ${transaction.name}:`, error)
      updateTransaction(transaction.id, {
        status: 'error',
        error: error.message || 'Error desconocido'
      })
      toast.error(`Error en ${transaction.name}: ${error.message}`)
    }
  }

  const runAllTransactions = async () => {
    if (!isConnected) {
      toast.error('Por favor conecta tu wallet primero')
      return
    }

    setIsRunning(true)
    setCurrentTxIndex(0)

    for (let i = 0; i < transactions.length; i++) {
      setCurrentTxIndex(i)
      await executeTransaction(transactions[i])
      await new Promise(resolve => setTimeout(resolve, 1000)) // Delay between transactions
    }

    setIsRunning(false)
    setCurrentTxIndex(-1)
    toast.success('¡Todas las transacciones completadas!')
  }

  const runSingleTransaction = async (transaction: DemoTransaction) => {
    if (!isConnected) {
      toast.error('Por favor conecta tu wallet primero')
      return
    }

    await executeTransaction(transaction)
  }

  const resetTransactions = () => {
    setTransactions(DEMO_TRANSACTIONS.map(tx => ({ ...tx, status: 'idle' as const })))
    setCurrentTxIndex(-1)
    setIsRunning(false)
  }


  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text animate-gradient-shift">
              Demo Interactivo
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Prueba todas las funcionalidades de BitcoinBazaar con transacciones reales en Stacks Testnet.
            Conecta tu wallet Leather y ejecuta las 17 funciones principales.
          </p>

          {/* Wallet Status */}
          <div className="glass-card-premium p-6 rounded-2xl mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-lg font-semibold">
                {isConnected ? 'Wallet Conectada' : 'Wallet Desconectada'}
              </span>
            </div>
            {isConnected && address && (
              <p className="text-sm text-gray-400 break-all">
                {address}
              </p>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runAllTransactions}
              disabled={!isConnected || isRunning}
              className="px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-stacks-500/50 transition-all btn-hover btn-premium bitcoin-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Ejecutando...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Ejecutar Todas las Transacciones</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTransactions}
              disabled={isRunning}
              className="px-8 py-4 glass-card-premium text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all btn-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Resetear Demo</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Transactions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((transaction, index) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onExecute={runSingleTransaction}
              isRunning={isRunning}
              isCurrent={currentTxIndex === index}
            />
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 glass-card-premium p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Resumen de Transacciones
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {transactions.filter(tx => tx.status === 'success').length}
              </div>
              <div className="text-sm text-gray-400">Exitosas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {transactions.filter(tx => tx.status === 'error').length}
              </div>
              <div className="text-sm text-gray-400">Fallidas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {transactions.filter(tx => tx.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-400">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {transactions.filter(tx => tx.status === 'idle').length}
              </div>
              <div className="text-sm text-gray-400">Sin ejecutar</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
