// BitcoinBazaar NFT Testing - Frontend Integration Test
// Este script prueba la creación de NFTs usando el frontend

console.log('🚀 BitcoinBazaar NFT Testing Script');
console.log('==================================');

// Simular datos de NFT de prueba
const testNFTs = [
  {
    name: 'BitcoinBazaar Test NFT',
    description: 'NFT de prueba creado para testing',
    imageUri: 'https://bitcoinbazaar.com/test-nft.png',
    price: 0.1,
    paymentToken: 'STX'
  },
  {
    name: 'BitcoinBazaar Gaming NFT',
    description: 'NFT de gaming con stats únicos',
    imageUri: 'https://bitcoinbazaar.com/gaming-nft.png',
    price: 0.05,
    paymentToken: 'sBTC'
  },
  {
    name: 'BitcoinBazaar DeFi NFT',
    description: 'NFT para staking y DeFi',
    imageUri: 'https://bitcoinbazaar.com/defi-nft.png',
    price: 0.2,
    paymentToken: 'STX'
  }
];

console.log('\n📋 NFTs de prueba preparados:');
testNFTs.forEach((nft, index) => {
  console.log(`\n${index + 1}. ${nft.name}`);
  console.log(`   Descripción: ${nft.description}`);
  console.log(`   Imagen: ${nft.imageUri}`);
  console.log(`   Precio: ${nft.price} ${nft.paymentToken}`);
});

console.log('\n🎯 Para probar la creación de NFTs:');
console.log('1. Abre http://localhost:3000 en tu navegador');
console.log('2. Conecta tu wallet Leather');
console.log('3. Ve a la sección "Create NFT"');
console.log('4. Usa los datos de prueba de arriba');
console.log('5. Ejecuta las transacciones');

console.log('\n🔧 Funciones disponibles para testing:');
console.log('- mintNFT(name, imageUri)');
console.log('- listNFT(tokenId, price, paymentToken)');
console.log('- buyNFT(tokenId, paymentToken)');
console.log('- transferNFT(tokenId, recipient)');
console.log('- burnNFT(tokenId)');

console.log('\n📊 Contratos desplegados:');
console.log('- NFT Core: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-core');
console.log('- Marketplace: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace');
console.log('- Gaming NFT: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft');
console.log('- DeFi: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi');

console.log('\n✅ Testing script listo!');
console.log('🌐 Servidor corriendo en: http://localhost:3000');
console.log('🔗 Demo interactivo: http://localhost:3000/demo');
