#!/usr/bin/env node

/**
 * BitcoinBazaar NFT Testing Script
 * Crea NFTs de prueba usando las funciones de transacción existentes
 */

import { mintNFT } from './src/lib/stacks/transactions.js';

async function testNFTCreation() {
  console.log('🚀 BitcoinBazaar NFT Testing Script');
  console.log('==================================');
  
  try {
    console.log('\n1. Creando NFT de prueba...');
    
    // Crear NFT de prueba
    const txId = await mintNFT(
      'BitcoinBazaar Test NFT',
      'https://bitcoinbazaar.com/test-nft.png'
    );
    
    console.log(`✅ NFT creado exitosamente!`);
    console.log(`📝 Transaction ID: ${txId}`);
    console.log(`🔗 Explorer: https://explorer.hiro.so/txid/${txId}?chain=testnet`);
    
    console.log('\n2. Creando segundo NFT...');
    
    // Crear segundo NFT
    const txId2 = await mintNFT(
      'BitcoinBazaar Gaming NFT',
      'https://bitcoinbazaar.com/gaming-nft.png'
    );
    
    console.log(`✅ Segundo NFT creado exitosamente!`);
    console.log(`📝 Transaction ID: ${txId2}`);
    console.log(`🔗 Explorer: https://explorer.hiro.so/txid/${txId2}?chain=testnet`);
    
    console.log('\n🎉 Testing completado exitosamente!');
    console.log('\n📊 Resumen:');
    console.log(`- NFTs creados: 2`);
    console.log(`- Transacciones exitosas: 2`);
    console.log(`- Network: Stacks Testnet`);
    
  } catch (error) {
    console.error('❌ Error durante el testing:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Ejecutar el test
testNFTCreation();
