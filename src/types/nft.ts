export interface NFT {
  id: number
  name: string
  description: string
  imageUri: string
  price: number
  paymentToken: 'STX' | 'sBTC'
  creator: string
  royaltyPercent: number
  collectionName?: string
  collectionId?: number
  isDynamicPricing?: boolean
  mintedAtBitcoinBlock?: number
  lastSalePrice?: number
  usdPrice?: number
  attributes?: NFTAttribute[]
  transferHistory?: TransferRecord[]
  // Transaction info for newly created NFTs
  transactionHash?: string
  explorerUrl?: string
  createdAt?: string
}

export interface NFTAttribute {
  trait: string
  value: string
  rarity: number
}

export interface TransferRecord {
  from: string
  to: string
  price: number
  block: number
  paymentToken: string
}

export interface Collection {
  id: number
  name: string
  description: string
  creator: string
  bannerUri: string
  verified: boolean
  totalNfts: number
  floorPrice: number
  totalVolume: number
}

export interface Auction {
  id: number
  nftId: number
  seller: string
  startingPrice: number
  currentPrice: number
  highestBidder?: string
  endTime: number
  auctionType: 'english' | 'dutch'
  paymentToken: 'STX' | 'sBTC'
  status: 'active' | 'ended' | 'cancelled'
}

export interface Offer {
  id: number
  nftId: number
  offerer: string
  price: number
  paymentToken: 'STX' | 'sBTC'
  expiryTime: number
  status: 'active' | 'accepted' | 'cancelled'
}
