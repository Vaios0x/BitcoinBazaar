/**
 * BitcoinBazaar - Test Configuration
 * Configuración centralizada para testing
 */

export const TEST_CONFIG = {
  // Red de testing
  network: {
    name: 'testnet',
    coreApiUrl: 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so',
    faucetUrl: 'https://explorer.hiro.so/faucet?chain=testnet'
  },

  // Contratos desplegados (REALES)
  contracts: {
    nftCore: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.nft-core',
    marketplace: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.marketplace',
    bitcoinOracle: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.bitcoin-oracle',
    gamingNft: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.gaming-nft',
    nftDefi: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.nft-defi'
  },

  // Configuración de testing
  testing: {
    minStxBalance: 1.0, // Mínimo STX necesario para testing
    testTimeout: 30000, // 30 segundos timeout por test
    retryAttempts: 3, // Reintentos en caso de fallo
    delayBetweenTests: 2000 // 2 segundos entre tests
  },

  // Datos de prueba
  testData: {
    nftName: 'Test NFT Bitcoin',
    nftDescription: 'NFT creado durante testing de integración',
    nftImageUri: 'https://ipfs.io/ipfs/QmTestHash123',
    nftRoyalty: 10, // 10%
    testPrice: 1.5, // 1.5 STX
    testWager: 0.5, // 0.5 sBTC
    testBorrowAmount: 0.25, // 0.25 sBTC
    testLockPeriod: 4320, // 30 días en bloques
    testBitcoinPrice: 45000, // USD
    testBlockHeight: 820000
  },

  // Funciones de contrato
  contractFunctions: {
    nftCore: {
      mint: 'mint-nft',
      transfer: 'transfer',
      burn: 'burn-nft'
    },
    marketplace: {
      list: 'list-nft',
      buy: 'buy-nft',
      cancel: 'cancel-listing',
      offer: 'make-offer',
      acceptOffer: 'accept-offer'
    },
    bitcoinOracle: {
      updatePrice: 'update-bitcoin-price',
      getPrice: 'get-bitcoin-price'
    },
    gamingNft: {
      createBattle: 'create-battle',
      executeBattle: 'execute-battle',
      claimReward: 'claim-battle-reward'
    },
    nftDefi: {
      stake: 'stake-nft',
      unstake: 'unstake-nft',
      borrow: 'borrow-against-nft',
      repay: 'repay-loan'
    }
  }
} as const

export type TestConfig = typeof TEST_CONFIG
export type ContractName = keyof typeof TEST_CONFIG.contracts
export type NetworkName = keyof typeof TEST_CONFIG.network
