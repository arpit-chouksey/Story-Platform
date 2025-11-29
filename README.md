# Story Protocol IP Platform

A comprehensive Web3 IP (Intellectual Property) management platform with Story Protocol integration. This platform provides intuitive, aesthetic, and user-friendly front-ends for IP × AI use cases, seamlessly integrating with the Story SDK, IP registration, and IP asset interactions.

## 🚀 Features

### 1. IP Registration App
- Upload files (art, text, code, music, research, AI outputs)
- Automatic hash calculation and storage on IPFS/Arweave
- Register IP on Story Protocol
- View ownership, license, lineage, and royalties
- Manage permissions and access keys

### 2. ChatGPT-like AI Interface with Auto-IP Registration
- Conversational UI with AI-generated responses
- Automatic IP registration for all AI outputs
- IP status indicator and version history
- Lineage tracking (derivative IP mapping)
- Toggle to enable/disable auto-registration

### 3. Music-Focused IP Apps

#### A. Music Stem Remixing App
- Drag & drop stems interface
- Remix controls (volume, pan, mute)
- Export and auto-register IP
- Share as TikTok-style short audio

#### B. Web3 Music Streaming App
- Per-stream micropayments
- Creator royalty dashboard
- User subscription management
- Audio player with IP details

#### C. Music → Meme Syncing Tool
- Upload meme or video
- Auto-sync music
- Export + register remix IP

#### D. On-chain Music Mixer
- Live layer mixer with multiple tracks
- Real-time effects (reverb, delay, distortion)
- Save mix session
- Register composition on-chain

#### E. Ringtone & Short Audio IP Marketplace
- Browse ringtones and short audio clips
- Pay-per-download functionality
- Auto-royalty distribution
- Creator storefronts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Framer Motion
- **Icons**: Lucide React
- **Web3**: Ethers.js, Wagmi, Viem
- **Storage**: IPFS, Arweave
- **IP Protocol**: Story Protocol SDK
- **State Management**: Zustand, React Query

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd story-protocol-ip-apps
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=your_api_key_here
   NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
   NEXT_PUBLIC_ARWEAVE_GATEWAY=https://arweave.net/
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── ip-registration/   # IP Registration app
│   ├── ai-chat/           # AI Chat with auto-IP
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
│   └── storage.ts        # IPFS/Arweave utilities
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Blue/Cyan gradient (`primary-500` to `primary-600`)
- **Accent**: Purple/Pink gradient (`accent-500` to `accent-600`)
- **Dark**: Dark theme palette (`dark-700` to `dark-900`)
- **Gradients**: Used for buttons, backgrounds, and highlights

### Typography
- **Sans**: Inter (primary font)
- **Mono**: JetBrains Mono (for code/IP IDs)

### Components
- **Glass morphism**: Cards with backdrop blur
- **Gradient buttons**: Primary and secondary variants
- **Input fields**: Consistent styling with focus states
- **Animations**: Fade-in, slide-up, pulse effects

## 🔌 API Integration Points

### Story Protocol SDK
- `registerIP()`: Register new IP assets
- `getIPAsset()`: Fetch IP asset details
- `updateIPMetadata()`: Update IP metadata
- `setRoyalties()`: Configure royalty settings
- `grantPermission()`: Manage access permissions
- `getLineage()`: Track derivative relationships

### Storage Services
- **IPFS**: File upload and hash generation
- **Arweave**: Permanent storage
- **Hash Calculation**: SHA-256 for file integrity

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Environment Variables on Vercel**
   - `NEXT_PUBLIC_STORY_PROTOCOL_API_KEY`
   - `NEXT_PUBLIC_IPFS_GATEWAY`
   - `NEXT_PUBLIC_ARWEAVE_GATEWAY`

### Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Story Protocol Integration

Update `lib/story-protocol.ts` with your actual Story Protocol SDK implementation:

```typescript
import { StoryProtocolSDK } from '@story-protocol/core-sdk'

export const storyProtocol = new StoryProtocolSDK({
  apiKey: process.env.NEXT_PUBLIC_STORY_PROTOCOL_API_KEY,
  // Add other configuration
})
```

### IPFS Configuration

Update `lib/storage.ts` with your IPFS node:

```typescript
import { create } from 'ipfs-http-client'

const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  // Add authentication if needed
})
```

## 📱 Mobile Responsiveness

All apps are fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🔐 Security Considerations

- Never commit API keys or private keys
- Use environment variables for sensitive data
- Implement proper wallet connection validation
- Validate file uploads and sizes
- Sanitize user inputs

## 🧪 Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Check the Story Protocol documentation
- Review the code comments

## 🎯 Roadmap

- [ ] Complete Story Protocol SDK integration
- [ ] Implement actual IPFS/Arweave uploads
- [ ] Add wallet connection (MetaMask, WalletConnect)
- [ ] Implement royalty distribution
- [ ] Add IP asset marketplace
- [ ] Create mobile apps (React Native)
- [ ] Add analytics and tracking
- [ ] Implement user authentication
- [ ] Add social features (sharing, comments)

## 🙏 Acknowledgments

- Story Protocol for the IP infrastructure
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

---

Built with ❤️ for the Web3 IP ecosystem

