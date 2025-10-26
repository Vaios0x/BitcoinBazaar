/**
 * Stacks Connect Configuration
 * Prevents StacksProvider redefinition errors
 */

import { AppConfig, UserSession } from '@stacks/connect'

// Safe initialization of Stacks Connect
let appConfig: AppConfig | null = null
let userSession: UserSession | null = null

export function getStacksConfig() {
  if (!appConfig) {
    try {
      appConfig = new AppConfig(['store_write', 'publish_data'])
    } catch (error) {
      console.warn('AppConfig initialization failed:', error)
      // Fallback configuration
      appConfig = new AppConfig(['store_write', 'publish_data'])
    }
  }
  return appConfig
}

export function getUserSession() {
  if (!userSession) {
    try {
      const config = getStacksConfig()
      userSession = new UserSession({ appConfig: config })
    } catch (error) {
      console.warn('UserSession initialization failed:', error)
      // Fallback session
      const config = getStacksConfig()
      userSession = new UserSession({ appConfig: config })
    }
  }
  return userSession
}

// Initialize StacksProvider safely with Leather preference
if (typeof window !== 'undefined') {
  try {
    // Check if StacksProvider is already defined
    if (!window.StacksProvider) {
      // Create StacksProvider with Leather preference
      window.StacksProvider = {
        getURL: () => window.location.origin,
        transactionRequest: null,
        authenticationRequest: null,
        signatureRequest: null,
        storageRequest: null,
        structuredDataSignatureRequest: null,
        messageSignature: null,
        getProductInfo: () => ({
          name: 'BitcoinBazaar',
          icon: window.location.origin + '/images/logo-bitcoinbazaar.png'
        }),
        // Force Leather wallet
        preferredWallet: 'leather'
      } as any
    }
  } catch (error) {
    // StacksProvider already exists or can't be created
    console.debug('StacksProvider initialization skipped:', error)
  }
}
