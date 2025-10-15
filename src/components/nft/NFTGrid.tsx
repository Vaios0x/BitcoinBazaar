'use client'

import { NFTCard } from './NFTCard'
import type { NFT } from '@/types/nft'

interface NFTGridProps {
  nfts: NFT[]
  showQuickBuy?: boolean
  columns?: number
  onAddToCart?: (nft: NFT) => void
}

export function NFTGrid({ nfts, showQuickBuy = false, columns = 4, onAddToCart }: NFTGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  }

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6`}>
      {nfts.map((nft, index) => (
        <NFTCard
          key={nft.id}
          nft={nft}
          showQuickBuy={showQuickBuy}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
