# 🪙 BitcoinBazaar sBTC Integration Guide

## Overview

BitcoinBazaar now supports **real sBTC integration** using the official sBTC contract on Stacks Testnet. This enables users to trade NFTs using Bitcoin-backed sBTC tokens.

## 🔗 sBTC Contract Information

- **Contract Address**: `SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token`
- **Network**: Stacks Testnet
- **Standard**: SIP-010 (Fungible Token)
- **Bridge**: [sbtc.stacks.co](https://sbtc.stacks.co)

## 🚀 Deployed sBTC Contracts

### 1. Marketplace with sBTC
- **Contract**: `marketplace-sbtc-real`
- **Address**: `ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace-sbtc-real`
- **Features**:
  - List NFTs for sale with sBTC pricing
  - Buy NFTs using sBTC
  - Make offers with sBTC
  - Dual payment support (STX + sBTC)

### 2. Gaming NFTs with sBTC
- **Contract**: `gaming-nft-sbtc-real`
- **Address**: `ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft-sbtc-real`
- **Features**:
  - Create battles with sBTC wagers
  - Execute battles and win sBTC
  - NFT stats tracking
  - Dual payment support (STX + sBTC)

### 3. DeFi Protocols with sBTC
- **Contract**: `nft-defi-sbtc-real`
- **Address**: `ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi-sbtc-real`
- **Features**:
  - Borrow sBTC against NFTs
  - Stake NFTs for sBTC rewards
  - Lending protocols with sBTC
  - Yield farming with sBTC

### 4. Analytics with sBTC
- **Contract**: `analytics-sbtc-real`
- **Address**: `ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.analytics-sbtc-real`
- **Features**:
  - Track sBTC volume
  - Monitor sBTC transactions
  - Floor price tracking in sBTC
  - User stats with sBTC

## 🔄 sBTC Operations

### Deposit (BTC → sBTC)
1. **Speed**: 1-3 Bitcoin blocks
2. **Process**:
   - Send BTC to sBTC bridge
   - Wait for Bitcoin confirmation
   - Receive sBTC in Stacks wallet
3. **Bridge**: [sbtc.stacks.co](https://sbtc.stacks.co)

### Withdrawal (sBTC → BTC)
1. **Speed**: 6 Bitcoin blocks
2. **Process**:
   - Initiate withdrawal in Stacks wallet
   - Wait for 6 Bitcoin confirmations
   - Receive BTC in Bitcoin wallet
3. **Security**: Multi-signature threshold required

## 💡 Key Benefits

### 1. Trustless Bitcoin Peg
- 1:1 backing with Bitcoin
- No centralized custodians
- Cryptographically secure

### 2. Fast Transactions
- Deposits: 1-3 Bitcoin blocks
- Withdrawals: 6 Bitcoin blocks
- Stacks transactions: Instant

### 3. DeFi Integration
- Lending with Bitcoin collateral
- Staking for Bitcoin rewards
- Gaming with Bitcoin prizes
- Analytics with Bitcoin metrics

## 🛠️ Technical Implementation

### Contract Integration
```clarity
;; sBTC contract address (testnet)
(define-constant sbtc-contract 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token)

;; Transfer sBTC
(contract-call? sbtc-contract transfer amount sender recipient)
```

### Payment Token Support
```clarity
;; Validate payment token
(asserts! (or (is-eq payment-token "STX") (is-eq payment-token "sBTC")) err-invalid-token)

;; Transfer based on token type
(if (is-eq payment-token "sBTC")
  (contract-call? sbtc-contract transfer amount sender recipient)
  (stx-transfer? amount sender recipient)
)
```

## 🔍 Verification

### Contract Verification
- **Explorer**: [Stacks Explorer](https://explorer.stacks.co)
- **Network**: Testnet
- **Status**: Deployed and verified

### sBTC Balance Check
```clarity
;; Get sBTC balance
(contract-call? sbtc-contract get-balance user)
```

## 📊 Usage Examples

### 1. List NFT for sBTC
```clarity
;; List NFT for 0.1 sBTC
(list-nft token-id u10000000 "sBTC")
```

### 2. Buy NFT with sBTC
```clarity
;; Buy NFT using sBTC
(buy-nft token-id)
```

### 3. Create Battle with sBTC
```clarity
;; Create battle with 0.05 sBTC wager
(create-battle nft1-id nft2-id u5000000 "sBTC")
```

### 4. Borrow sBTC against NFT
```clarity
;; Borrow 0.5 sBTC against NFT
(borrow-against-nft nft-id u50000000)
```

## 🚨 Security Considerations

### 1. sBTC Security
- Multi-signature threshold
- Decentralized signer set
- Bitcoin finality protection
- No single point of failure

### 2. Contract Security
- Access control mechanisms
- Replay attack prevention
- Input validation
- Error handling

## 🔗 Resources

- **sBTC Documentation**: [docs.stacks.co/sbtc](https://docs.stacks.co/concepts/sbtc)
- **sBTC Bridge**: [sbtc.stacks.co](https://sbtc.stacks.co)
- **Stacks Explorer**: [explorer.stacks.co](https://explorer.stacks.co)
- **BitcoinBazaar**: [GitHub Repository](https://github.com/bitcoinbazaar/bitcoinbazaar)

## 🎯 Next Steps

1. **Test sBTC Integration**: Use the bridge to get sBTC
2. **Deploy to Mainnet**: When ready for production
3. **Add More Features**: Advanced DeFi protocols
4. **Community Feedback**: Gather user feedback

---

**BitcoinBazaar sBTC Integration** - Bringing Bitcoin to NFT trading! 🚀
