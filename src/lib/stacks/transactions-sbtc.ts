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
  tupleCV,
  createAssetInfo,
  createStandardPrincipal,
  createAddress,
  FungibleConditionCode,
  NonFungibleConditionCode,
  makeStandardSTXPostCondition,
  makeStandardFungiblePostCondition
} from '@stacks/transactions'
import { StacksNetwork, StacksTestnet, StacksMainnet } from '@stacks/network'
import { openContractCall } from '@stacks/connect'
import { useWalletStore } from '../stores/walletStore'
import { getContractAddress, getNetworkConfig, CONTRACT_FUNCTIONS } from '../contracts'

// Get network instance with proper configuration
export const getNetwork = (): StacksNetwork => {
  const { network } = useWalletStore.getState()
  const config = getNetworkConfig(network)
  
  if (network === 'mainnet') {
    return new StacksMainnet({ url: config.coreApiUrl })
  } else {
    return new StacksTestnet({ url: config.coreApiUrl })
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NFT MARKETPLACE TRANSACTIONS WITH sBTC SUPPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Mint a new NFT using SIP-009 compliant contract with sBTC integration
 */
export async function mintNFT(
  name: string,
  imageUri: string
): Promise<string> {
  try {
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet not connected')
    }

    const network = getNetwork()
    const [contractAddress, contractName] = getContractAddress('nftCore').split('.')

    const txOptions = {
      contractAddress,
      contractName,
      functionName: 'mint',
      functionArgs: [
        stringUtf8CV(name),
        stringUtf8CV(imageUri)
      ],
      network: network === 'testnet' ? 'testnet' : 'mainnet' as any,
      onFinish: (data: any) => {
        console.log('Mint NFT transaction finished:', data)
      },
      onCancel: () => {
        console.log('Mint NFT transaction cancelled')
      }
    }

    await openContractCall(txOptions)
    // Generate a mock transaction ID for demo purposes
    const mockTxId = `0x${Math.random().toString(16).substr(2, 40)}`
    return mockTxId
    
  } catch (error: any) {
    console.error('Error in mintNFT:', error)
    throw new Error(`Failed to mint NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * List NFT for sale with sBTC support
 */
export async function listNFT(
  tokenId: number,
  price: number,
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  try {
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet not connected')
    }

    const network = getNetwork()
    const [contractAddress, contractName] = getContractAddress('marketplace').split('.')

    const txOptions = {
      contractAddress,
      contractName,
      functionName: 'list-nft',
      functionArgs: [
        uintCV(tokenId),
        uintCV(price * 1000000), // Convert to microSTX/sBTC
        stringAsciiCV(paymentToken)
      ],
      network: network === 'testnet' ? 'testnet' : 'mainnet' as any,
      onFinish: (data: any) => {
        console.log('List NFT transaction finished:', data)
      },
      onCancel: () => {
        console.log('List NFT transaction cancelled')
      }
    }

    await openContractCall(txOptions)
    const mockTxId = `0x${Math.random().toString(16).substr(2, 40)}`
    return mockTxId
    
  } catch (error: any) {
    console.error('Error listing NFT:', error)
    throw new Error(`Failed to list NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Buy NFT with sBTC support
 */
export async function buyNFT(
  tokenId: number, 
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  try {
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet not connected')
    }

    const network = getNetwork()
    const [contractAddress, contractName] = getContractAddress('marketplace').split('.')

    const txOptions = {
      contractAddress,
      contractName,
      functionName: 'buy-nft',
      functionArgs: [
        uintCV(tokenId)
      ],
      network: network === 'testnet' ? 'testnet' : 'mainnet' as any,
      onFinish: (data: any) => {
        console.log('Buy NFT transaction finished:', data)
      },
      onCancel: () => {
        console.log('Buy NFT transaction cancelled')
      }
    }

    await openContractCall(txOptions)
    const mockTxId = `0x${Math.random().toString(16).substr(2, 40)}`
    return mockTxId
    
  } catch (error: any) {
    console.error('Error buying NFT:', error)
    throw new Error(`Failed to buy NFT: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Make offer with sBTC support
 */
export async function makeOffer(
  tokenId: number,
  amount: number,
  paymentToken: 'STX' | 'sBTC' = 'STX'
): Promise<string> {
  try {
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet not connected')
    }

    const network = getNetwork()
    const [contractAddress, contractName] = getContractAddress('marketplace').split('.')

    const txOptions = {
      contractAddress,
      contractName,
      functionName: 'make-offer',
      functionArgs: [
        uintCV(tokenId),
        uintCV(amount * 1000000), // Convert to microSTX/sBTC
        stringAsciiCV(paymentToken)
      ],
      network: network === 'testnet' ? 'testnet' : 'mainnet' as any,
      onFinish: (data: any) => {
        console.log('Make offer transaction finished:', data)
      },
      onCancel: () => {
        console.log('Make offer transaction cancelled')
      }
    }

    await openContractCall(txOptions)
    const mockTxId = `0x${Math.random().toString(16).substr(2, 40)}`
    return mockTxId
    
  } catch (error: any) {
    console.error('Error making offer:', error)
    throw new Error(`Failed to make offer: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Update Bitcoin price (Oracle function)
 */
export async function updateBitcoinPrice(
  price: number,
  confidence: number = 95
): Promise<string> {
  try {
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet not connected')
    }

    const network = getNetwork()
    const [contractAddress, contractName] = getContractAddress('bitcoinOracle').split('.')

    const txOptions = {
      contractAddress,
      contractName,
      functionName: 'update-bitcoin-price',
      functionArgs: [
        uintCV(price * 100000000), // Convert to satoshis
        uintCV(confidence)
      ],
      network: network === 'testnet' ? 'testnet' : 'mainnet' as any,
      onFinish: (data: any) => {
        console.log('Update Bitcoin price transaction finished:', data)
      },
      onCancel: () => {
        console.log('Update Bitcoin price transaction cancelled')
      }
    }

    await openContractCall(txOptions)
    const mockTxId = `0x${Math.random().toString(16).substr(2, 40)}`
    return mockTxId
    
  } catch (error: any) {
    console.error('Error updating Bitcoin price:', error)
    throw new Error(`Failed to update Bitcoin price: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Get Bitcoin price from oracle
 */
export async function getBitcoinPrice(): Promise<number> {
  try {
    const network = getNetwork()
    const [contractAddress, contractName] = getContractAddress('bitcoinOracle').split('.')
    
    // This would typically use a read-only call
    // For demo purposes, return a mock price
    return 45000 // Mock Bitcoin price in USD
    
  } catch (error: any) {
    console.error('Error getting Bitcoin price:', error)
    return 45000 // Fallback price
  }
}

/**
 * Convert sBTC to BTC price
 */
export async function convertSbtcToBtcPrice(sbtcAmount: number): Promise<number> {
  try {
    const btcPrice = await getBitcoinPrice()
    return (sbtcAmount * btcPrice) / 100000000 // sBTC has 8 decimals
    
  } catch (error: any) {
    console.error('Error converting sBTC to BTC price:', error)
    return sbtcAmount * 45000 // Fallback calculation
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// sBTC INTEGRATION FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Get sBTC balance for user
 */
export async function getSbtcBalance(address: string): Promise<number> {
  try {
    // This would typically use the sBTC contract to get balance
    // For demo purposes, return a mock balance
    return 0.5 // Mock sBTC balance
    
  } catch (error: any) {
    console.error('Error getting sBTC balance:', error)
    return 0
  }
}

/**
 * Deposit BTC to get sBTC
 */
export async function depositBtcToSbtc(btcAmount: number): Promise<string> {
  try {
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet not connected')
    }

    // This would typically interact with sBTC bridge
    // For demo purposes, simulate the transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockTxId = `0x${Math.random().toString(16).substr(2, 40)}`
    return mockTxId
    
  } catch (error: any) {
    console.error('Error depositing BTC to sBTC:', error)
    throw new Error(`Failed to deposit BTC: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Withdraw sBTC to get BTC
 */
export async function withdrawSbtcToBtc(sbtcAmount: number): Promise<string> {
  try {
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet not connected')
    }

    // This would typically interact with sBTC bridge
    // For demo purposes, simulate the transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockTxId = `0x${Math.random().toString(16).substr(2, 40)}`
    return mockTxId
    
  } catch (error: any) {
    console.error('Error withdrawing sBTC to BTC:', error)
    throw new Error(`Failed to withdraw sBTC: ${error.message || 'Unknown error'}`)
  }
}
