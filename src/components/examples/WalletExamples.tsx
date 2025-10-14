'use client'

import { useWalletStore } from '@/lib/stores/walletStore'
import { buyNFT, mintNFT, listNFT, createBattle, stakeNFT } from '@/lib/stacks/transactions'
import toast from 'react-hot-toast'

export function WalletExamples() {
  const { isConnected, address, balance } = useWalletStore()

  const handleMintNFT = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      toast.loading('Minting NFT...')
      const txId = await mintNFT(
        'My Awesome NFT',
        'This is a test NFT minted from BitcoinBazaar',
        'https://example.com/image.png',
        5
      )
      toast.success(`NFT minted successfully! TxID: ${txId}`)
    } catch (error) {
      toast.error('Failed to mint NFT')
      console.error(error)
    }
  }

  const handleBuyNFT = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      toast.loading('Buying NFT...')
      const txId = await buyNFT(1, 'sBTC')
      toast.success(`NFT purchased successfully! TxID: ${txId}`)
    } catch (error) {
      toast.error('Failed to buy NFT')
      console.error(error)
    }
  }

  const handleListNFT = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      toast.loading('Listing NFT...')
      const txId = await listNFT(1, 0.1, 'sBTC')
      toast.success(`NFT listed successfully! TxID: ${txId}`)
    } catch (error) {
      toast.error('Failed to list NFT')
      console.error(error)
    }
  }

  const handleCreateBattle = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      toast.loading('Creating battle...')
      const txId = await createBattle(1, 2, 0.01, 'sBTC')
      toast.success(`Battle created successfully! TxID: ${txId}`)
    } catch (error) {
      toast.error('Failed to create battle')
      console.error(error)
    }
  }

  const handleStakeNFT = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      toast.loading('Staking NFT...')
      const txId = await stakeNFT(1, 30) // 30 days
      toast.success(`NFT staked successfully! TxID: ${txId}`)
    } catch (error) {
      toast.error('Failed to stake NFT')
      console.error(error)
    }
  }

  if (!isConnected) {
    return (
      <div className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Wallet Examples</h3>
        <p className="text-gray-400">Please connect your wallet to see transaction examples.</p>
      </div>
    )
  }

  return (
    <div className="p-6 glass-card rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-4">Wallet Examples</h3>
      
      <div className="mb-4 p-4 bg-white/5 rounded-xl">
        <h4 className="text-lg font-semibold text-white mb-2">Wallet Info</h4>
        <p className="text-sm text-gray-400">Address: {address}</p>
        <p className="text-sm text-gray-400">STX Balance: {balance.stx.toFixed(4)}</p>
        <p className="text-sm text-gray-400">sBTC Balance: {balance.sbtc.toFixed(6)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleMintNFT}
          className="px-4 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Mint NFT
        </button>

        <button
          onClick={handleBuyNFT}
          className="px-4 py-3 bg-gradient-to-r from-stacks-500 to-bitcoin-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Buy NFT (sBTC)
        </button>

        <button
          onClick={handleListNFT}
          className="px-4 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          List NFT
        </button>

        <button
          onClick={handleCreateBattle}
          className="px-4 py-3 bg-gradient-to-r from-stacks-500 to-bitcoin-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Create Battle
        </button>

        <button
          onClick={handleStakeNFT}
          className="px-4 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all col-span-2"
        >
          Stake NFT (30 days)
        </button>
      </div>
    </div>
  )
}
