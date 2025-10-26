// BitcoinBazaar Contract Addresses
// Updated after successful testnet deployment

export const CONTRACT_ADDRESSES = {
  testnet: {
    'nft-core': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-core-simple',
    'marketplace': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace',
    'marketplace-sbtc-real': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace-sbtc-real',
    'bitcoin-oracle': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.bitcoin-oracle',
    'gaming-nft': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft-simple',
    'gaming-nft-sbtc-real': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft-sbtc-real',
    'nft-defi': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi',
    'nft-defi-sbtc-real': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi-sbtc-real',
    'analytics': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.analytics',
    'analytics-sbtc-real': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.analytics-sbtc-real',
    'governance': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.governance',
    'rewards': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.rewards',
    'sbtc-mock': 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.sbtc-mock',
  },
  mainnet: {
    'nft-core': 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-core',
    'marketplace': 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.marketplace',
    'bitcoin-oracle': 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.bitcoin-oracle',
  }
}

export const CONTRACT_FUNCTIONS = {
  'nft-core': {
    mint: 'mint-simple',
    transfer: 'transfer',
    transferTo: 'transfer-to',
    burn: 'burn',
    getOwner: 'get-owner',
    getTokenUri: 'get-token-uri',
    getSupply: 'get-supply',
    getLastTokenId: 'get-last-token-id',
    getNftMetadata: 'get-nft-metadata',
    getContractUri: 'get-contract-uri',
    setContractUri: 'set-contract-uri'
  },
  'marketplace': {
    listNft: 'list-nft',
    buyNft: 'buy-nft',
    makeOffer: 'make-offer',
    acceptOffer: 'accept-offer',
    cancelListing: 'cancel-listing',
    getListing: 'get-listing',
    getOffer: 'get-offer',
    getMarketplaceStats: 'get-marketplace-stats',
    setFeeRate: 'set-fee-rate'
  },
  'marketplace-sbtc-real': {
    listNft: 'list-nft',
    buyNft: 'buy-nft',
    makeOffer: 'make-offer',
    acceptOffer: 'accept-offer',
    cancelListing: 'cancel-listing',
    getListing: 'get-listing',
    getOffer: 'get-offer',
    getMarketplaceStats: 'get-marketplace-stats',
    setFeeRate: 'set-fee-rate'
  },
  'gaming-nft': {
    createBattle: 'create-battle',
    executeBattle: 'execute-battle',
    getBattle: 'get-battle',
    getBattleCounter: 'get-battle-counter'
  },
  'gaming-nft-sbtc-real': {
    createBattle: 'create-battle',
    executeBattle: 'execute-battle',
    getBattle: 'get-battle',
    getBattleHistory: 'get-battle-history',
    setBattleRules: 'set-battle-rules',
    getBattleRules: 'get-battle-rules'
  },
  'nft-defi': {
    stakeNft: 'stake-nft',
    unstakeNft: 'unstake-nft',
    borrowAgainstNft: 'borrow-against-nft',
    repayLoan: 'repay-loan',
    getStakeInfo: 'get-stake-info',
    getLoanInfo: 'get-loan-info',
    getRewards: 'get-rewards',
    claimRewards: 'claim-rewards'
  },
  'nft-defi-sbtc-real': {
    stakeNft: 'stake-nft',
    unstakeNft: 'unstake-nft',
    borrowAgainstNft: 'borrow-against-nft',
    repayLoan: 'repay-loan',
    getStakeInfo: 'get-stake-info',
    getLoanInfo: 'get-loan-info',
    getRewards: 'get-rewards',
    claimRewards: 'claim-rewards'
  },
  'bitcoin-oracle': {
    updateBitcoinPrice: 'update-bitcoin-price',
    getBitcoinPrice: 'get-bitcoin-price',
    getPriceWithTimestamp: 'get-price-with-timestamp',
    registerOracle: 'register-oracle',
    deactivateOracle: 'deactivate-oracle',
    getOracleInfo: 'get-oracle-info',
    isPriceStale: 'is-price-stale',
    getPriceHistory: 'get-price-history',
    convertSbtcToBtcPrice: 'convert-sbtc-to-btc-price',
    emergencyPriceUpdate: 'emergency-price-update'
  },
  'analytics': {
    trackEvent: 'track-event',
    getAnalytics: 'get-analytics',
    getEventHistory: 'get-event-history',
    setTrackingEnabled: 'set-tracking-enabled',
    getTrackingStatus: 'get-tracking-status'
  },
  'analytics-sbtc-real': {
    trackEvent: 'track-event',
    getAnalytics: 'get-analytics',
    getEventHistory: 'get-event-history',
    setTrackingEnabled: 'set-tracking-enabled',
    getTrackingStatus: 'get-tracking-status'
  },
  'governance': {
    propose: 'propose',
    vote: 'vote',
    execute: 'execute',
    getProposal: 'get-proposal',
    getProposals: 'get-proposals',
    getVotePower: 'get-vote-power',
    delegate: 'delegate',
    undelegate: 'undelegate'
  },
  'rewards': {
    claimRewards: 'claim-rewards',
    getRewards: 'get-rewards',
    getRewardHistory: 'get-reward-history',
    setRewardRate: 'set-reward-rate',
    getRewardRate: 'get-reward-rate'
  },
  'sbtc-mock': {
    mint: 'mint',
    transfer: 'transfer',
    burn: 'burn',
    getBalance: 'get-balance',
    getTotalSupply: 'get-total-supply'
  }
}

export const EXPLORER_URLS = {
  testnet: 'https://explorer.hiro.so/txid/',
  mainnet: 'https://explorer.hiro.so/txid/'
}

export const NETWORK_CONFIG = {
  testnet: {
    name: 'testnet',
    rpcUrl: 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so/?chain=testnet'
  },
  mainnet: {
    name: 'mainnet', 
    rpcUrl: 'https://api.hiro.so',
    explorerUrl: 'https://explorer.hiro.so/?chain=mainnet'
  }
}