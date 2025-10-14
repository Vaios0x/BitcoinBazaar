#!/bin/bash

echo "🚀 Setting up BitcoinBazaar Development Environment"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js 18+ first."
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js version 18+ required. Current version: $(node -v)"
  exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if Clarinet is installed
if ! command -v clarinet &> /dev/null; then
  echo "📦 Installing Clarinet..."
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    curl -L https://github.com/hirosystems/clarinet/releases/download/latest/clarinet-linux-x64.tar.gz | tar xz
    sudo mv clarinet /usr/local/bin/
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    curl -L https://github.com/hirosystems/clarinet/releases/download/latest/clarinet-macos-x64.tar.gz | tar xz
    sudo mv clarinet /usr/local/bin/
  else
    echo "❌ Unsupported OS. Please install Clarinet manually."
    exit 1
  fi
fi

echo "✅ Clarinet installed"

# Setup environment
echo "⚙️ Setting up environment..."
if [ ! -f .env.local ]; then
  cp env.example .env.local
  echo "📝 Created .env.local from template"
  echo "⚠️  Please edit .env.local with your configuration"
fi

# Run tests
echo "🧪 Running smart contract tests..."
clarinet test

if [ $? -eq 0 ]; then
  echo "✅ All tests passed!"
else
  echo "❌ Some tests failed. Please check the output above."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Run 'clarinet deploy --testnet' to deploy contracts"
echo ""
echo "Happy coding! 🚀"
