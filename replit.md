# Story Protocol IP Platform - Replit Configuration

## Overview
A comprehensive Web3 IP (Intellectual Property) management platform with Story Protocol integration. This platform provides intuitive front-ends for IP × AI use cases, seamlessly integrating with the Story SDK, IP registration, and IP asset interactions.

**Project Status**: Imported from GitHub and configured for Replit environment  
**Last Updated**: November 30, 2025

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Framer Motion
- **Icons**: Lucide React
- **Web3**: Ethers.js, Wagmi, Viem
- **Storage**: IPFS, Arweave
- **IP Protocol**: Story Protocol SDK (@story-protocol/core-sdk)
- **State Management**: Zustand, React Query

## Project Structure
```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── ip-registration/   # IP Registration app
│   ├── ai-chat/           # AI Chat with auto-IP registration
│   └── music/             # Music apps
│       ├── remix/         # Stem remixing
│       ├── streaming/     # Web3 streaming
│       ├── sync/          # Music-meme sync
│       ├── mixer/         # On-chain mixer
│       └── marketplace/   # Ringtone marketplace
├── components/            # React components
│   ├── layout/           # Layout components
│   └── providers/        # Context providers
├── lib/                  # Utilities and SDKs
│   ├── story-protocol.ts # Story Protocol integration
│   ├── storage.ts        # IPFS/Arweave utilities
│   ├── ai.ts            # AI utilities
│   └── wallet-client.ts # Wallet utilities
└── package.json          # Dependencies
```

## Features
1. **IP Registration App** - Upload and register IP on Story Protocol
2. **AI Chat Interface** - Conversational UI with auto-IP registration for AI outputs
3. **Music Apps**:
   - Stem Remixing
   - Web3 Streaming with micropayments
   - Music-Meme Syncing
   - On-chain Music Mixer
   - Ringtone & Audio Marketplace

## Replit Environment Setup

### Port Configuration
- **Development**: Port 5000 (0.0.0.0)
- **Production**: Port 5000 (0.0.0.0)

### Next.js Configuration
The `next.config.js` has been configured for Replit:
- Runs on port 5000 with host `0.0.0.0`
- Allows cross-origin requests from Replit proxy (`allowedDevOrigins: ['*']`)
- Webpack fallbacks for Node.js modules (fs, net, tls)

### Workflow
- **Name**: Next.js Dev Server
- **Command**: `npm run dev`
- **Output Type**: webview
- **Port**: 5000

### Deployment Configuration
- **Target**: autoscale (stateless website)
- **Build**: `npm run build`
- **Run**: `npm start`

## Environment Variables

The application requires the following environment variables (create `.env.local`):

```env
NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=your_api_key_here
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
NEXT_PUBLIC_ARWEAVE_GATEWAY=https://arweave.net/
NEXT_PUBLIC_RPC_URL=https://aeneid-rpc.story.foundation
NEXT_PUBLIC_CHAIN_ID=aeneid
```

**Note**: These are optional for development. The app includes mock implementations for demonstration purposes.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Known Issues & Notes

1. **IPFS/Arweave**: Currently using mock implementations. Real storage integration requires API keys.
2. **Story Protocol**: SDK is integrated but requires proper RPC configuration and wallet setup.
3. **Wallet Connection**: Requires user to connect Web3 wallet (MetaMask, WalletConnect, etc.)
4. **Dependencies**: Some dependencies are deprecated (IPFS libs) - see npm warnings.

## User Preferences
- None documented yet

## Recent Changes

### November 30, 2025
- Imported project from GitHub
- Configured Next.js to run on port 5000 with host 0.0.0.0
- Updated package.json scripts for Replit environment
- Added `allowedDevOrigins` to next.config.js for Replit proxy support
- Set up workflow for Next.js dev server
- Configured deployment for Replit (autoscale)
- Installed all npm dependencies successfully
- Verified application runs without errors

## Documentation References
- [README.md](./README.md) - Full project documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [STORY_PROTOCOL_SETUP.md](./STORY_PROTOCOL_SETUP.md) - Story Protocol setup
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Troubleshooting guide
