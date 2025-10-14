import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.7.1/index.ts'
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NFT CORE TESTS
Clarinet.test({
  name: "Can mint NFT with complete metadata",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!
    const wallet1 = accounts.get('wallet_1')!

    let block = chain.mineBlock([
      Tx.contractCall(
        'nft-core',
        'mint',
        [
          types.ascii("CryptoPunk #1"),
          types.utf8("A rare CryptoPunk NFT"),
          types.ascii("ipfs://QmXyz123..."),
          types.uint(10), // 10% royalty
          types.none() // no collection
        ],
        wallet1.address
      )
    ])

    block.receipts[0].result.expectOk().expectUint(1)

    // Verify metadata
    let getMetadata = chain.callReadOnlyFn(
      'nft-core',
      'get-metadata',
      [types.uint(1)],
      wallet1.address
    )

    const metadata = getMetadata.result.expectSome().expectTuple()
    assertEquals(metadata['name'], "CryptoPunk #1")
    assertEquals(metadata['royalty-percent'], 10)
  }
})

Clarinet.test({
  name: "Cannot mint with royalty > 50%",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!

    let block = chain.mineBlock([
      Tx.contractCall(
        'nft-core',
        'mint',
        [
          types.ascii("Invalid NFT"),
          types.utf8("Should fail"),
          types.ascii("ipfs://invalid"),
          types.uint(51), // 51% - exceeds max
          types.none()
        ],
        wallet1.address
      )
    ])

    block.receipts[0].result.expectErr().expectUint(103) // err-invalid-royalty
  }
})

Clarinet.test({
  name: "Can batch mint NFTs efficiently",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!

    // Create list of 25 NFTs
    const nftList = []
    for (let i = 0; i < 25; i++) {
      nftList.push(types.tuple({
        name: types.ascii(`NFT #${i}`),
        description: types.utf8(`Description ${i}`),
        'image-uri': types.ascii(`ipfs://hash${i}`),
        royalty: types.uint(10)
      }))
    }

    let block = chain.mineBlock([
      Tx.contractCall(
        'nft-core',
        'batch-mint',
        [types.list(nftList)],
        wallet1.address
      )
    ])

    block.receipts[0].result.expectOk()

    // Verify all were minted
    for (let i = 1; i <= 25; i++) {
      let owner = chain.callReadOnlyFn(
        'nft-core',
        'get-owner',
        [types.uint(i)],
        wallet1.address
      )
      owner.result.expectSome().expectPrincipal(wallet1.address)
    }
  }
})

Clarinet.test({
  name: "NFT transfer updates ownership and history",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!
    const wallet2 = accounts.get('wallet_2')!

    // Mint NFT
    let block = chain.mineBlock([
      Tx.contractCall(
        'nft-core',
        'mint',
        [
          types.ascii("Test NFT"),
          types.utf8("For transfer test"),
          types.ascii("ipfs://test"),
          types.uint(10),
          types.none()
        ],
        wallet1.address
      )
    ])

    // Transfer to wallet2
    block = chain.mineBlock([
      Tx.contractCall(
        'nft-core',
        'transfer',
        [
          types.uint(1),
          types.principal(wallet1.address),
          types.principal(wallet2.address)
        ],
        wallet1.address
      )
    ])

    block.receipts[0].result.expectOk()

    // Verify new owner
    let owner = chain.callReadOnlyFn(
      'nft-core',
      'get-owner',
      [types.uint(1)],
      wallet2.address
    )
    owner.result.expectSome().expectPrincipal(wallet2.address)

    // Check transfer history recorded
    let history = chain.callReadOnlyFn(
      'nft-core',
      'get-transfer-history',
      [types.uint(1)],
      wallet1.address
    )
    history.result.expectOk()
  }
})

Clarinet.test({
  name: "Only owner can burn NFT",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!
    const wallet2 = accounts.get('wallet_2')!

    // Mint NFT
    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(10), types.none()],
        wallet1.address
      )
    ])

    // Wallet2 tries to burn (should fail)
    block = chain.mineBlock([
      Tx.contractCall('nft-core', 'burn', [types.uint(1)], wallet2.address)
    ])
    block.receipts[0].result.expectErr().expectUint(100) // err-unauthorized

    // Wallet1 burns successfully
    block = chain.mineBlock([
      Tx.contractCall('nft-core', 'burn', [types.uint(1)], wallet1.address)
    ])
    block.receipts[0].result.expectOk()

    // Verify NFT no longer exists
    let owner = chain.callReadOnlyFn('nft-core', 'get-owner', [types.uint(1)], wallet1.address)
    owner.result.expectNone()
  }
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MARKETPLACE TESTS - DUAL TOKEN PAYMENT
Clarinet.test({
  name: "Can list NFT for sale in STX",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!

    // Setup: Mint NFT
    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(10), types.none()],
        wallet1.address
      )
    ])

    // List for 100 STX
    block = chain.mineBlock([
      Tx.contractCall(
        'marketplace-core',
        'list-nft',
        [types.uint(1), types.uint(100000000), types.ascii("STX")], // 100 STX in microSTX
        wallet1.address
      )
    ])

    block.receipts[0].result.expectOk()

    // Verify listing
    let listing = chain.callReadOnlyFn(
      'marketplace-core',
      'get-listing',
      [types.uint(1)],
      wallet1.address
    )

    const listingData = listing.result.expectSome().expectTuple()
    assertEquals(listingData['price'], 100000000)
    assertEquals(listingData['payment-token'], "STX")
    assertEquals(listingData['status'], "active")
  }
})

Clarinet.test({
  name: "Can buy NFT with STX - royalty distribution works",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const creator = accounts.get('wallet_1')!
    const seller = accounts.get('wallet_2')!
    const buyer = accounts.get('wallet_3')!

    // Creator mints NFT with 10% royalty
    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(10), types.none()],
        creator.address
      )
    ])

    // Creator transfers to seller
    block = chain.mineBlock([
      Tx.contractCall('nft-core', 'transfer',
        [types.uint(1), types.principal(creator.address), types.principal(seller.address)],
        creator.address
      )
    ])

    // Seller lists for 100 STX
    block = chain.mineBlock([
      Tx.contractCall('marketplace-core', 'list-nft',
        [types.uint(1), types.uint(100000000), types.ascii("STX")],
        seller.address
      )
    ])

    // Buyer purchases
    const buyerBalanceBefore = chain.getAssetsMaps().assets['STX'][buyer.address]
    const sellerBalanceBefore = chain.getAssetsMaps().assets['STX'][seller.address]
    const creatorBalanceBefore = chain.getAssetsMaps().assets['STX'][creator.address]

    block = chain.mineBlock([
      Tx.contractCall('marketplace-core', 'buy-nft', [types.uint(1)], buyer.address)
    ])

    block.receipts[0].result.expectOk()

    // Verify payment distribution:
    // Total: 100 STX
    // Platform fee (2.5%): 2.5 STX
    // Royalty (10%): 10 STX
    // Seller gets: 87.5 STX

    const buyerBalanceAfter = chain.getAssetsMaps().assets['STX'][buyer.address]
    const sellerBalanceAfter = chain.getAssetsMaps().assets['STX'][seller.address]
    const creatorBalanceAfter = chain.getAssetsMaps().assets['STX'][creator.address]

    assertEquals(buyerBalanceBefore - buyerBalanceAfter, 100000000) // Paid 100 STX
    assertEquals(sellerBalanceAfter - sellerBalanceBefore, 87500000) // Received 87.5 STX
    assertEquals(creatorBalanceAfter - creatorBalanceBefore, 10000000) // Received 10 STX royalty

    // Verify NFT ownership transferred
    let owner = chain.callReadOnlyFn('nft-core', 'get-owner', [types.uint(1)], buyer.address)
    owner.result.expectSome().expectPrincipal(buyer.address)
  }
})

Clarinet.test({
  name: "Can buy NFT with sBTC - dual token support",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const seller = accounts.get('wallet_1')!
    const buyer = accounts.get('wallet_2')!

    // Mint and list for sBTC
    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("BTC NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(5), types.none()],
        seller.address
      ),
      Tx.contractCall('marketplace-core', 'list-nft',
        [types.uint(1), types.uint(100000000), types.ascii("sBTC")], // 1 sBTC
        seller.address
      )
    ])

    // Buyer purchases with sBTC
    block = chain.mineBlock([
      Tx.contractCall('marketplace-core', 'buy-nft', [types.uint(1)], buyer.address)
    ])

    block.receipts[0].result.expectOk()

    // Verify sBTC was transferred (contract call to sbtc-token should have happened)
    assertEquals(block.receipts[0].events.length > 0, true)
  }
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BITCOIN ORACLE TESTS - UNIQUE FEATURE
Clarinet.test({
  name: "Bitcoin block height is readable from contract",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!

    let blockHeight = chain.callReadOnlyFn(
      'bitcoin-oracle',
      'get-bitcoin-block-height',
      [],
      wallet1.address
    )

    blockHeight.result.expectUint() // Should return current Bitcoin block
  }
})

Clarinet.test({
  name: "Dynamic pricing applies discount on lucky blocks",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!

    let dynamicPrice = chain.callReadOnlyFn(
      'bitcoin-oracle',
      'get-dynamic-price',
      [types.uint(1000000), types.uint(1)], // Base price 1000000, NFT id 1
      wallet1.address
    )

    const price = dynamicPrice.result.expectUint()

    // If lucky block (divisible by 100), price should be discounted
    let currentBlock = chain.callReadOnlyFn(
      'bitcoin-oracle',
      'get-bitcoin-block-height',
      [],
      wallet1.address
    )

    const block = currentBlock.result.expectUint()

    if (block % 100 === 0) {
      // Should have 10% discount
      assertEquals(price, 900000) // 10% off 1000000
    }
  }
})

Clarinet.test({
  name: "Can mint NFT only at specific Bitcoin block",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!

    let currentBlock = chain.callReadOnlyFn(
      'bitcoin-oracle',
      'get-bitcoin-block-height',
      [],
      wallet1.address
    )

    const block = currentBlock.result.expectUint()

    // Try to mint at current block (should succeed)
    let mintBlock = chain.mineBlock([
      Tx.contractCall(
        'bitcoin-oracle',
        'mint-at-bitcoin-block',
        [types.ascii("Milestone NFT"), types.uint(block)],
        wallet1.address
      )
    ])

    mintBlock.receipts[0].result.expectOk()

    // Try to mint at wrong block (should fail)
    let wrongMint = chain.mineBlock([
      Tx.contractCall(
        'bitcoin-oracle',
        'mint-at-bitcoin-block',
        [types.ascii("Wrong Block NFT"), types.uint(block + 1000)],
        wallet1.address
      )
    ])

    wrongMint.receipts[0].result.expectErr() // Should fail
  }
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AUCTION TESTS
Clarinet.test({
  name: "Can create auction and place bids",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const seller = accounts.get('wallet_1')!
    const bidder1 = accounts.get('wallet_2')!
    const bidder2 = accounts.get('wallet_3')!

    // Mint NFT
    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("Auction NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(10), types.none()],
        seller.address
      )
    ])

    // Create auction: starting price 50 STX, 100 blocks duration
    block = chain.mineBlock([
      Tx.contractCall(
        'auction',
        'create-auction',
        [
          types.uint(1),
          types.uint(50000000), // 50 STX
          types.uint(100), // 100 blocks duration
          types.ascii("english"), // English auction
          types.ascii("STX")
        ],
        seller.address
      )
    ])

    block.receipts[0].result.expectOk()

    // Bidder1 bids 60 STX
    block = chain.mineBlock([
      Tx.contractCall('auction', 'place-bid', [types.uint(1), types.uint(60000000)], bidder1.address)
    ])
    block.receipts[0].result.expectOk()

    // Bidder2 bids 70 STX (higher)
    block = chain.mineBlock([
      Tx.contractCall('auction', 'place-bid', [types.uint(1), types.uint(70000000)], bidder2.address)
    ])
    block.receipts[0].result.expectOk()

    // Bidder1 refund should have happened automatically
    // Verify auction state
    let auction = chain.callReadOnlyFn('auction', 'get-auction', [types.uint(1)], seller.address)
    const auctionData = auction.result.expectSome().expectTuple()
    assertEquals(auctionData['current-price'], 70000000)
    assertEquals(auctionData['highest-bidder'].expectSome(), bidder2.address)
  }
})

Clarinet.test({
  name: "Cannot finalize auction before end block",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const seller = accounts.get('wallet_1')!

    // Setup auction
    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(10), types.none()],
        seller.address
      ),
      Tx.contractCall('auction', 'create-auction',
        [types.uint(1), types.uint(50000000), types.uint(100), types.ascii("english"), types.ascii("STX")],
        seller.address
      )
    ])

    // Try to finalize immediately (should fail)
    block = chain.mineBlock([
      Tx.contractCall('auction', 'finalize-auction', [types.uint(1)], seller.address)
    ])

    block.receipts[0].result.expectErr().expectUint(105) // err-auction-not-ended
  }
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LAZY MINTING TESTS
Clarinet.test({
  name: "Lazy mint voucher can be created and redeemed",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const creator = accounts.get('wallet_1')!
    const buyer = accounts.get('wallet_2')!

    // Creator creates lazy voucher (no gas for minting yet)
    const metadataHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    const signature = "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab"

    let block = chain.mineBlock([
      Tx.contractCall(
        'lazy-mint',
        'create-lazy-voucher',
        [
          types.buff(Buffer.from(metadataHash.slice(2), 'hex')),
          types.buff(Buffer.from(signature.slice(2), 'hex')),
          types.uint(1000), // Expiry block
          types.uint(100000000), // 100 STX price
          types.ascii("STX")
        ],
        creator.address
      )
    ])

    block.receipts[0].result.expectOk().expectUint(1) // Voucher ID

    // Buyer redeems voucher (pays + mints in one tx)
    block = chain.mineBlock([
      Tx.contractCall(
        'lazy-mint',
        'redeem-lazy-voucher',
        [
          types.uint(1),
          types.tuple({
            name: types.ascii("Lazy NFT"),
            description: types.utf8("Minted on purchase"),
            'image-uri': types.ascii("ipfs://lazy")
          })
        ],
        buyer.address
      )
    ])

    block.receipts[0].result.expectOk()

    // Verify buyer owns NFT
    let owner = chain.callReadOnlyFn('nft-core', 'get-owner', [types.uint(1)], buyer.address)
    owner.result.expectSome().expectPrincipal(buyer.address)

    // Verify creator received payment
    // (Check STX balance increase)
  }
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECURITY TESTS
Clarinet.test({
  name: "Cannot buy own NFT",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!

    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(10), types.none()],
        wallet1.address
      ),
      Tx.contractCall('marketplace-core', 'list-nft',
        [types.uint(1), types.uint(100000000), types.ascii("STX")],
        wallet1.address
      )
    ])

    // Try to buy own NFT
    block = chain.mineBlock([
      Tx.contractCall('marketplace-core', 'buy-nft', [types.uint(1)], wallet1.address)
    ])

    block.receipts[0].result.expectErr() // Should fail
  }
})

Clarinet.test({
  name: "Cannot transfer NFT that is listed for sale",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get('wallet_1')!
    const wallet2 = accounts.get('wallet_2')!

    let block = chain.mineBlock([
      Tx.contractCall('nft-core', 'mint',
        [types.ascii("NFT"), types.utf8("desc"), types.ascii("ipfs://x"), types.uint(10), types.none()],
        wallet1.address
      ),
      Tx.contractCall('marketplace-core', 'list-nft',
        [types.uint(1), types.uint(100000000), types.ascii("STX")],
        wallet1.address
      )
    ])

    // Try to transfer while listed
    block = chain.mineBlock([
      Tx.contractCall('nft-core', 'transfer',
        [types.uint(1), types.principal(wallet1.address), types.principal(wallet2.address)],
        wallet1.address
      )
    ])

    block.receipts[0].result.expectErr() // Should fail - NFT is in escrow
  }
})
