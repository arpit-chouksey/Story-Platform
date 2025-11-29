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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-300">Web3 IP Management Platform</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Story Protocol</span>
            <br />
            IP Platform
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Create, register, and manage intellectual property on-chain with seamless
            integration to Story Protocol, IPFS, and Arweave.
          </p>
        </div>

        {/* App Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <Link
                key={app.href}
                href={app.href}
                className="group card hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-100">{app.title}</h3>
                <p className="text-gray-400 mb-4">{app.description}</p>
                <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                  <span className="text-sm font-semibold">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            'IPFS/Arweave Storage',
            'Story Protocol Integration',
            'Automatic IP Registration',
            'Royalty Management',
          ].map((feature) => (
            <div key={feature} className="card text-center">
              <p className="text-sm text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

