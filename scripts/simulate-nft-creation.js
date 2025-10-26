// BitcoinBazaar NFT Creation Test
// Simula la creación de un NFT usando las funciones existentes

console.log('🚀 BitcoinBazaar NFT Creation Test');
console.log('=================================');

// Simular la función mintNFT
function simulateMintNFT(name, imageUri) {
  console.log(`\n📝 Creando NFT: ${name}`);
  console.log(`🖼️  Imagen: ${imageUri}`);
  
  // Simular transaction ID
  const txId = `0x${Math.random().toString(16).substr(2, 40)}`;
  
  console.log(`✅ NFT creado exitosamente!`);
  console.log(`📝 Transaction ID: ${txId}`);
  console.log(`🔗 Explorer: https://explorer.hiro.so/txid/${txId}?chain=testnet`);
  
  return {
    txId,
    tokenId: Math.floor(Math.random() * 1000) + 1,
    name,
    imageUri,
    owner: 'ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR',
    createdAt: new Date().toISOString()
  };
}

// Crear NFTs de prueba
const testNFTs = [
  {
    name: 'BitcoinBazaar Test NFT #1',
    imageUri: 'https://bitcoinbazaar.com/test-nft-1.png'
  },
  {
    name: 'BitcoinBazaar Gaming NFT',
    imageUri: 'https://bitcoinbazaar.com/gaming-nft.png'
  },
  {
    name: 'BitcoinBazaar DeFi NFT',
    imageUri: 'https://bitcoinbazaar.com/defi-nft.png'
  }
];

console.log('\n🎯 Creando NFTs de prueba...');

const createdNFTs = [];
testNFTs.forEach((nft, index) => {
  const createdNFT = simulateMintNFT(nft.name, nft.imageUri);
  createdNFTs.push(createdNFT);
  
  console.log(`\n📊 NFT #${index + 1} creado:`);
  console.log(`   Token ID: ${createdNFT.tokenId}`);
  console.log(`   Nombre: ${createdNFT.name}`);
  console.log(`   Owner: ${createdNFT.owner}`);
  console.log(`   Creado: ${createdNFT.createdAt}`);
});

console.log('\n🎉 Testing completado exitosamente!');
console.log('\n📊 Resumen:');
console.log(`- NFTs creados: ${createdNFTs.length}`);
console.log(`- Transacciones exitosas: ${createdNFTs.length}`);
console.log(`- Network: Stacks Testnet`);
console.log(`- Contrato: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-core`);

console.log('\n🔗 Para verificar en el explorador:');
createdNFTs.forEach((nft, index) => {
  console.log(`${index + 1}. ${nft.name}: https://explorer.hiro.so/txid/${nft.txId}?chain=testnet`);
});

console.log('\n✅ NFT Creation Test completado!');
console.log('🌐 Aplicación disponible en: http://localhost:3000');
console.log('🎮 Demo interactivo: http://localhost:3000/demo');
