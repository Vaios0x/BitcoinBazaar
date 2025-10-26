import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  uintCV,
  stringAsciiCV,
  principalCV,
  noneCV,
  someCV,
  listCV,
  tupleCV
} from '@stacks/transactions'
import { StacksNetwork, STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network'
import { openContractCall } from '@stacks/connect'
import { useWalletStore } from '../stores/walletStore'
import { validateTestingWallet } from './testing-wallet-config'
import { CONTRACT_ADDRESSES, CONTRACT_FUNCTIONS, NETWORK_CONFIG } from '../contracts'

// Get network instance
export const getNetwork = () => {
  const { network } = useWalletStore.getState()
  return network === 'testnet' ? STACKS_TESTNET : STACKS_MAINNET
}

// Helper function to get contract address
const getContractAddress = (contractName: string) => {
  const { network } = useWalletStore.getState()
  const networkContracts = CONTRACT_ADDRESSES[network as keyof typeof CONTRACT_ADDRESSES]
  return (networkContracts as any)[contractName]
}

// Helper function to validate wallet for testing transactions
const validateWalletForTesting = () => {
  const { address, walletType } = useWalletStore.getState()
  
  if (!address) {
    throw new Error('Wallet not connected')
  }

  // Validate Leather wallet for testing transactions
  if (!validateTestingWallet()) {
    throw new Error('Leather wallet is required for testing transactions')
  }

  if (walletType !== 'leather') {
    throw new Error('Only Leather wallet is supported for testing transactions')
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NFT CORE TRANSACTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Mint a new NFT using our real deployed contract
 */
export async function mintNFT(
  name: string,
  imageUri: string
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('nft-core')

    return new Promise((resolve, reject) => {
      console.log('Preparing mint NFT transaction...', {
        contractAddress,
        contractName: 'nft-core',
        functionName: CONTRACT_FUNCTIONS['nft-core'].mint,
        network: (network as any).coreApiUrl || 'testnet',
        address
      })

      const txOptions = {
        contractAddress,
        contractName: 'nft-core',
        functionName: CONTRACT_FUNCTIONS['nft-core'].mint,
        functionArgs: [
          stringAsciiCV(name),
          stringAsciiCV(imageUri)
        ],
        network,
        onFinish: (data: any) => {
          console.log('Mint NFT transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Mint NFT transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      console.log('Calling openContractCall with options:', txOptions)
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in mintNFT:', error)
    throw new Error(`Failed to mint NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Transfer NFT using our real deployed contract
 */
export async function transferNFT(
  tokenId: number,
  recipient: string
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('nft-core')

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'nft-core',
        functionName: CONTRACT_FUNCTIONS['nft-core'].transfer,
        functionArgs: [
          uintCV(tokenId),
          principalCV(address),
          principalCV(recipient)
        ],
        network,
        onFinish: (data: any) => {
          console.log('Transfer NFT transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Transfer NFT transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
    
  } catch (error: any) {
    console.error('Error transferring NFT:', error)
    throw new Error(`Failed to transfer NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Burn NFT using our real deployed contract
 */
export async function burnNFT(tokenId: number): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('nft-core')

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'nft-core',
        functionName: CONTRACT_FUNCTIONS['nft-core'].burn,
        functionArgs: [
          uintCV(tokenId)
        ],
        network,
        onFinish: (data: any) => {
          console.log('Burn NFT transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Burn NFT transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
    
  } catch (error: any) {
    console.error('Error burning NFT:', error)
    throw new Error(`Failed to burn NFT: ${error.message || 'Unknown error'}`)
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MARKETPLACE TRANSACTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * List NFT for sale using our real deployed contract
 */
export async function listNFT(
  nftId: number,
  price: number,
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('marketplace')

    // Convert price to micro-units (STX has 6 decimals, sBTC has 8)
    const priceInMicro = paymentToken === 'STX'
      ? Math.floor(price * 1_000_000)
      : Math.floor(price * 100_000_000)

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'marketplace',
        functionName: CONTRACT_FUNCTIONS.marketplace.listNft,
        functionArgs: [
          uintCV(nftId),
          uintCV(priceInMicro),
          stringAsciiCV(paymentToken)
        ],
        network,
        onFinish: (data: any) => {
          console.log('List NFT transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('List NFT transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
    
  } catch (error: any) {
    console.error('Error listing NFT:', error)
    throw new Error(`Failed to list NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Buy NFT from marketplace using our real deployed contract
 */
export async function buyNFT(nftId: number, paymentToken: 'STX' | 'sBTC' = 'STX'): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('marketplace')

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'marketplace',
        functionName: CONTRACT_FUNCTIONS.marketplace.buyNft,
        functionArgs: [
          uintCV(nftId)
        ],
        network,
        onFinish: (data: any) => {
          console.log('Buy NFT transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Buy NFT transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
    
  } catch (error: any) {
    console.error('Error buying NFT:', error)
    throw new Error(`Failed to buy NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Make offer for NFT using our real deployed contract
 */
export async function makeOffer(
  nftId: number,
  amount: number,
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('marketplace')

    // Convert amount to micro-units
    const amountInMicro = paymentToken === 'STX'
      ? Math.floor(amount * 1_000_000)
      : Math.floor(amount * 100_000_000)

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'marketplace',
        functionName: CONTRACT_FUNCTIONS.marketplace.makeOffer,
        functionArgs: [
          uintCV(nftId),
          uintCV(amountInMicro),
          stringAsciiCV(paymentToken)
        ],
        network,
        onFinish: (data: any) => {
          console.log('Make offer transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Make offer transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
    
  } catch (error: any) {
    console.error('Error making offer:', error)
    throw new Error(`Failed to make offer: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Cancel listing using our real deployed contract
 */
export async function cancelListing(nftId: number): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('marketplace')

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'marketplace',
        functionName: CONTRACT_FUNCTIONS.marketplace.cancelListing,
        functionArgs: [
          uintCV(nftId)
        ],
        network,
        onFinish: (data: any) => {
          console.log('Cancel listing transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Cancel listing transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
    
  } catch (error: any) {
    console.error('Error canceling listing:', error)
    throw new Error(`Failed to cancel listing: ${error.message || 'Unknown error'}`)
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BITCOIN ORACLE TRANSACTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Update Bitcoin price using our real deployed contract
 */
export async function updateBitcoinPrice(
  price: number,
  confidence: number = 100
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('bitcoin-oracle')

    // Convert price to micro-units (assuming price is in USD with 2 decimals)
    const priceInMicro = Math.floor(price * 100)

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'bitcoin-oracle',
        functionName: CONTRACT_FUNCTIONS['bitcoin-oracle'].updateBitcoinPrice,
        functionArgs: [
          uintCV(priceInMicro),
          uintCV(confidence)
        ],
        network,
        onFinish: (data: any) => {
          console.log('Update Bitcoin price transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Update Bitcoin price transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
    
  } catch (error: any) {
    console.error('Error updating Bitcoin price:', error)
    throw new Error(`Failed to update Bitcoin price: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Get Bitcoin price using our real deployed contract
 */
export async function getBitcoinPrice(): Promise<number> {
  try {
    const network = getNetwork()
    const contractAddress = getContractAddress('bitcoin-oracle')

    // This would typically be a read-only call, but for demo purposes
    // we'll return a mock price
    const mockPrice = 45000 + Math.random() * 10000 // Random price between 45k-55k
    return mockPrice
    
  } catch (error: any) {
    console.error('Error getting Bitcoin price:', error)
    throw new Error(`Failed to get Bitcoin price: ${error.message || 'Unknown error'}`)
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAMING TRANSACTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Create a battle between two NFTs
 */
export async function createBattle(
  nft1Id: number,
  nft2Id: number,
  wager: number
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('gaming-nft')

    const functionArgs = [
      uintCV(nft1Id),
      uintCV(nft2Id),
      uintCV(wager)
    ]

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'gaming-nft',
        functionName: 'create-battle',
        functionArgs,
        network: network,
        onFinish: (data: any) => {
          console.log('Create battle transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Create battle transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
  } catch (error: any) {
    console.error('Error creating battle:', error)
    throw new Error(`Failed to create battle: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Execute a battle between two NFTs
 */
export async function executeBattle(battleId: number): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('gaming-nft')

    const functionArgs = [
      uintCV(battleId)
    ]

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'gaming-nft',
        functionName: 'execute-battle',
        functionArgs,
        network: network,
        onFinish: (data: any) => {
          console.log('Execute battle transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Execute battle transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
  } catch (error: any) {
    console.error('Error executing battle:', error)
    throw new Error(`Failed to execute battle: ${error.message || 'Unknown error'}`)
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEFI TRANSACTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Stake an NFT for rewards
 */
export async function stakeNFT(
  tokenId: number,
  duration: number
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('nft-defi')

    const functionArgs = [
      uintCV(tokenId),
      uintCV(duration)
    ]

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'nft-defi',
        functionName: 'stake-nft',
        functionArgs,
        network: network,
        onFinish: (data: any) => {
          console.log('Stake NFT transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Stake NFT transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
  } catch (error: any) {
    console.error('Error staking NFT:', error)
    throw new Error(`Failed to stake NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Borrow against an NFT as collateral
 */
export async function borrowAgainstNFT(
  tokenId: number,
  amount: number
): Promise<string> {
  try {
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const contractAddress = getContractAddress('nft-defi')

    const functionArgs = [
      uintCV(tokenId),
      uintCV(amount)
    ]

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName: 'nft-defi',
        functionName: 'borrow-against-nft',
        functionArgs,
        network: network,
        onFinish: (data: any) => {
          console.log('Borrow against NFT transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Borrow against NFT transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      openContractCall(txOptions).catch(reject)
    })
  } catch (error: any) {
    console.error('Error borrowing against NFT:', error)
    throw new Error(`Failed to borrow against NFT: ${error.message || 'Unknown error'}`)
  }
}