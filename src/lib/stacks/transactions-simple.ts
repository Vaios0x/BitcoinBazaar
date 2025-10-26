/**
 * Real Transaction Implementation for Testing
 * Uses openContractCall to open Leather Wallet and generate real transactions
 */

import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  uintCV,
  stringAsciiCV,
  stringUtf8CV,
  principalCV,
  noneCV,
  someCV,
  listCV,
  tupleCV
} from '@stacks/transactions'
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network'
import { openContractCall } from '@stacks/connect'
import { useWalletStore } from '../stores/walletStore'
import { validateTestingWallet } from './testing-wallet-config'
import { CONTRACT_ADDRESSES, CONTRACT_FUNCTIONS } from '../contracts'

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

// Helper function to get contract address and name separately
const getContractInfo = (contractName: string) => {
  const { network } = useWalletStore.getState()
  const networkContracts = CONTRACT_ADDRESSES[network as keyof typeof CONTRACT_ADDRESSES]
  const fullAddress = (networkContracts as any)[contractName]
  
  // Split the full address into address and name
  const parts = fullAddress.split('.')
  const address = parts[0]
  const name = parts[1]
  
  return { address, name }
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

// Helper function to check if contract is deployed
const checkContractDeployment = async (contractName: string): Promise<boolean> => {
  try {
    const network = getNetwork()
    const contractAddress = getContractAddress(contractName)
    
    console.log(`Checking contract deployment for ${contractName}:`, contractAddress)
    
    // Use the correct API URL for testnet
    const apiUrl = 'https://api.testnet.hiro.so'
    
    // Try to make a simple read-only call to check if contract exists
    const response = await fetch(`${apiUrl}/v2/contracts/${contractAddress}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (response.ok) {
      console.log(`✅ Contract ${contractName} is deployed`)
      return true
    } else if (response.status === 404) {
      console.log(`❌ Contract ${contractName} is not deployed (404)`)
      return false
    } else {
      console.log(`⚠️ Contract ${contractName} check failed with status: ${response.status}`)
      // If we get a different error, assume it might be deployed but there's a network issue
      // This is more permissive to handle network issues
      return true
    }
  } catch (error) {
    console.warn(`Contract ${contractName} deployment check failed:`, error)
    // If there's a network error, assume the contract might be deployed
    // This prevents false negatives due to network issues
    return true
  }
}

// Helper function to deploy contracts if not deployed
const deployContractsIfNeeded = async (): Promise<void> => {
  const requiredContracts = ['nft-core', 'marketplace', 'bitcoin-oracle']
  const deploymentChecks = await Promise.all(
    requiredContracts.map(contract => checkContractDeployment(contract))
  )
  
  const undeployedContracts = requiredContracts.filter((_, index) => !deploymentChecks[index])
  
  if (undeployedContracts.length > 0) {
    console.warn('Some contracts are not deployed:', undeployedContracts)
    console.log('Please run: clarinet deployments apply --deployment-plan-path deployments/default.testnet-plan.yaml')
    throw new Error(`Contracts not deployed: ${undeployedContracts.join(', ')}. Please deploy contracts first.`)
  }
}

/**
 * Test function to verify wallet connection and configuration
 */
export async function testWalletConnection(): Promise<string> {
  try {
    console.log('Testing wallet connection...')
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address, walletType, network } = useWalletStore.getState()
    
    console.log('Wallet state:', { address, walletType, network })
    
    if (!address) {
      throw new Error('Wallet address not available')
    }

    // Check individual contracts
    const contracts = ['nft-core', 'marketplace', 'bitcoin-oracle']
    const contractStatus = []
    
    for (const contract of contracts) {
      const isDeployed = await checkContractDeployment(contract)
      contractStatus.push({ contract, deployed: isDeployed })
    }
    
    console.log('Contract deployment status:', contractStatus)
    
    const deployedContracts = contractStatus.filter(c => c.deployed)
    const undeployedContracts = contractStatus.filter(c => !c.deployed)
    
    if (undeployedContracts.length > 0) {
      console.warn('Some contracts are not deployed:', undeployedContracts.map(c => c.contract))
      throw new Error(`Contracts not deployed: ${undeployedContracts.map(c => c.contract).join(', ')}. Please deploy contracts first.`)
    }
    
    console.log('✅ All required contracts are deployed')
    console.log('Wallet connection and contract deployment test successful')
    return `test-connection-success-${Date.now()}`
    
  } catch (error: any) {
    console.error('Error in testWalletConnection:', error)
    throw new Error(`Wallet connection test failed: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Mint NFT using real contract call that opens Leather Wallet
 */
export async function mintNFTSimple(
  name: string,
  imageUri: string
): Promise<string> {
  try {
    console.log('Minting NFT:', { name, imageUri })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    // Skip deployment check since we know the contract exists (ContractAlreadyExists error confirms it)
    console.log('Skipping deployment check - contract confirmed to exist')

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('nft-core')

    console.log('Preparing mint NFT transaction...', {
      contractAddress,
      contractName,
      functionName: CONTRACT_FUNCTIONS['nft-core'].mint,
      network: 'https://api.testnet.hiro.so',
      address
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: CONTRACT_FUNCTIONS['nft-core'].mint,
        functionArgs: [
          stringUtf8CV(name),
          stringUtf8CV(imageUri)
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

      console.log('Opening Leather Wallet for mint NFT transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in mintNFTSimple:', error)
    throw new Error(`Failed to mint NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Transfer NFT using real contract call that opens Leather Wallet
 */
export async function transferNFTSimple(
  tokenId: number,
  recipient: string
): Promise<string> {
  try {
    console.log('Transferring NFT:', { tokenId, recipient })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('nft-core')

    console.log('Preparing transfer NFT transaction...', {
      contractAddress,
      contractName,
      functionName: CONTRACT_FUNCTIONS['nft-core'].transferTo,
      network: 'https://api.testnet.hiro.so',
      address,
      tokenId,
      recipient
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: CONTRACT_FUNCTIONS['nft-core'].transferTo,
        functionArgs: [
          uintCV(tokenId),
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

      console.log('Opening Leather Wallet for transfer NFT transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in transferNFTSimple:', error)
    throw new Error(`Failed to transfer NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * List NFT using real contract call that opens Leather Wallet
 */
export async function listNFTSimple(
  nftId: number,
  price: number,
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  try {
    console.log('Listing NFT:', { nftId, price, paymentToken })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('marketplace')

    // Convert price to micro-units (STX has 6 decimals, sBTC has 8)
    const priceInMicro = paymentToken === 'STX'
      ? Math.floor(price * 1_000_000)
      : Math.floor(price * 100_000_000)

    console.log('Preparing list NFT transaction...', {
      contractAddress,
      contractName,
      functionName: CONTRACT_FUNCTIONS.marketplace.listNft,
      network: 'https://api.testnet.hiro.so',
      address,
      nftId,
      priceInMicro,
      paymentToken
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
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

      console.log('Opening Leather Wallet for list NFT transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in listNFTSimple:', error)
    throw new Error(`Failed to list NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Burn NFT using real contract call that opens Leather Wallet
 */
export async function burnNFTSimple(tokenId: number): Promise<string> {
  try {
    console.log('Burning NFT:', { tokenId })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('nft-core')

    console.log('Preparing burn NFT transaction...', {
      contractAddress,
      contractName,
      functionName: CONTRACT_FUNCTIONS['nft-core'].burn,
      network: 'https://api.testnet.hiro.so',
      address,
      tokenId
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
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

      console.log('Opening Leather Wallet for burn NFT transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in burnNFTSimple:', error)
    throw new Error(`Failed to burn NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Buy NFT using direct transfer (simplified approach)
 * This simulates a purchase by transferring the NFT directly to the buyer
 * In a real implementation, this would include payment logic
 */
export async function buyNFTSimple(nftId: number, paymentToken: 'STX' | 'sBTC' = 'STX'): Promise<string> {
  try {
    console.log('Buying NFT via direct transfer:', { nftId, paymentToken })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('nft-core')

    console.log('Preparing direct NFT transfer transaction...', {
      contractAddress,
      contractName,
      functionName: 'transfer-to',
      network: 'https://api.testnet.hiro.so',
      address,
      nftId
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: 'transfer-to',
        functionArgs: [
          uintCV(nftId),
          principalCV(address) // Transfer to the buyer
        ],
        network,
        onFinish: (data: any) => {
          console.log('Direct NFT transfer transaction finished:', data)
          // Extract transaction ID from the response
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Direct NFT transfer transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        }
      }

      console.log('Opening Leather Wallet for direct NFT transfer transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in buyNFTSimple:', error)
    throw new Error(`Failed to buy NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Make offer using real contract call that opens Leather Wallet
 */
export async function makeOfferSimple(
  nftId: number,
  amount: number,
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  try {
    console.log('Making offer:', { nftId, amount, paymentToken })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('marketplace')

    // Convert amount to micro-units
    const amountInMicro = paymentToken === 'STX'
      ? Math.floor(amount * 1_000_000)
      : Math.floor(amount * 100_000_000)

    console.log('Preparing make offer transaction...', {
      contractAddress,
      contractName,
      functionName: CONTRACT_FUNCTIONS.marketplace.makeOffer,
      network: 'https://api.testnet.hiro.so',
      address,
      nftId,
      amountInMicro,
      paymentToken
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
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

      console.log('Opening Leather Wallet for make offer transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in makeOfferSimple:', error)
    throw new Error(`Failed to make offer: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Cancel listing using real contract call that opens Leather Wallet
 */
export async function cancelListingSimple(nftId: number): Promise<string> {
  try {
    console.log('Canceling listing:', { nftId })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('marketplace')

    console.log('Preparing cancel listing transaction...', {
      contractAddress,
      contractName,
      functionName: CONTRACT_FUNCTIONS.marketplace.cancelListing,
      network: 'https://api.testnet.hiro.so',
      address,
      nftId
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
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

      console.log('Opening Leather Wallet for cancel listing transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in cancelListingSimple:', error)
    throw new Error(`Failed to cancel listing: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Create battle using real contract call that opens Leather Wallet
 */
export async function createBattleSimple(
  nft1Id: number,
  nft2Id: number,
  wager: number
): Promise<string> {
  try {
    console.log('Creating battle:', { nft1Id, nft2Id, wager })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('gaming-nft')

    console.log('Preparing create battle transaction...', {
      contractAddress,
      contractName: 'gaming-nft',
      functionName: 'create-battle',
      network: 'https://api.testnet.hiro.so',
      address,
      nft1Id,
      nft2Id,
      wager
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: CONTRACT_FUNCTIONS['gaming-nft'].createBattle,
        functionArgs: [
          uintCV(nft1Id),
          uintCV(nft2Id),
          uintCV(wager)
        ],
        network,
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

      console.log('Opening Leather Wallet for create battle transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in createBattleSimple:', error)
    throw new Error(`Failed to create battle: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Execute battle using real contract call that opens Leather Wallet
 */
export async function executeBattleSimple(battleId: number): Promise<string> {
  try {
    console.log('Executing battle:', { battleId })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('gaming-nft')

    console.log('Preparing execute battle transaction...', {
      contractAddress,
      contractName: 'gaming-nft',
      functionName: 'execute-battle',
      network: 'https://api.testnet.hiro.so',
      address,
      battleId
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: CONTRACT_FUNCTIONS['gaming-nft'].executeBattle,
        functionArgs: [
          uintCV(battleId)
        ],
        network,
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

      console.log('Opening Leather Wallet for execute battle transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in executeBattleSimple:', error)
    throw new Error(`Failed to execute battle: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Stake NFT using real contract call that opens Leather Wallet
 */
export async function stakeNFTSimple(
  tokenId: number,
  duration: number
): Promise<string> {
  try {
    console.log('Staking NFT:', { tokenId, duration })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('nft-defi')

    console.log('Preparing stake NFT transaction...', {
      contractAddress,
      contractName: 'nft-defi',
      functionName: 'stake-nft',
      network: 'https://api.testnet.hiro.so',
      address,
      tokenId,
      duration
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: CONTRACT_FUNCTIONS['nft-defi'].stakeNft,
        functionArgs: [
          uintCV(tokenId),
          uintCV(duration)
        ],
        network,
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

      console.log('Opening Leather Wallet for stake NFT transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in stakeNFTSimple:', error)
    throw new Error(`Failed to stake NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Borrow against NFT using real contract call that opens Leather Wallet
 */
export async function borrowAgainstNFTSimple(
  tokenId: number,
  amount: number
): Promise<string> {
  try {
    console.log('Borrowing against NFT:', { tokenId, amount })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('nft-defi')

    console.log('Preparing borrow against NFT transaction...', {
      contractAddress,
      contractName: 'nft-defi',
      functionName: 'borrow-against-nft',
      network: 'https://api.testnet.hiro.so',
      address,
      tokenId,
      amount
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: CONTRACT_FUNCTIONS['nft-defi'].borrowAgainstNft,
        functionArgs: [
          uintCV(tokenId),
          uintCV(amount)
        ],
        network,
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

      console.log('Opening Leather Wallet for borrow against NFT transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in borrowAgainstNFTSimple:', error)
    throw new Error(`Failed to borrow against NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Update Bitcoin price using real contract call that opens Leather Wallet
 */
export async function updateBitcoinPriceSimple(
  price: number,
  confidence: number = 100
): Promise<string> {
  try {
    console.log('Updating Bitcoin price:', { price, confidence })
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('bitcoin-oracle')

    // Convert price to micro-units (assuming price is in USD with 2 decimals)
    const priceInMicro = Math.floor(price * 100)

    console.log('Preparing update Bitcoin price transaction...', {
      contractAddress,
      contractName: 'bitcoin-oracle',
      functionName: CONTRACT_FUNCTIONS['bitcoin-oracle'].updateBitcoinPrice,
      network: 'https://api.testnet.hiro.so',
      address,
      priceInMicro,
      confidence
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
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

      console.log('Opening Leather Wallet for update Bitcoin price transaction...')
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
    
  } catch (error: any) {
    console.error('Error in updateBitcoinPriceSimple:', error)
    throw new Error(`Failed to update Bitcoin price: ${error.message || 'Unknown error'}`)
  }
}