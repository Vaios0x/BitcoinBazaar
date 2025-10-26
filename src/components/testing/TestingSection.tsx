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
  Eye,
  TestTube,
  Rocket,
  Target,
  Activity,
  Layers,
  Database,
  Wallet,
  Network
} from 'lucide-react'
import { useWalletStore } from '@/lib/stores/walletStore'
import { validateTestingWallet, connectTestingWallet } from '@/lib/stacks/testing-wallet-config'
import { 
  testWalletConnection,
  mintNFTSimple, 
  transferNFTSimple, 
  listNFTSimple,
  burnNFTSimple,
  buyNFTSimple,
  makeOfferSimple,
  cancelListingSimple,
  createBattleSimple,
  executeBattleSimple,
  stakeNFTSimple,
  borrowAgainstNFTSimple,
  updateBitcoinPriceSimple
} from '@/lib/stacks/transactions-simple'
import toast from 'react-hot-toast'

interface TestFlow {
  id: string
  name: string
  description: string
  icon: any
  category: 'nft' | 'marketplace' | 'gaming' | 'defi' | 'oracle' | 'complete'
  status: 'pending' | 'success' | 'error' | 'idle'
  txId?: string
  explorerUrl?: string
  error?: string
  order: number
}

const COMPLETE_TEST_FLOW: Omit<TestFlow, 'status' | 'txId' | 'explorerUrl' | 'error'>[] = [
  // Complete Flow Test
  {
    id: 'complete-flow-test',
    name: '🚀 Complete Flow Test',
    description: 'Ejecuta todo el flujo completo de BitcoinBazaar',
    icon: Rocket,
    category: 'complete',
    order: 1
  },
  // NFT Core Tests
  {
    id: 'mint-nft-test',
    name: 'Mint NFT',
    description: 'Crear un nuevo NFT con metadatos únicos',
    icon: Star,
    category: 'nft',
    order: 2
  },
  {
    id: 'transfer-nft-test',
    name: 'Transfer NFT',
    description: 'Transferir NFT a otra wallet',
    icon: ArrowRight,
    category: 'nft',
    order: 3
  },
  {
    id: 'burn-nft-test',
    name: 'Burn NFT',
    description: 'Quemar NFT permanentemente',
    icon: Zap,
    category: 'nft',
    order: 4
  },
  // Marketplace Tests
  {
    id: 'list-nft-test',
    name: 'List NFT for Sale',
    description: 'Listar NFT para venta en el marketplace',
    icon: TrendingUp,
    category: 'marketplace',
    order: 5
  },
  {
    id: 'make-offer-test',
    name: 'Make Offer',
    description: 'Hacer oferta en NFT',
    icon: Banknote,
    category: 'marketplace',
    order: 6
  },
  {
    id: 'buy-nft-test',
    name: 'Buy NFT',
    description: 'Comprar NFT con STX o sBTC',
    icon: Coins,
    category: 'marketplace',
    order: 7
  },
  {
    id: 'cancel-listing-test',
    name: 'Cancel Listing',
    description: 'Cancelar listado de NFT',
    icon: AlertCircle,
    category: 'marketplace',
    order: 8
  },
  // Gaming Tests
  {
    id: 'create-battle-test',
    name: 'Create Battle',
    description: 'Crear batalla entre dos NFTs',
    icon: Gamepad2,
    category: 'gaming',
    order: 9
  },
  {
    id: 'execute-battle-test',
    name: 'Execute Battle',
    description: 'Ejecutar batalla y determinar ganador',
    icon: Target,
    category: 'gaming',
    order: 10
  },
  // DeFi Tests
  {
    id: 'stake-nft-test',
    name: 'Stake NFT',
    description: 'Staking NFT para obtener recompensas',
    icon: Shield,
    category: 'defi',
    order: 11
  },
  {
    id: 'borrow-against-nft-test',
    name: 'Borrow Against NFT',
    description: 'Préstamo usando NFT como colateral',
    icon: Banknote,
    category: 'defi',
    order: 12
  },
  // Oracle Tests
  {
    id: 'update-bitcoin-price-test',
    name: 'Update Bitcoin Price',
    description: 'Actualizar precio de Bitcoin en el oracle',
    icon: Bitcoin,
    category: 'oracle',
    order: 13
  }
]

export function TestingSection() {
  const [testFlows, setTestFlows] = useState<TestFlow[]>(
    COMPLETE_TEST_FLOW.map(flow => ({ ...flow, status: 'idle' as const }))
  )
  const [isRunningCompleteFlow, setIsRunningCompleteFlow] = useState(false)
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const { isConnected, address, walletType } = useWalletStore()

  const updateTestFlow = (id: string, updates: Partial<TestFlow>) => {
    setTestFlows(prev => prev.map(flow => 
      flow.id === id ? { ...flow, ...updates } : flow
    ))
  }

  const getExplorerUrl = (txId: string) => {
    return `https://explorer.stacks.co/txid/${txId}?chain=testnet`
  }

  const executeTestFlow = async (testFlow: TestFlow) => {
    // Validate Leather wallet for testing section
    if (!validateTestingWallet()) {
      toast.error('Leather wallet is required for testing section. Please install Leather wallet.')
      return
    }
    
    if (!isConnected) {
      toast.error('Please connect your Leather wallet first')
      return
    }
    
    // Ensure wallet type is Leather
    if (walletType !== 'leather') {
      toast.error('Only Leather wallet is supported in testing section')
      return
    }

    try {
      updateTestFlow(testFlow.id, { status: 'pending' })
      
      let txId: string
      
      switch (testFlow.id) {
        case 'mint-nft-test':
          txId = await mintNFTSimple('BitcoinBazaar Test NFT', 'https://bitcoinbazaar.com/test-nft.png')
          break
        case 'transfer-nft-test':
          txId = await transferNFTSimple(1, address || 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR')
          break
        case 'burn-nft-test':
          txId = await burnNFTSimple(1)
          break
        case 'list-nft-test':
          txId = await listNFTSimple(1, 0.1, 'STX')
          break
        case 'make-offer-test':
          txId = await makeOfferSimple(1, 0.05, 'STX')
          break
        case 'buy-nft-test':
          txId = await buyNFTSimple(1, 'STX')
          break
        case 'cancel-listing-test':
          txId = await cancelListingSimple(1)
          break
        case 'create-battle-test':
          txId = await createBattleSimple(1, 2, 1000000)
          break
        case 'execute-battle-test':
          txId = await executeBattleSimple(1)
          break
        case 'stake-nft-test':
          txId = await stakeNFTSimple(1, 30)
          break
        case 'borrow-against-nft-test':
          txId = await borrowAgainstNFTSimple(1, 0.001)
          break
        case 'update-bitcoin-price-test':
          txId = await updateBitcoinPriceSimple(45000, 95)
          break
        default:
          throw new Error('Unknown test flow')
      }

      const explorerUrl = getExplorerUrl(txId)
      
      updateTestFlow(testFlow.id, { 
        status: 'success', 
        txId, 
        explorerUrl 
      })

      toast.success(`${testFlow.name} completed successfully!`)
      
    } catch (error: any) {
      console.error(`Error in ${testFlow.name}:`, error)
      updateTestFlow(testFlow.id, { 
        status: 'error', 
        error: error.message 
      })
      toast.error(`Failed to execute ${testFlow.name}: ${error.message}`)
    }
  }

  const executeCompleteFlow = async () => {
    // Validate Leather wallet for testing section
    if (!validateTestingWallet()) {
      toast.error('Leather wallet is required for testing section. Please install Leather wallet.')
      return
    }
    
    if (!isConnected) {
      toast.error('Please connect your Leather wallet first')
      return
    }
    
    // Ensure wallet type is Leather
    if (walletType !== 'leather') {
      toast.error('Only Leather wallet is supported in testing section')
      return
    }

    setIsRunningCompleteFlow(true)
    setCurrentTestIndex(0)

    // Reset all tests
    setTestFlows(prev => prev.map(flow => ({ ...flow, status: 'idle' })))

    const testsToRun = testFlows.filter(flow => flow.id !== 'complete-flow-test')
    
    for (let i = 0; i < testsToRun.length; i++) {
      const test = testsToRun[i]
      setCurrentTestIndex(i)
      
      try {
        await executeTestFlow(test)
        // Wait a bit between tests
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (error) {
        console.error(`Error in complete flow at ${test.name}:`, error)
        break
      }
    }

    setIsRunningCompleteFlow(false)
    setCurrentTestIndex(0)
    toast.success('Complete flow test finished!')
  }

  const getStatusIcon = (status: TestFlow['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'pending':
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
      default:
        return <Play className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: TestFlow['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-400/50 bg-green-400/10'
      case 'error':
        return 'border-red-400/50 bg-red-400/10'
      case 'pending':
        return 'border-blue-400/50 bg-blue-400/10'
      default:
        return 'border-gray-400/50 bg-gray-400/10'
    }
  }

  const completedTests = testFlows.filter(flow => flow.status === 'success').length
  const totalTests = testFlows.filter(flow => flow.id !== 'complete-flow-test').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <TestTube className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Testing Section
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Complete testing suite for BitcoinBazaar - All transactions work on real Stacks testnet
          </motion.p>
        </div>

        {/* Leather Wallet Requirement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="glass-card p-6 rounded-2xl border-2 border-blue-400/50 bg-blue-400/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Leather Wallet Required
                  </h3>
                  <p className="text-gray-300">
                    All transactions in the Testing Section require <span className="text-blue-400 font-semibold">Leather Wallet</span> 
                    for Stacks and Bitcoin integration. Xverse wallet is not supported in this section.
                  </p>
                </div>
              </div>
              <button
                onClick={async () => {
                  try {
                    const txId = await testWalletConnection()
                    toast.success(`Wallet connection test successful! TX: ${txId}`)
                  } catch (error: any) {
                    toast.error(`Wallet test failed: ${error.message}`)
                  }
                }}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-semibold transition-colors"
              >
                Test Connection
              </button>
            </div>
          </div>
        </motion.div>

        {/* Wallet Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Wallet className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Wallet Status</h3>
                  <p className="text-gray-400">
                    {isConnected ? `Connected: ${address}` : 'Not connected'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Wallet: {walletType === 'leather' ? 'Leather (Required)' : 'None'} | Network: Testnet
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-sm text-gray-400">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Test Progress</h3>
              <span className="text-sm text-gray-400">
                {completedTests}/{totalTests} completed
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedTests / totalTests) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Complete Flow Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <div className="glass-card p-6 rounded-2xl border-2 border-blue-400/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Rocket className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Complete Flow Test</h3>
                  <p className="text-gray-400">
                    Execute all tests in sequence - Real transactions on Stacks testnet (Leather wallet required)
                  </p>
                </div>
              </div>
              <button
                onClick={executeCompleteFlow}
                disabled={!isConnected || isRunningCompleteFlow}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunningCompleteFlow ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Running...</span>
                  </div>
                ) : (
                  'Run Complete Flow'
                )}
              </button>
            </div>
            {isRunningCompleteFlow && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Running test {currentTestIndex + 1} of {totalTests}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentTestIndex + 1) / totalTests) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Individual Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testFlows.map((testFlow, index) => (
            <motion.div
              key={testFlow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`glass-card p-6 rounded-2xl border-2 ${getStatusColor(testFlow.status)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <testFlow.icon className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testFlow.name}</h3>
                    <p className="text-sm text-gray-400">{testFlow.description}</p>
                  </div>
                </div>
                {getStatusIcon(testFlow.status)}
              </div>

              {testFlow.txId && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-400">Transaction ID:</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(testFlow.txId!)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 font-mono break-all">
                    {testFlow.txId}
                  </p>
                </div>
              )}

              {testFlow.explorerUrl && (
                <div className="mb-4">
                  <a
                    href={testFlow.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">View on Explorer</span>
                  </a>
                </div>
              )}

              {testFlow.error && (
                <div className="mb-4">
                  <p className="text-sm text-red-400">{testFlow.error}</p>
                </div>
              )}

              <button
                onClick={() => executeTestFlow(testFlow)}
                disabled={!isConnected || testFlow.status === 'pending' || testFlow.id === 'complete-flow-test'}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {testFlow.status === 'pending' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Running...</span>
                  </div>
                ) : (
                  'Run Test'
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contract Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-4">Deployed Contracts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'NFT Core', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-core' },
                { name: 'Marketplace', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace' },
                { name: 'Bitcoin Oracle', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.bitcoin-oracle' },
                { name: 'Gaming NFT', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft' },
                { name: 'NFT DeFi', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi' },
                { name: 'Analytics', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.analytics' },
                { name: 'Rewards', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.rewards' },
                { name: 'Governance', address: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.governance' }
              ].map((contract, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">{contract.name}</h4>
                  <p className="text-xs text-gray-400 font-mono break-all">{contract.address}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
