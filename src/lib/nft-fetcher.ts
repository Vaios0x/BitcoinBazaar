/**
 * NFT Data Fetching Functions
 * Functions to get NFTs from the deployed contract
 */

import { fetchCallReadOnlyFunction, cvToValue, uintCV } from '@stacks/transactions'
import { STACKS_TESTNET } from '@stacks/network'
import { CONTRACT_ADDRESSES } from '@/lib/contracts'
import type { NFT } from '@/types/nft'

// Get network instance
const getNetwork = () => {
  return STACKS_TESTNET
}

// Helper function to get contract address
const getContractAddress = (contractName: string) => {
  const networkContracts = CONTRACT_ADDRESSES.testnet
  return (networkContracts as any)[contractName]
}

/**
 * Get all NFTs from the contract
 */
export async function getAllNFTs(): Promise<NFT[]> {
  try {
    // Import nftStorage to get stored NFTs first
    const { nftStorage } = await import('@/lib/nft-storage')
    
    // Get stored NFTs first (these include newly created ones with prices)
    const storedNFTs = nftStorage.getStoredNFTs()
    
    // If we have stored NFTs, use them directly
    if (storedNFTs.length > 0) {
      console.log(`Using ${storedNFTs.length} stored NFTs`)
      return storedNFTs
    }
    
    // Fallback to contract NFTs if no stored NFTs
    const network = getNetwork()
    const contractAddress = getContractAddress('nft-core')
    
    console.log('Fetching NFTs from contract:', contractAddress)
    
    // First, get the last token ID to know how many NFTs exist
    const lastTokenIdResult = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName: 'nft-core-simple',
      functionName: 'get-last-token-id',
      functionArgs: [],
      network,
      senderAddress: contractAddress
    })
    
    console.log('Last token ID result:', lastTokenIdResult)
    
    const lastTokenId = cvToValue(lastTokenIdResult)
    console.log('Last token ID:', lastTokenId)
    
    if (!lastTokenId || lastTokenId === 0) {
      console.log('No NFTs found in contract')
      return []
    }
    
    // Get metadata for each NFT
    const nfts: NFT[] = []
    
    for (let i = 1; i <= lastTokenId; i++) {
      try {
        const metadataResult = await fetchCallReadOnlyFunction({
          contractAddress,
          contractName: 'nft-core-simple',
          functionName: 'get-nft-metadata',
          functionArgs: [uintCV(i)],
          network,
          senderAddress: contractAddress
        })
        
        console.log(`Metadata for token ${i}:`, metadataResult)
        
        const metadata = cvToValue(metadataResult)
        console.log(`Converted metadata for token ${i}:`, metadata)
        
        if (metadata) {
          // Try to get the real transaction hash
          const realTxHash = await getNFTTransactionHash(i)
          
          // Check if NFT is listed in marketplace
          const listingInfo = await getNFTListingInfo(i)
          
          // Generate fallback image
          const imageId = Math.floor(Math.random() * 1000) + 1
          const fallbackImageUri = `https://images.unsplash.com/photo-${1500000000000 + imageId}?w=400&h=400&fit=crop&crop=center&auto=format&q=80`
          
          const nft: NFT = {
            id: i,
            name: metadata.name || `BitcoinBazaar NFT #${i}`,
            description: `NFT creado en BitcoinBazaar - Token ID: ${i}`,
            imageUri: metadata['image-uri'] || fallbackImageUri,
            price: listingInfo.isListed ? listingInfo.price || 0 : 0, // Use real price if listed, 0 if not
            paymentToken: (listingInfo.paymentToken as 'STX' | 'sBTC') || 'STX',
            creator: metadata.owner || 'Unknown',
            royaltyPercent: 10,
            collectionName: 'BitcoinBazaar Collection',
            collectionId: 1,
            isDynamicPricing: false,
            mintedAtBitcoinBlock: metadata['created-at'] || 0,
            lastSalePrice: undefined,
            usdPrice: listingInfo.isListed && listingInfo.price ? listingInfo.price * 0.5 : undefined,
            createdAt: new Date().toISOString(),
            // Use real transaction hash if available
            transactionHash: realTxHash || `0x${i.toString(16).padStart(64, '0')}`,
            explorerUrl: realTxHash 
              ? `https://explorer.stacks.co/txid/${realTxHash}?chain=testnet`
              : `https://explorer.stacks.co/txid/0x${i.toString(16).padStart(64, '0')}?chain=testnet`
          }
          
          nfts.push(nft)
        }
      } catch (tokenError) {
        console.error(`Error fetching metadata for token ${i}:`, tokenError)
        // Continue with next token
      }
    }
    
    console.log('All NFTs fetched:', nfts)
    return nfts
    
  } catch (error) {
    console.error('Error fetching NFTs from contract:', error)
    
    // Return mock data as fallback for now
    return [
      {
        id: 1,
        name: 'BitcoinBazaar NFT #1',
        description: 'Primer NFT creado en BitcoinBazaar',
        imageUri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
        price: 0,
        paymentToken: 'STX',
        creator: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR',
        royaltyPercent: 10,
        collectionName: 'BitcoinBazaar Collection',
        collectionId: 1,
        isDynamicPricing: false,
        mintedAtBitcoinBlock: 0,
        lastSalePrice: undefined,
        usdPrice: undefined,
        createdAt: new Date().toISOString(),
        transactionHash: 'mock-tx-hash',
        explorerUrl: 'https://explorer.stacks.co/txid/mock-tx-hash?chain=testnet'
      }
    ]
  }
}

/**
 * Get NFT by ID from the contract
 */
export async function getNFTById(id: number): Promise<NFT | null> {
  try {
    const network = getNetwork()
    const contractAddress = getContractAddress('nft-core')
    
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName: 'nft-core-simple',
      functionName: 'get-nft-metadata',
      functionArgs: [uintCV(id)],
      network,
      senderAddress: contractAddress
    })
    
    const metadata = cvToValue(result)
    
    if (!metadata) {
      return null
    }
    
    // Check if NFT is listed in marketplace
    const listingInfo = await getNFTListingInfo(id)
    
    return {
      id,
      name: metadata.name || `BitcoinBazaar NFT #${id}`,
      description: `NFT creado en BitcoinBazaar - Token ID: ${id}`,
      imageUri: metadata['image-uri'] || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
      price: listingInfo.isListed ? listingInfo.price || 0 : 0,
      paymentToken: (listingInfo.paymentToken as 'STX' | 'sBTC') || 'STX',
      creator: metadata.owner || 'Unknown',
      royaltyPercent: 10,
      collectionName: 'BitcoinBazaar Collection',
      collectionId: 1,
      isDynamicPricing: false,
      mintedAtBitcoinBlock: metadata['created-at'] || 0,
      lastSalePrice: undefined,
      usdPrice: listingInfo.isListed && listingInfo.price ? listingInfo.price * 0.5 : undefined,
      createdAt: new Date().toISOString(),
      transactionHash: `0x${id.toString(16).padStart(64, '0')}`,
      explorerUrl: `https://explorer.stacks.co/txid/0x${id.toString(16).padStart(64, '0')}?chain=testnet`
    }
    
  } catch (error) {
    console.error('Error fetching NFT by ID:', error)
    return null
  }
}

/**
 * Get transaction hash for a specific NFT by looking up mint transactions
 */
export async function getNFTTransactionHash(tokenId: number): Promise<string | null> {
  try {
    const contractAddress = getContractAddress('nft-core')
    
    // Use Stacks API to get contract events
    const apiUrl = 'https://api.testnet.hiro.so'
    const response = await fetch(`${apiUrl}/v2/contracts/${contractAddress}/nft-core-simple/events`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (response.ok) {
      const events = await response.json()
      console.log('Contract events:', events)
      
      // Look for mint events for this token ID
      const mintEvents = events.events?.filter((event: any) => 
        event.event_type === 'nft_mint_event' && 
        event.nft_mint_event?.token_id === tokenId.toString()
      )
      
      if (mintEvents && mintEvents.length > 0) {
        return mintEvents[0].tx_id
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching transaction hash:', error)
    return null
  }
}

/**
 * Get NFTs created by a specific address
 */
export async function getNFTsByCreator(creatorAddress: string): Promise<NFT[]> {
  try {
    const allNFTs = await getAllNFTs()
    return allNFTs.filter(nft => nft.creator === creatorAddress)
  } catch (error) {
    console.error('Error fetching NFTs by creator:', error)
    return []
  }
}

/**
 * Check if NFT is listed in marketplace and get its price
 * Now properly checks stored NFTs for listing information
 */
async function getNFTListingInfo(tokenId: number): Promise<{ isListed: boolean; price?: number; paymentToken?: string }> {
  try {
    // Import nftStorage to check stored NFTs
    const { nftStorage } = await import('@/lib/nft-storage')
    
    // Get all stored NFTs
    const storedNFTs = nftStorage.getStoredNFTs()
    
    // Find the NFT by token ID or by checking if it's a recently created NFT
    // For NFTs from contract, use tokenId; for newly created NFTs, check all stored NFTs
    let nft = storedNFTs.find(storedNFT => storedNFT.id === tokenId)
    
    // If not found by exact ID, check if this tokenId corresponds to a contract NFT
    // that might have been created recently and stored locally
    if (!nft) {
      // Look for NFTs that might be from the contract but stored locally
      nft = storedNFTs.find(storedNFT => 
        storedNFT.id === tokenId || 
        (storedNFT.transactionHash && storedNFT.price > 0)
      )
    }
    
    if (nft && nft.price > 0) {
      console.log(`NFT ${tokenId} is listed with price ${nft.price} ${nft.paymentToken}`)
      return { 
        isListed: true, 
        price: nft.price, 
        paymentToken: nft.paymentToken 
      }
    }
    
    console.log(`NFT ${tokenId} is not listed`)
    return { isListed: false }
  } catch (error) {
    console.warn(`Error checking listing for token ${tokenId}:`, error)
    return { isListed: false }
  }
}
