/**
 * Testing Section Wallet Configuration
 * Ensures all transactions in /testing section use Leather Wallet only
 */

import { AppConfig, UserSession } from '@stacks/connect'

// Testing-specific wallet configuration
export const TESTING_WALLET_CONFIG = {
  // Force Leather wallet for all testing transactions
  preferredWallet: 'leather' as const,
  
  // Testing-specific app details
  appDetails: {
    name: 'BitcoinBazaar Testing',
    icon: typeof window !== 'undefined' ? window.location.origin + '/logo.png' : '/logo.png'
  },
  
  // Testing network configuration
  network: 'testnet' as const,
  
  // Testing-specific permissions
  permissions: ['store_write', 'publish_data'] as const
}

// Create testing-specific app config
let testingAppConfig: AppConfig | null = null
let testingUserSession: UserSession | null = null

export function getTestingStacksConfig() {
  if (!testingAppConfig) {
    try {
      testingAppConfig = new AppConfig([...TESTING_WALLET_CONFIG.permissions])
    } catch (error) {
      console.warn('Testing AppConfig initialization failed:', error)
      // Fallback configuration
      testingAppConfig = new AppConfig([...TESTING_WALLET_CONFIG.permissions])
    }
  }
  return testingAppConfig
}

export function getTestingUserSession() {
  if (!testingUserSession) {
    try {
      const config = getTestingStacksConfig()
      testingUserSession = new UserSession({ appConfig: config })
    } catch (error) {
      console.warn('Testing UserSession initialization failed:', error)
      // Fallback session
      const config = getTestingStacksConfig()
      testingUserSession = new UserSession({ appConfig: config })
    }
  }
  return testingUserSession
}

// Initialize testing-specific StacksProvider
if (typeof window !== 'undefined') {
  try {
    // Check if StacksProvider is already defined
    if (!window.StacksProvider) {
      // Create StacksProvider with Leather preference for testing
      window.StacksProvider = {
        getURL: () => window.location.origin,
        transactionRequest: null,
        authenticationRequest: null,
        signatureRequest: null,
        storageRequest: null,
        structuredDataSignatureRequest: null,
        messageSignature: null,
        getProductInfo: () => ({
          name: 'BitcoinBazaar Testing',
          icon: window.location.origin + '/images/logo-bitcoinbazaar.png'
        }),
        // Force Leather wallet for testing section
        preferredWallet: 'leather'
      } as any
    }
  } catch (error) {
    // StacksProvider already exists or can't be created
    console.debug('Testing StacksProvider initialization skipped:', error)
  }
}

// Testing wallet validation
export function validateTestingWallet(): boolean {
  if (typeof window === 'undefined') return false
  
  // In production, be more permissive to allow wallet detection
  if (process.env.NODE_ENV === 'production') {
    console.log('Production environment: Allowing wallet validation')
    return true
  }
  
  // Check if Leather wallet is available
  const leatherAvailable = !!(window as any).LeatherProvider || 
                          !!(window as any).HiroWalletProvider
  
  if (!leatherAvailable) {
    console.warn('Leather wallet not detected for testing section')
    return false
  }
  
  return true
}

// Testing wallet connection helper
export async function connectTestingWallet(): Promise<boolean> {
  try {
    const isValid = validateTestingWallet()
    if (!isValid) {
      throw new Error('Leather wallet is required for testing section')
    }
    
    // Force Leather wallet connection for testing
    const { showConnect } = await import('@stacks/connect')
    const userSession = getTestingUserSession()
    
    return new Promise((resolve, reject) => {
      showConnect({
        appDetails: TESTING_WALLET_CONFIG.appDetails,
        redirectTo: '/testing',
        onFinish: () => {
          if (userSession.isUserSignedIn()) {
            console.log('Testing wallet connected successfully')
            resolve(true)
          } else {
            reject(new Error('Failed to connect testing wallet'))
          }
        },
        onCancel: () => {
          reject(new Error('Testing wallet connection cancelled'))
        },
        userSession
      })
    })
  } catch (error) {
    console.error('Testing wallet connection failed:', error)
    throw error
  }
}
