# 🚀 BitcoinBazaar Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+
- Clarinet CLI
- Xverse or Leather wallet with testnet STX

### 1. Setup Development Environment

**Windows:**
```powershell
.\scripts\setup.ps1
```

**Linux/macOS:**
```bash
./scripts/setup.sh
```

### 2. Configure Environment
Edit `.env.local` with your configuration:
```bash
# Update contract addresses after deployment
NEXT_PUBLIC_NFT_CORE_CONTRACT=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-core
NEXT_PUBLIC_MARKETPLACE_CONTRACT=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.marketplace-core
NEXT_PUBLIC_BITCOIN_ORACLE_CONTRACT=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-oracle
```

### 3. Deploy Smart Contracts
```bash
# Deploy to testnet
clarinet deploy --testnet

# Or use the deployment script
./scripts/deploy.sh
```

### 4. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Production Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Smart Contracts (Mainnet)
1. Update `Clarinet.toml` with mainnet configuration
2. Deploy contracts: `clarinet deploy --mainnet`
3. Update frontend environment variables with new contract addresses

## Testing

### Run All Tests
```bash
clarinet test
```

### Test Coverage
```bash
clarinet test --coverage
```

### Frontend Tests
```bash
npm run test
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_STACKS_NETWORK` | Stacks network (testnet/mainnet) | Yes |
| `NEXT_PUBLIC_STACKS_API_URL` | Stacks API endpoint | Yes |
| `NEXT_PUBLIC_NFT_CORE_CONTRACT` | NFT Core contract address | Yes |
| `NEXT_PUBLIC_MARKETPLACE_CONTRACT` | Marketplace contract address | Yes |
| `NEXT_PUBLIC_BITCOIN_ORACLE_CONTRACT` | Bitcoin Oracle contract address | Yes |
| `PINATA_API_KEY` | Pinata API key for IPFS | Yes |
| `PINATA_SECRET_KEY` | Pinata secret key | Yes |

## Troubleshooting

### Common Issues

**1. Clarinet not found**
```bash
# Install Clarinet
curl -L https://github.com/hirosystems/clarinet/releases/download/latest/clarinet-linux-x64.tar.gz | tar xz
sudo mv clarinet /usr/local/bin/
```

**2. Contract deployment fails**
- Check your wallet has enough STX for deployment
- Verify network connectivity
- Check contract syntax with `clarinet check`

**3. Frontend build fails**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

**4. Wallet connection issues**
- Ensure wallet is unlocked
- Check network (testnet vs mainnet)
- Clear browser cache and cookies

### Support
- 📧 Email: support@bitcoinbazaar.com
- 💬 Discord: https://discord.gg/bitcoinbazaar
- 🐦 Twitter: @bitcoinbazaar
- 📖 Docs: https://docs.bitcoinbazaar.com

## Security Checklist

- [ ] Smart contracts audited
- [ ] Environment variables secured
- [ ] API keys rotated regularly
- [ ] HTTPS enabled in production
- [ ] Content Security Policy configured
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] Error handling for all API calls

## Performance Optimization

- [ ] Images optimized (WebP format)
- [ ] Code splitting implemented
- [ ] Lazy loading for components
- [ ] CDN configured for static assets
- [ ] Database queries optimized
- [ ] Caching strategy implemented
- [ ] Bundle size minimized
- [ ] Lighthouse score > 90

## Monitoring

### Analytics
- Google Analytics 4 configured
- Mixpanel for user behavior
- Custom events tracked

### Error Tracking
- Sentry for error monitoring
- Log aggregation setup
- Performance monitoring

### Uptime
- Health checks configured
- Alerting setup
- Backup strategy in place
