// Contract Diagnostic Script
// Run this in browser console to check which contracts exist

async function diagnoseContracts() {
  const contracts = {
    testnet: {
      'nft-core': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-core',
      'marketplace': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.marketplace',
      'marketplace-sbtc-real': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.marketplace-sbtc-real',
      'bitcoin-oracle': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-oracle',
      'gaming-nft': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.gaming-nft',
      'gaming-nft-simple': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.gaming-nft-simple',
      'nft-defi': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-defi',
      'sbtc-mock': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-mock',
    }
  }

  console.log('🔍 Diagnosing contracts on Stacks Testnet...')
  
  for (const [contractName, fullAddress] of Object.entries(contracts.testnet)) {
    const [address, name] = fullAddress.split('.')
    
    try {
      const response = await fetch(`https://api.testnet.hiro.so/extended/v1/contract/${address}/${name}`)
      const status = response.ok ? '✅ EXISTS' : '❌ NOT FOUND'
      console.log(`${status} ${contractName}: ${fullAddress}`)
      
      if (response.ok) {
        const contractData = await response.json()
        console.log(`   📄 Contract source available: ${contractData.source_code ? 'Yes' : 'No'}`)
      }
    } catch (error) {
      console.log(`❌ ERROR ${contractName}: ${error.message}`)
    }
  }
  
  console.log('\n🔍 Checking sBTC official contract...')
  try {
    const response = await fetch('https://api.testnet.hiro.so/extended/v1/contract/SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4/sbtc-token')
    const status = response.ok ? '✅ EXISTS' : '❌ NOT FOUND'
    console.log(`${status} sBTC Official: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token`)
  } catch (error) {
    console.log(`❌ ERROR sBTC Official: ${error.message}`)
  }
}

// Run the diagnosis
diagnoseContracts()
