// Test function to verify the gaming-nft-v2 contract works
export async function testGamingContract(): Promise<string> {
  try {
    console.log('Testing gaming-nft-v2 contract...')
    
    // Validate wallet for testing
    validateWalletForTesting()
    
    const { address } = useWalletStore.getState()
    if (!address) {
      throw new Error('Wallet address not available')
    }

    const network = getNetwork()
    const { address: contractAddress, name: contractName } = getContractInfo('gaming-nft')

    console.log('Testing contract call...', {
      contractAddress,
      contractName,
      functionName: CONTRACT_FUNCTIONS['gaming-nft'].createBattle,
      network: 'https://api.testnet.hiro.so',
      address
    })

    return new Promise((resolve, reject) => {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: CONTRACT_FUNCTIONS['gaming-nft'].createBattle,
        functionArgs: [
          uintCV(1), // nft1-id
          uintCV(2), // nft2-id
          uintCV(100000), // wager (0.1 STX)
          stringAsciiCV('STX') // payment-token
        ],
        network,
        onFinish: (data: any) => {
          console.log('Test transaction finished:', data)
          const txId = data?.txId || data?.txid || data?.transactionId || data?.txHash || 'unknown'
          resolve(txId)
        },
        onCancel: () => {
          console.log('Test transaction cancelled')
          reject(new Error('Transaction cancelled by user'))
        },
        onError: (error: any) => {
          console.error('Test transaction error:', error)
          reject(new Error(`Test transaction failed: ${error.message || 'Unknown error'}`))
        }
      }

      console.log('Opening Leather Wallet for test transaction...')
      
      openContractCall(txOptions).catch((error) => {
        console.error('openContractCall error:', error)
        reject(error)
      })
    })
  } catch (error: any) {
    console.error('Error in testGamingContract:', error)
    throw new Error(`Failed to test contract: ${error.message || 'Unknown error'}`)
  }
}
