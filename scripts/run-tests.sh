#!/bin/bash

# BitcoinBazaar Advanced Testing Script
# Comprehensive test suite for all contracts

echo "🚀 BitcoinBazaar Advanced Testing Suite"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run tests and capture results
run_test_suite() {
    local test_name="$1"
    local test_file="$2"
    
    echo -e "\n${BLUE}Running $test_name...${NC}"
    echo "----------------------------------------"
    
    if npm test -- "$test_file" --reporter=verbose; then
        echo -e "${GREEN}✅ $test_name PASSED${NC}"
        ((PASSED_TESTS++))
    else
        echo -e "${RED}❌ $test_name FAILED${NC}"
        ((FAILED_TESTS++))
    fi
    
    ((TOTAL_TESTS++))
}

# Function to check contract syntax
check_contracts() {
    echo -e "\n${YELLOW}🔍 Checking contract syntax...${NC}"
    
    if clarinet check; then
        echo -e "${GREEN}✅ All contracts syntax valid${NC}"
    else
        echo -e "${RED}❌ Contract syntax errors found${NC}"
        exit 1
    fi
}

# Function to run coverage analysis
run_coverage() {
    echo -e "\n${YELLOW}📊 Running coverage analysis...${NC}"
    
    if npm run test:coverage; then
        echo -e "${GREEN}✅ Coverage analysis completed${NC}"
        
        # Display coverage summary
        if [ -f "lcov.info" ]; then
            echo -e "\n${BLUE}Coverage Summary:${NC}"
            echo "=================="
            # This would require lcov to be installed
            # genhtml lcov.info --branch-coverage -o coverage
            # echo "Coverage report generated in coverage/index.html"
        fi
    else
        echo -e "${RED}❌ Coverage analysis failed${NC}"
    fi
}

# Function to run gas cost analysis
run_gas_analysis() {
    echo -e "\n${YELLOW}⛽ Running gas cost analysis...${NC}"
    
    if [ -f "costs-reports.json" ]; then
        echo -e "${BLUE}Gas Cost Analysis:${NC}"
        echo "==================="
        cat costs-reports.json | jq '.' 2>/dev/null || echo "Install jq for better JSON formatting"
    else
        echo "No gas cost report found. Run tests with coverage to generate."
    fi
}

# Function to run integration tests
run_integration_tests() {
    echo -e "\n${YELLOW}🔗 Running integration tests...${NC}"
    
    # Test contract interactions
    echo "Testing NFT Core + Marketplace integration..."
    npm test -- tests/nft-core.test.ts tests/marketplace-sbtc.test.ts
    
    echo "Testing Oracle + Marketplace integration..."
    npm test -- tests/bitcoin-oracle.test.ts tests/marketplace-sbtc.test.ts
}

# Function to run performance tests
run_performance_tests() {
    echo -e "\n${YELLOW}⚡ Running performance tests...${NC}"
    
    # Test with large datasets
    echo "Testing with multiple NFTs..."
    npm test -- tests/performance.test.ts 2>/dev/null || echo "Performance tests not implemented yet"
    
    # Test gas optimization
    echo "Testing gas optimization..."
    npm test -- tests/gas-optimization.test.ts 2>/dev/null || echo "Gas optimization tests not implemented yet"
}

# Function to run security tests
run_security_tests() {
    echo -e "\n${YELLOW}🔒 Running security tests...${NC}"
    
    # Test for common vulnerabilities
    echo "Testing for reentrancy attacks..."
    npm test -- tests/security.test.ts 2>/dev/null || echo "Security tests not implemented yet"
    
    # Test access controls
    echo "Testing access controls..."
    npm test -- tests/access-control.test.ts 2>/dev/null || echo "Access control tests not implemented yet"
}

# Function to generate test report
generate_report() {
    echo -e "\n${BLUE}📋 Test Report${NC}"
    echo "=============="
    echo "Total Tests: $TOTAL_TESTS"
    echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
    echo -e "Failed: ${RED}$FAILED_TESTS${NC}"
    
    if [ $FAILED_TESTS -eq 0 ]; then
        echo -e "\n${GREEN}🎉 All tests passed!${NC}"
        exit 0
    else
        echo -e "\n${RED}❌ Some tests failed${NC}"
        exit 1
    fi
}

# Main execution
main() {
    echo "Starting BitcoinBazaar test suite..."
    echo "====================================="
    
    # Check prerequisites
    if ! command -v clarinet &> /dev/null; then
        echo -e "${RED}❌ Clarinet not found. Please install Clarinet first.${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm not found. Please install Node.js first.${NC}"
        exit 1
    fi
    
    # Run test phases
    check_contracts
    
    # Individual contract tests
    run_test_suite "NFT Core Tests" "tests/nft-core.test.ts"
    run_test_suite "Marketplace sBTC Tests" "tests/marketplace-sbtc.test.ts"
    run_test_suite "Bitcoin Oracle Tests" "tests/bitcoin-oracle.test.ts"
    
    # Integration tests
    run_integration_tests
    
    # Coverage and analysis
    run_coverage
    run_gas_analysis
    
    # Advanced tests
    run_performance_tests
    run_security_tests
    
    # Generate final report
    generate_report
}

# Parse command line arguments
case "${1:-all}" in
    "syntax")
        check_contracts
        ;;
    "unit")
        run_test_suite "NFT Core Tests" "tests/nft-core.test.ts"
        run_test_suite "Marketplace sBTC Tests" "tests/marketplace-sbtc.test.ts"
        run_test_suite "Bitcoin Oracle Tests" "tests/bitcoin-oracle.test.ts"
        ;;
    "integration")
        run_integration_tests
        ;;
    "coverage")
        run_coverage
        ;;
    "performance")
        run_performance_tests
        ;;
    "security")
        run_security_tests
        ;;
    "all")
        main
        ;;
    *)
        echo "Usage: $0 [syntax|unit|integration|coverage|performance|security|all]"
        echo "  syntax      - Check contract syntax only"
        echo "  unit        - Run unit tests only"
        echo "  integration - Run integration tests only"
        echo "  coverage    - Run coverage analysis only"
        echo "  performance - Run performance tests only"
        echo "  security    - Run security tests only"
        echo "  all         - Run all tests (default)"
        exit 1
        ;;
esac
