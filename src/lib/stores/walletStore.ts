import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  AppConfig,
  UserSession,
  showConnect,
  disconnect as stacksDisconnect
} from '@stacks/connect'
// import { StacksNetwork } from '@stacks/network'
import {
  cvToJSON,
  principalCV,
  makeContractCall,
  broadcastTransaction,
  AnchorMode
} from '@stacks/transactions'

// Wallet types
export type WalletType = 'xverse' | 'leather' | null

export type NetworkType = 'testnet' | 'mainnet'

interface WalletBalance {
  stx: number
  sbtc: number
  btc: number
}

interface WalletState {
  // Connection state
  isConnected: boolean
  address: string | null
  walletType: WalletType
  network: NetworkType

  // User data
  balance: WalletBalance
  userData: any | null

  // Loading states
  isLoading: boolean
  isBalanceLoading: boolean

  // Actions
  connect: (walletType: WalletType) => Promise<void>
  connectXverse: () => Promise<void>
  connectLeather: () => Promise<void>
  disconnect: () => void
  switchNetwork: (network: NetworkType) => void
  refreshBalance: () => Promise<void>
  signTransaction: (contractCall: any) => Promise<string>
}

// App config for Stacks Connect
const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      // Initial state
      isConnected: false,
      address: null,
      walletType: null,
      network: 'testnet',
      balance: {
        stx: 0,
        sbtc: 0,
        btc: 0
      },
      userData: null,
      isLoading: false,
      isBalanceLoading: false,

      // Connect wallet
      connect: async (walletType: WalletType) => {
        set({ isLoading: true })
        
        try {
          if (walletType === 'xverse') {
            await get().connectXverse()
          } else if (walletType === 'leather') {
            await get().connectLeather()
          }
        } catch (error) {
          console.error('Connection failed:', error)
          set({ isLoading: false })
          throw error
        }
      },

      // Xverse connection
      connectXverse: async () => {
        const { network } = get()
        
        showConnect({
          appDetails: {
            name: 'BitcoinBazaar',
            icon: window.location.origin + '/logo.png'
          },
          redirectTo: '/',
          onFinish: () => {
            if (userSession.isUserSignedIn()) {
              const userData = userSession.loadUserData()
              const address = network === 'testnet' 
                ? userData.profile.stxAddress.testnet
                : userData.profile.stxAddress.mainnet
              
              set({
                isConnected: true,
                address,
                walletType: 'xverse',
                userData,
                isLoading: false
              })
              
              // Fetch balances
              get().refreshBalance()
            }
          },
          onCancel: () => {
            set({ isLoading: false })
          },
          userSession
        })
      },

      // Leather connection
      connectLeather: async () => {
        const { network } = get()
        
        // Leather uses same showConnect but can be detected
        showConnect({
          appDetails: {
            name: 'BitcoinBazaar',
            icon: window.location.origin + '/logo.png'
          },
          redirectTo: '/',
          onFinish: () => {
            if (userSession.isUserSignedIn()) {
              const userData = userSession.loadUserData()
              const address = network === 'testnet'
                ? userData.profile.stxAddress.testnet
                : userData.profile.stxAddress.mainnet
              
              set({
                isConnected: true,
                address,
                walletType: 'leather',
                userData,
                isLoading: false
              })
              
              get().refreshBalance()
            }
          },
          onCancel: () => {
            set({ isLoading: false })
          },
          userSession
        })
      },

      // Disconnect wallet
      disconnect: () => {
        stacksDisconnect()
        userSession.signUserOut()
        set({
          isConnected: false,
          address: null,
          walletType: null,
          balance: { stx: 0, sbtc: 0, btc: 0 },
          userData: null
        })
      },

      // Switch network
      switchNetwork: (network: NetworkType) => {
        set({ network })
        
        // Re-fetch balances for new network
        if (get().isConnected) {
          get().refreshBalance()
        }
      },

      // Refresh balances
      refreshBalance: async () => {
        const { address, network } = get()
        if (!address) return

        set({ isBalanceLoading: true })

        try {
          const apiUrl = network === 'testnet'
            ? 'https://api.testnet.hiro.so'
            : 'https://api.hiro.so'

          // Get STX balance
          const stxResponse = await fetch(
            `${apiUrl}/extended/v1/address/${address}/balances`
          )
          
          if (!stxResponse.ok) {
            throw new Error(`HTTP error! status: ${stxResponse.status}`)
          }
          
          const stxData = await stxResponse.json()
          const stxBalance = parseInt(stxData.stx?.balance || '0') / 1_000_000

          // Get sBTC balance
          let sbtcBalance = 0
          try {
            // Get sBTC balance from the same API response
            if (stxData.fungible_tokens) {
              // Try different possible sBTC contract addresses
              const sbtcContracts = [
                'SP000000000000000000002Q6VF78.bns::xbtc',
                'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft::xbtc',
                'SP000000000000000000002Q6VF78.bns::xbtc'
              ]
              
              for (const contract of sbtcContracts) {
                const sbtcToken = stxData.fungible_tokens[contract]
                if (sbtcToken && sbtcToken.balance) {
                  sbtcBalance = parseInt(sbtcToken.balance) / 100_000_000 // sBTC has 8 decimals
                  break
                }
              }
              
              // If no sBTC found in fungible tokens, use simulated balance for testnet
              if (sbtcBalance === 0 && network === 'testnet') {
                sbtcBalance = 6.0 // Simulated balance for testnet
              }
            }
          } catch (sbtcError) {
            console.warn('sBTC balance fetch failed:', sbtcError)
            // Fallback: set to 6 for testnet
            if (network === 'testnet') {
              sbtcBalance = 6.0
            }
          }

          // Get BTC balance (for display only)
          let btcBalance = 0
          try {
            // BTC balance placeholder
            btcBalance = 0
          } catch (btcError) {
            console.warn('BTC balance fetch failed:', btcError)
          }

          set({
            balance: {
              stx: stxBalance,
              sbtc: sbtcBalance,
              btc: btcBalance
            },
            isBalanceLoading: false
          })
        } catch (error) {
          console.error('Balance refresh failed:', error)
          set({ isBalanceLoading: false })
        }
      },

      // Sign transaction
      signTransaction: async (contractCallOptions: any) => {
        const { address, network, walletType } = get()
        if (!address) throw new Error('Wallet not connected')

        // Network configuration will be handled by the transaction functions

        try {
          // This will be handled by the transaction helper functions
          // For now, return a placeholder
          return 'transaction-placeholder'
        } catch (error) {
          console.error('Transaction signing failed:', error)
          throw error
        }
      }
    }),
    {
      name: 'bitcoinbazaar-wallet',
      partialize: (state) => ({
        address: state.address,
        walletType: state.walletType,
        network: state.network,
        isConnected: state.isConnected
      })
    }
  )
)
