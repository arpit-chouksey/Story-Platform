import Link from 'next/link'
import { ArrowRight, Sparkles, Music, MessageSquare, FileText } from 'lucide-react'

export default function Home() {
  const apps = [
    {
      title: 'IP Registration',
      description: 'Upload, hash, and register your IP assets on Story Protocol',
      icon: FileText,
      href: '/ip-registration',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI Chat with Auto-IP',
      description: 'Conversational AI that automatically registers outputs as IP',
      icon: MessageSquare,
      href: '/ai-chat',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Music Apps',
      description: 'Remix, stream, sync, and trade music IP assets',
      icon: Music,
      href: '/music',
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="relative text-center mb-20 animate-fade-in py-12 overflow-hidden">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0',
            }}
          />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 border border-vercel-gray-800 rounded-full px-4 py-1.5 mb-8 bg-vercel-gray-950">
              <Sparkles className="w-3.5 h-3.5 text-vercel-gray-400" />
              <span className="text-xs text-vercel-gray-400 font-medium">Web3 IP Management Platform</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold mb-6 tracking-tight">
              <span className="text-white">Story Protocol</span>
              <br />
              <span className="text-vercel-gray-400">IP Platform</span>
            </h1>
            <p className="text-lg text-vercel-gray-400 max-w-2xl mx-auto mb-12">
              Create, register, and manage intellectual property on-chain with seamless
              integration to Story Protocol, IPFS, and Arweave.
            </p>
          </div>
        </div>

        {/* App Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <Link
                key={app.href}
                href={app.href}
                className="group card cursor-pointer"
              >
                <div className="w-10 h-10 rounded-md bg-vercel-gray-900 border border-vercel-gray-800 flex items-center justify-center mb-4 group-hover:border-vercel-gray-700 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{app.title}</h3>
                <p className="text-sm text-vercel-gray-400 mb-4">{app.description}</p>
                <div className="flex items-center text-vercel-gray-400 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-3">
          {[
            'IPFS/Arweave Storage',
            'Story Protocol Integration',
            'Automatic IP Registration',
            'Royalty Management',
          ].map((feature) => (
            <div key={feature} className="card text-center py-4">
              <p className="text-sm text-vercel-gray-400 font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

