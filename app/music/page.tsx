'use client'

import Link from 'next/link'
import { Music, Layers, Radio, Video, Sliders, ShoppingBag } from 'lucide-react'

export default function MusicPage() {
  const musicApps = [
    {
      title: 'Music Stem Remixing',
      description: 'Drag & drop stems, remix controls, export and auto-register IP',
      icon: Layers,
      href: '/music/remix',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Web3 Music Streaming',
      description: 'Per-stream micropayments, creator royalty dashboard',
      icon: Radio,
      href: '/music/streaming',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Music → Meme Syncing',
      description: 'Upload meme/video, auto-sync music, export + register remix IP',
      icon: Video,
      href: '/music/sync',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'On-chain Music Mixer',
      description: 'Live layer mixer, save mix session, register composition on-chain',
      icon: Sliders,
      href: '/music/mixer',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Ringtone Marketplace',
      description: 'Browse ringtones, pay-per-download, auto-royalty distribution',
      icon: ShoppingBag,
      href: '/music/marketplace',
      gradient: 'from-yellow-500 to-amber-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-4 py-2 mb-6">
            <Music className="w-5 h-5 text-accent-400" />
            <span className="text-sm text-accent-300">Music IP Applications</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gradient">Music-Focused IP Apps</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create, remix, stream, and trade music IP assets with seamless Story Protocol integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicApps.map((app) => {
            const Icon = app.icon
            return (
              <Link
                key={app.href}
                href={app.href}
                className="group card hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-100">{app.title}</h3>
                <p className="text-gray-400">{app.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

