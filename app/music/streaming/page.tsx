'use client'

import { useState } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, Wallet, TrendingUp } from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  ipId: string
  royaltyPercentage: number
}

export default function MusicStreamingPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const tracks: Track[] = [
    {
      id: '1',
      title: 'Digital Dreams',
      artist: 'AI Composer',
      duration: 180,
      ipId: 'ip-123456',
      royaltyPercentage: 5,
    },
    {
      id: '2',
      title: 'Neural Beats',
      artist: 'Crypto Musician',
      duration: 240,
      ipId: 'ip-789012',
      royaltyPercentage: 7.5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Web3 Music Streaming</h1>
          <p className="text-gray-400">Per-stream micropayments, creator royalty dashboard</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary-500/30 mx-auto mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary-400" />
                  </div>
                  <p className="text-gray-400">Album Art</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Digital Dreams</h3>
                  <p className="text-gray-400">AI Composer</p>
                </div>

                <div className="space-y-2">
                  <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                      style={{ width: `${(currentTime / 180) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
                    <span>3:00</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button className="p-3 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-110 transition-transform"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                  <button className="p-3 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="flex-1 h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Track List */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Playlist</h3>
              <div className="space-y-2">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => setCurrentTrack(track)}
                    className="p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{track.title}</p>
                        <p className="text-sm text-gray-400">{track.artist}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}</p>
                        <p className="text-xs text-primary-400 font-mono">IP: {track.ipId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet & Payments */}
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
                <div className="flex justify-between">
                  <span className="text-gray-400">Per Stream</span>
                  <span className="font-semibold">0.001 ETH</span>
                </div>
                <button className="w-full btn-primary text-sm">Add Funds</button>
              </div>
            </div>

            {/* Creator Dashboard */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent-400" />
                <h3 className="text-xl font-bold">Creator Dashboard</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Total Streams</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="p-3 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Earnings</p>
                  <p className="text-2xl font-bold">0.123 ETH</p>
                </div>
                <div className="p-3 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Royalty Rate</p>
                  <p className="text-2xl font-bold">5%</p>
                </div>
              </div>
            </div>

            {/* IP Details */}
            {currentTrack && (
              <div className="card">
                <h3 className="text-xl font-bold mb-4">IP Asset Details</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-400">IP ID</p>
                    <p className="font-mono break-all">{currentTrack.ipId}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Royalty</p>
                    <p className="font-semibold">{currentTrack.royaltyPercentage}%</p>
                  </div>
                  <button className="w-full btn-secondary text-sm mt-4">
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

