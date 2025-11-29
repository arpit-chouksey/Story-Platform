'use client'

import { useState } from 'react'
import { ShoppingBag, Play, Download, Wallet, TrendingUp, Search } from 'lucide-react'

interface Ringtone {
  id: string
  title: string
  artist: string
  duration: number
  price: string
  ipId: string
  downloads: number
  preview: string
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRingtone, setSelectedRingtone] = useState<Ringtone | null>(null)

  const ringtones: Ringtone[] = [
    {
      id: '1',
      title: 'Digital Notification',
      artist: 'AI Composer',
      duration: 5,
      price: '0.001',
      ipId: 'ip-123456',
      downloads: 1234,
      preview: '/preview1.mp3',
    },
    {
      id: '2',
      title: 'Neural Beep',
      artist: 'Crypto Musician',
      duration: 3,
      price: '0.0015',
      ipId: 'ip-789012',
      downloads: 856,
      preview: '/preview2.mp3',
    },
    {
      id: '3',
      title: 'Blockchain Ring',
      artist: 'Web3 Audio',
      duration: 4,
      price: '0.002',
      ipId: 'ip-345678',
      downloads: 2341,
      preview: '/preview3.mp3',
    },
  ]

  const filteredRingtones = ringtones.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Ringtone & Short Audio IP Marketplace</h1>
          <p className="text-gray-400">Browse ringtones, pay-per-download, auto-royalty distribution</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Marketplace */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <div className="card">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ringtones..."
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Ringtone Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredRingtones.map((ringtone) => (
                <div
                  key={ringtone.id}
                  className="card hover:scale-105 transition-all cursor-pointer"
                  onClick={() => setSelectedRingtone(ringtone)}
                >
                  <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{ringtone.title}</h3>
                  <p className="text-gray-400 mb-3">{ringtone.artist}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary-400">{ringtone.price} ETH</p>
                      <p className="text-xs text-gray-500">{ringtone.downloads} downloads</p>
                    </div>
                    <button className="btn-primary px-4 py-2 text-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-primary-400" />
                <h3 className="text-xl font-bold">Wallet</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Balance</span>
                  <span className="font-semibold">0.05 ETH</span>
                </div>
                <button className="w-full btn-primary text-sm">Add Funds</button>
              </div>
            </div>

            {/* Creator Storefront */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent-400" />
                <h3 className="text-xl font-bold">Your Storefront</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Total Sales</p>
                  <p className="text-2xl font-bold">0.123 ETH</p>
                </div>
                <div className="p-3 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Downloads</p>
                  <p className="text-2xl font-bold">4,431</p>
                </div>
                <button className="w-full btn-secondary text-sm">
                  Create Storefront
                </button>
              </div>
            </div>

            {/* IP Details */}
            {selectedRingtone && (
              <div className="card">
                <h3 className="text-xl font-bold mb-4">IP Asset Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Title</p>
                    <p className="font-semibold">{selectedRingtone.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Artist</p>
                    <p className="font-semibold">{selectedRingtone.artist}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">IP ID</p>
                    <p className="font-mono text-xs break-all">{selectedRingtone.ipId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Duration</p>
                    <p className="font-semibold">{selectedRingtone.duration}s</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Price</p>
                    <p className="font-semibold text-primary-400">{selectedRingtone.price} ETH</p>
                  </div>
                  <button className="w-full btn-primary text-sm mt-4">
                    Purchase & Download
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    View on Story Protocol
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

