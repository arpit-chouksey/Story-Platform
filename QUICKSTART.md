# Quick Start Guide

Get up and running with the Story Protocol IP Platform in 5 minutes!

## 🚀 Installation

### Option 1: Automated Setup (Recommended)

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Option 2: Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Apps

### 1. IP Registration (`/ip-registration`)
- Upload files (images, audio, video, text, code)
- Automatic hash calculation
- Register on Story Protocol
- View IP asset details

### 2. AI Chat (`/ai-chat`)
- Conversational AI interface
- Auto-register AI outputs as IP
- Version history and lineage tracking
- Toggle auto-registration on/off

### 3. Music Apps (`/music`)

#### Stem Remixing (`/music/remix`)
- Drag & drop audio stems
- Volume and pan controls
- Export and register remix IP

#### Web3 Streaming (`/music/streaming`)
- Per-stream micropayments
- Creator dashboard
- IP asset details

#### Music-Meme Sync (`/music/sync`)
- Upload meme/video + music
- Auto-sync functionality
- Export synced content as IP

#### On-chain Mixer (`/music/mixer`)
- Live multi-layer mixing
- Real-time effects
- Save and register on-chain

#### Marketplace (`/music/marketplace`)
- Browse ringtones
- Pay-per-download
- Creator storefronts

## 🔑 Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=your_key_here
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
NEXT_PUBLIC_ARWEAVE_GATEWAY=https://arweave.net/
```

## 🛠️ Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🚢 Deployment

### Vercel (Easiest)

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📚 Next Steps

1. **Integrate Story Protocol SDK**
   - Update `lib/story-protocol.ts` with actual SDK
   - Replace mock implementations

2. **Connect IPFS/Arweave**
   - Configure IPFS node in `lib/storage.ts`
   - Set up Arweave wallet

3. **Add Wallet Connection**
   - Integrate MetaMask/WalletConnect
   - Update wallet connection in Navigation

4. **Customize Design**
   - Modify colors in `tailwind.config.ts`
   - Update components as needed

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Type errors
```bash
# Check TypeScript
npx tsc --noEmit
```

## 📖 Documentation

- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [Story Protocol Docs](https://docs.story.foundation/) - SDK documentation

## 💡 Tips

- Use the browser dev tools to inspect network requests
- Check the console for any errors
- All IP registrations are currently mocked - integrate real SDK for production
- File uploads are simulated - connect to real IPFS/Arweave for storage

## 🎉 You're Ready!

Start exploring the apps and customize them for your needs!

