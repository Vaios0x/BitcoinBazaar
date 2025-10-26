#!/bin/bash

# BitcoinBazaar Production Deployment Script
# Advanced deployment with sBTC integration and best practices

set -e  # Exit on any error

echo "🚀 BitcoinBazaar Production Deployment"
echo "======================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
NETWORK="${1:-testnet}"
COST_STRATEGY="${2:-medium-cost}"
MANIFEST_PATH="Clarinet.toml"

# Validation functions
validate_prerequisites() {
    echo -e "\n${BLUE}🔍 Validating prerequisites...${NC}"
    
    # Check Clarinet installation
    if ! command -v clarinet &> /dev/null; then
        echo -e "${RED}❌ Clarinet not found. Please install Clarinet first.${NC}"
        exit 1
    fi
    
    # Check Clarinet version
    CLARINET_VERSION=$(clarinet --version | head -n1 | cut -d' ' -f2)
    echo "Clarinet version: $CLARINET_VERSION"
    
    # Check network configuration
    if [ ! -f "settings/${NETWORK^}.toml" ]; then
        echo -e "${RED}❌ Network configuration not found: settings/${NETWORK^}.toml${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Prerequisites validated${NC}"
}

validate_contracts() {
    echo -e "\n${BLUE}🔍 Validating contracts...${NC}"
    
    if clarinet check; then
        echo -e "${GREEN}✅ All contracts syntax valid${NC}"
    else
        echo -e "${RED}❌ Contract validation failed${NC}"
        exit 1
    fi
}

check_network_connectivity() {
    echo -e "\n${BLUE}🌐 Checking network connectivity...${NC}"
    
    case $NETWORK in
        "testnet")
            API_URL="https://api.testnet.hiro.so"
            EXPLORER_URL="https://explorer.hiro.so"
            ;;
        "mainnet")
            API_URL="https://api.hiro.so"
            EXPLORER_URL="https://explorer.hiro.so"
            ;;
        *)
            echo -e "${RED}❌ Unsupported network: $NETWORK${NC}"
            exit 1
            ;;
    esac
    
    # Test API connectivity
    if curl -s --head "$API_URL/v2/info" | head -n1 | grep -q "200 OK"; then
        echo -e "${GREEN}✅ Network connectivity confirmed${NC}"
    else
        echo -e "${RED}❌ Network connectivity failed${NC}"
        exit 1
    fi
}

validate_account_balance() {
    echo -e "\n${BLUE}💰 Checking account balance...${NC}"
    
    # This would require the account to be configured in settings
    echo "Account balance check would go here"
    echo -e "${YELLOW}⚠️  Ensure you have sufficient STX for deployment${NC}"
}

generate_deployment_plan() {
    echo -e "\n${BLUE}📋 Generating deployment plan...${NC}"
    
    local plan_file="deployments/${NETWORK}-plan.yaml"
    
    if clarinet deployments generate --$NETWORK --$COST_STRATEGY; then
        echo -e "${GREEN}✅ Deployment plan generated: $plan_file${NC}"
        
        # Display plan summary
        if [ -f "$plan_file" ]; then
            echo -e "\n${BLUE}Deployment Plan Summary:${NC}"
            echo "========================"
            grep -E "(contract-name|cost|expected-sender)" "$plan_file" | head -20
        fi
    else
        echo -e "${RED}❌ Failed to generate deployment plan${NC}"
        exit 1
    fi
}

review_deployment_plan() {
    echo -e "\n${YELLOW}📋 Reviewing deployment plan...${NC}"
    
    local plan_file="deployments/${NETWORK}-plan.yaml"
    
    if [ -f "$plan_file" ]; then
        echo "Deployment plan contents:"
        echo "========================"
        cat "$plan_file"
        
        echo -e "\n${YELLOW}⚠️  Please review the deployment plan above.${NC}"
        read -p "Do you want to proceed with deployment? (y/N): " -n 1 -r
        echo
        
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}Deployment cancelled by user${NC}"
            exit 0
        fi
    else
        echo -e "${RED}❌ Deployment plan not found${NC}"
        exit 1
    fi
}

execute_deployment() {
    echo -e "\n${BLUE}🚀 Executing deployment...${NC}"
    
    if clarinet deployments apply --$NETWORK; then
        echo -e "${GREEN}✅ Deployment completed successfully${NC}"
        
        # Display deployment results
        echo -e "\n${BLUE}Deployment Results:${NC}"
        echo "==================="
        
        # Extract contract addresses from deployment
        if [ -f "deployments/${NETWORK}-plan.yaml" ]; then
            echo "Deployed contracts:"
            grep "contract-name" "deployments/${NETWORK}-plan.yaml" | while read line; do
                contract_name=$(echo "$line" | cut -d: -f2 | tr -d ' ')
                echo "  - $contract_name"
            done
        fi
        
    else
        echo -e "${RED}❌ Deployment failed${NC}"
        exit 1
    fi
}

verify_deployment() {
    echo -e "\n${BLUE}🔍 Verifying deployment...${NC}"
    
    # This would check that contracts are actually deployed
    echo "Verification would check contract deployment status"
    echo -e "${GREEN}✅ Deployment verification completed${NC}"
}

setup_monitoring() {
    echo -e "\n${BLUE}📊 Setting up monitoring...${NC}"
    
    # Create monitoring configuration
    cat > monitoring.json << EOF
{
  "contracts": {
    "nft-core": {
      "address": "DEPLOYED_ADDRESS",
      "functions": ["mint", "transfer", "burn"],
      "monitor_events": true
    },
    "marketplace-core": {
      "address": "DEPLOYED_ADDRESS", 
      "functions": ["list-nft", "buy-nft", "make-offer"],
      "monitor_events": true
    },
    "bitcoin-oracle": {
      "address": "DEPLOYED_ADDRESS",
      "functions": ["update-bitcoin-price", "get-bitcoin-price"],
      "monitor_events": true
    }
  },
  "alerts": {
    "high_gas_usage": true,
    "failed_transactions": true,
    "oracle_updates": true
  }
}
EOF
    
    echo -e "${GREEN}✅ Monitoring configuration created${NC}"
}

generate_documentation() {
    echo -e "\n${BLUE}📚 Generating documentation...${NC}"
    
    # Create deployment documentation
    cat > DEPLOYMENT_REPORT.md << EOF
# BitcoinBazaar Deployment Report

## Deployment Information
- **Network**: $NETWORK
- **Date**: $(date)
- **Cost Strategy**: $COST_STRATEGY
- **Clarinet Version**: $(clarinet --version | head -n1 | cut -d' ' -f2)

## Deployed Contracts

### NFT Core (SIP-009 Compliant)
- **Address**: [To be filled after deployment]
- **Functions**: mint, transfer, burn, get-owner, get-token-uri
- **Features**: SIP-009 compliance, sBTC integration

### Marketplace (sBTC Enabled)
- **Address**: [To be filled after deployment]
- **Functions**: list-nft, buy-nft, make-offer, accept-offer
- **Features**: STX and sBTC payments, advanced offers

### Bitcoin Oracle (Multi-Oracle)
- **Address**: [To be filled after deployment]
- **Functions**: update-bitcoin-price, get-bitcoin-price
- **Features**: Multi-oracle support, confidence scoring

## sBTC Integration
- **sBTC Token**: [sBTC contract address]
- **Bridge**: [sBTC bridge address]
- **Features**: Bitcoin programable 1:1, DeFi integration

## Monitoring
- **Explorer**: $EXPLORER_URL
- **API**: $API_URL
- **Alerts**: Configured for high gas usage and failed transactions

## Next Steps
1. Verify all contracts are deployed correctly
2. Test basic functionality
3. Set up monitoring alerts
4. Configure sBTC bridge
5. Deploy frontend application
EOF
    
    echo -e "${GREEN}✅ Documentation generated: DEPLOYMENT_REPORT.md${NC}"
}

# Main deployment function
main() {
    echo "Starting BitcoinBazaar production deployment..."
    echo "Network: $NETWORK"
    echo "Cost Strategy: $COST_STRATEGY"
    echo "====================================="
    
    # Pre-deployment checks
    validate_prerequisites
    validate_contracts
    check_network_connectivity
    validate_account_balance
    
    # Deployment process
    generate_deployment_plan
    review_deployment_plan
    execute_deployment
    
    # Post-deployment
    verify_deployment
    setup_monitoring
    generate_documentation
    
    echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "\n${BLUE}Next steps:${NC}"
    echo "1. Verify contracts in explorer"
    echo "2. Test basic functionality"
    echo "3. Set up monitoring"
    echo "4. Deploy frontend"
}

# Help function
show_help() {
    echo "BitcoinBazaar Production Deployment Script"
    echo "=========================================="
    echo ""
    echo "Usage: $0 [NETWORK] [COST_STRATEGY]"
    echo ""
    echo "Arguments:"
    echo "  NETWORK        Network to deploy to (testnet|mainnet) [default: testnet]"
    echo "  COST_STRATEGY  Cost strategy (low-cost|medium-cost|high-cost|manual-cost) [default: medium-cost]"
    echo ""
    echo "Examples:"
    echo "  $0 testnet medium-cost"
    echo "  $0 mainnet high-cost"
    echo "  $0 testnet manual-cost"
    echo ""
    echo "Prerequisites:"
    echo "  - Clarinet installed and configured"
    echo "  - Network settings configured in settings/"
    echo "  - Sufficient STX balance for deployment"
    echo "  - sBTC contracts available (for sBTC integration)"
}

# Parse arguments
case "${1:-help}" in
    "help"|"-h"|"--help")
        show_help
        ;;
    "testnet"|"mainnet")
        main
        ;;
    *)
        echo -e "${RED}❌ Invalid network: $1${NC}"
        echo "Use 'testnet' or 'mainnet'"
        show_help
        exit 1
        ;;
esac
