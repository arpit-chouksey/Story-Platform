#!/bin/bash

echo "🚀 Setting up Story Protocol IP Platform..."

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
  echo "❌ Node.js 18+ is required. Current version: $(node -v)"
  exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo "📝 Creating .env.local file..."
  cat > .env.local << EOF
# Story Protocol API Key
NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=your_story_protocol_api_key_here

# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/

# Arweave Configuration
NEXT_PUBLIC_ARWEAVE_GATEWAY=https://arweave.net/
EOF
  echo "✅ Created .env.local - Please update with your API keys"
else
  echo "✅ .env.local already exists"
fi

# Build the project
echo "🔨 Building project..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To start the production server:"
echo "  npm start"
echo ""
echo "Don't forget to update .env.local with your API keys!"

