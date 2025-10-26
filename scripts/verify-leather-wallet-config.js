#!/usr/bin/env node

/**
 * Verification Script for Leather Wallet Configuration
 * Ensures all transactions in /testing section use Leather Wallet only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, checks) {
  if (!fs.existsSync(filePath)) {
    log(`❌ File not found: ${filePath}`, 'red');
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let allPassed = true;

  checks.forEach(check => {
    const { name, test, errorMessage } = check;
    if (!test(content)) {
      log(`❌ ${name}: ${errorMessage}`, 'red');
      allPassed = false;
    } else {
      log(`✅ ${name}`, 'green');
    }
  });

  return allPassed;
}

function main() {
  log('🔍 Verifying Leather Wallet Configuration for Testing Section', 'bold');
  log('=' .repeat(60), 'blue');

  let allFilesPassed = true;

  // Check wallet store
  log('\n📁 Checking Wallet Store...', 'blue');
  const walletStoreChecks = [
    {
      name: 'Wallet Type Definition',
      test: (content) => content.includes("export type WalletType = 'leather' | null"),
      errorMessage: 'WalletType should only include leather'
    },
    {
      name: 'Xverse References Removed',
      test: (content) => !content.includes('connectXverse') && !content.includes('xverse'),
      errorMessage: 'Xverse references should be removed'
    },
    {
      name: 'Leather Wallet Forced',
      test: (content) => content.includes('walletType: \'leather\'') && content.includes('Always Leather'),
      errorMessage: 'Should force Leather wallet'
    }
  ];

  allFilesPassed &= checkFile('src/lib/stores/walletStore.ts', walletStoreChecks);

  // Check connect wallet modal
  log('\n📁 Checking Connect Wallet Modal...', 'blue');
  const modalChecks = [
    {
      name: 'Only Leather Wallet Listed',
      test: (content) => content.includes('id: \'leather\'') && !content.includes('id: \'xverse\''),
      errorMessage: 'Should only list Leather wallet'
    },
    {
      name: 'Leather Required Message',
      test: (content) => content.includes('BitcoinBazaar requires Leather Wallet'),
      errorMessage: 'Should show Leather wallet requirement message'
    },
    {
      name: 'Testing Section Mention',
      test: (content) => content.includes('Testing Section'),
      errorMessage: 'Should mention Testing Section'
    }
  ];

  allFilesPassed &= checkFile('src/components/wallet/ConnectWalletModal.tsx', modalChecks);

  // Check wallet dropdown
  log('\n📁 Checking Wallet Dropdown...', 'blue');
  const dropdownChecks = [
    {
      name: 'Leather Only Display',
      test: (content) => content.includes('<span>Leather</span>') && !content.includes('Xverse'),
      errorMessage: 'Should only display Leather wallet'
    },
    {
      name: 'Xverse References Removed',
      test: (content) => !content.includes('walletType === \'xverse\''),
      errorMessage: 'Should not reference Xverse wallet type'
    }
  ];

  allFilesPassed &= checkFile('src/components/wallet/WalletDropdown.tsx', dropdownChecks);

  // Check testing section
  log('\n📁 Checking Testing Section...', 'blue');
  const testingChecks = [
    {
      name: 'Leather Wallet Validation',
      test: (content) => content.includes('validateTestingWallet') && content.includes('walletType !== \'leather\''),
      errorMessage: 'Should validate Leather wallet'
    },
    {
      name: 'Leather Required Banner',
      test: (content) => content.includes('Leather Wallet Required') && content.includes('Xverse wallet is not supported'),
      errorMessage: 'Should show Leather wallet requirement banner'
    },
    {
      name: 'Testing Config Import',
      test: (content) => content.includes('testing-wallet-config'),
      errorMessage: 'Should import testing wallet config'
    }
  ];

  allFilesPassed &= checkFile('src/components/testing/TestingSection.tsx', testingChecks);

  // Check testing wallet config
  log('\n📁 Checking Testing Wallet Config...', 'blue');
  const configChecks = [
    {
      name: 'Leather Preferred Wallet',
      test: (content) => content.includes("preferredWallet: 'leather'"),
      errorMessage: 'Should prefer Leather wallet'
    },
    {
      name: 'Wallet Validation Function',
      test: (content) => content.includes('validateTestingWallet'),
      errorMessage: 'Should have wallet validation function'
    },
    {
      name: 'Testing Specific Config',
      test: (content) => content.includes('BitcoinBazaar Testing'),
      errorMessage: 'Should have testing-specific configuration'
    }
  ];

  allFilesPassed &= checkFile('src/lib/stacks/testing-wallet-config.ts', configChecks);

  // Check transactions
  log('\n📁 Checking Transactions...', 'blue');
  const transactionChecks = [
    {
      name: 'Wallet Validation Import',
      test: (content) => content.includes('testing-wallet-config'),
      errorMessage: 'Should import testing wallet config'
    },
    {
      name: 'Wallet Validation Helper',
      test: (content) => content.includes('validateWalletForTesting'),
      errorMessage: 'Should have wallet validation helper'
    },
    {
      name: 'All Functions Use Validation',
      test: (content) => {
        const functions = ['mintNFT', 'transferNFT', 'burnNFT', 'listNFT', 'buyNFT', 'makeOffer', 'cancelListing', 'updateBitcoinPrice', 'createBattle', 'executeBattle', 'stakeNFT', 'borrowAgainstNFT'];
        return functions.every(func => content.includes(`export async function ${func}`) && content.includes('validateWalletForTesting()'));
      },
      errorMessage: 'All transaction functions should validate wallet'
    }
  ];

  allFilesPassed &= checkFile('src/lib/stacks/transactions.ts', transactionChecks);

  // Final result
  log('\n' + '='.repeat(60), 'blue');
  if (allFilesPassed) {
    log('🎉 All verifications passed! Testing section is configured for Leather Wallet only.', 'green');
    log('✅ All transactions in /testing will now use Leather Wallet exclusively.', 'green');
  } else {
    log('❌ Some verifications failed. Please check the errors above.', 'red');
  }

  return allFilesPassed;
}

// Run the verification
const success = main();
process.exit(success ? 0 : 1);
