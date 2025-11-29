# Story Protocol SDK Setup Guide

This project now uses the **official Story Protocol SDK** (`@story-protocol/core-sdk`) instead of mock implementations.

## ✅ What's Changed

- ✅ Real Story Protocol SDK integration
- ✅ Wallet connection support (MetaMask, WalletConnect)
- ✅ IP Asset registration on-chain
- ✅ License management
- ✅ Royalty configuration
- ✅ Lineage tracking

## 📦 Installation

The SDK is already installed in `package.json`. If you need to reinstall:

```bash
npm install @story-protocol/core-sdk viem
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following:

```env
# Story Protocol RPC Configuration
NEXT_PUBLIC_RPC_URL=https://aeneid-rpc.story.foundation
NEXT_PUBLIC_CHAIN_ID=aeneid

# Optional: For server-side operations (keep secret!)
WALLET_PRIVATE_KEY=0x_your_private_key_here
RPC_PROVIDER_URL=https://aeneid-rpc.story.foundation

# IP Organization & License Template IDs
NEXT_PUBLIC_IP_ORG_ID=1
NEXT_PUBLIC_LICENSE_TEMPLATE_ID=1

# Storage
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
NEXT_PUBLIC_ARWEAVE_GATEWAY=https://arweave.net/
```

### Chain IDs

- **Testnet (Aeneid)**: `aeneid`
- **Mainnet**: Check [Story Protocol docs](https://docs.story.foundation/) for mainnet chain ID

## 🔌 Usage

### Client-Side (Wallet Connection)

The app automatically connects to wallets when users click "Connect Wallet" in the navigation.

```typescript
import { initStoryClientWithWallet } from '@/lib/wallet-client'

// This is called automatically when user connects wallet
const client = await initStoryClientWithWallet()
```

### Server-Side (Private Key)

For server-side operations, set `WALLET_PRIVATE_KEY` in your environment:

```typescript
import { storyProtocol } from '@/lib/story-protocol'

// Client is automatically initialized with private key
await storyProtocol.registerIP({
  hash: 'file-hash',
  ipfsHash: 'Qm...',
  metadata: {
    title: 'My IP Asset',
    type: 'art',
  },
  owner: '0x...',
})
```

## 📚 SDK Methods

### Register IP Asset

```typescript
const ipAsset = await storyProtocol.registerIP({
  hash: 'file-hash',
  ipfsHash: 'Qm...',
  metadata: {
    title: 'My Artwork',
    description: 'A beautiful piece',
    type: 'art',
    tags: ['digital', 'nft'],
  },
  owner: '0x...',
})
```

### Get IP Asset

```typescript
const asset = await storyProtocol.getIPAsset('ip-asset-id')
```

### Update Metadata

```typescript
await storyProtocol.updateIPMetadata('ip-asset-id', {
  title: 'Updated Title',
  description: 'New description',
})
```

### Set Royalties

```typescript
await storyProtocol.setRoyalties('ip-asset-id', {
  percentage: 10,
  recipients: [
    { address: '0x...', percentage: 10 },
  ],
})
```

### Grant Permissions (License)

```typescript
await storyProtocol.grantPermission('ip-asset-id', {
  type: 'commercial',
  grantedTo: '0x...',
})
```

### Get Lineage

```typescript
const lineage = await storyProtocol.getLineage('ip-asset-id')
// Returns array of derivative IP assets
```

## 🔐 Security Notes

1. **Never commit private keys** - Always use environment variables
2. **Client-side operations** - Use wallet connection (user signs transactions)
3. **Server-side operations** - Use private key only in secure environments
4. **Environment variables** - `.env.local` is in `.gitignore`

## 🧪 Testing

### Testnet Setup

1. Get testnet tokens from Story Protocol faucet (if available)
2. Connect MetaMask to Aeneid testnet
3. Use testnet RPC: `https://aeneid-rpc.story.foundation`

### Mainnet Setup

1. Update `NEXT_PUBLIC_CHAIN_ID` to mainnet chain ID
2. Update `NEXT_PUBLIC_RPC_URL` to mainnet RPC
3. Ensure you have sufficient funds for gas

## 📖 Documentation

- [Story Protocol SDK Docs](https://docs.story.foundation/developers/typescript-sdk)
- [Story Protocol GitHub](https://github.com/storyprotocol/sdk)
- [Viem Documentation](https://viem.sh/) (used by SDK)

## 🐛 Troubleshooting

### "Story Protocol client not initialized"

**Solution**: Connect your wallet or set `WALLET_PRIVATE_KEY` in environment variables.

### "Failed to register IP asset"

**Possible causes**:
- Insufficient funds for gas
- Wrong chain ID
- Invalid IP Organization ID
- RPC endpoint not accessible

**Solution**: Check your environment variables and wallet balance.

### "No wallet found"

**Solution**: Install MetaMask or another Web3 wallet browser extension.

## 🚀 Next Steps

1. **Get IP Organization ID**: Create or join an IP Organization on Story Protocol
2. **Set up License Templates**: Create license templates for your use case
3. **Configure Royalties**: Set up royalty policies
4. **Test on Testnet**: Test all features on Aeneid testnet first

---

**The SDK is now fully integrated!** Your app can now register real IP assets on Story Protocol. 🎉

