'use client'

import { useState } from 'react'
import { Sliders, Play, Pause, Save, CheckCircle2, Loader2 } from 'lucide-react'
import { storyProtocol } from '@/lib/story-protocol'

interface Layer {
  id: string
  name: string
  volume: number
  pan: number
  effects: {
    reverb: number
    delay: number
    distortion: number
  }
  muted: boolean
}

export default function MusicMixerPage() {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: 'Bass',
      volume: 75,
      pan: 0,
      effects: { reverb: 20, delay: 10, distortion: 0 },
      muted: false,
    },
    {
      id: '2',
      name: 'Drums',
      volume: 80,
      pan: -10,
      effects: { reverb: 15, delay: 5, distortion: 5 },
      muted: false,
    },
    {
      id: '3',
      name: 'Melody',
      volume: 70,
      pan: 10,
      effects: { reverb: 30, delay: 15, distortion: 0 },
      muted: false,
    },
  ])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedIP, setSavedIP] = useState<any>(null)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      const ipAsset = await storyProtocol.registerIP({
        hash: 'mix-' + Date.now(),
        metadata: {
          title: `Live Mix Session: ${new Date().toLocaleDateString()}`,
          description: `Mix with ${layers.length} layers`,
          type: 'music',
          tags: ['mix', 'live', 'on-chain'],
        },
        owner: '0x' + '0'.repeat(40),
      })

      setSavedIP(ipAsset)
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">On-chain Music Mixer</h1>
          <p className="text-gray-400">Live layer mixer, save mix session, register composition on-chain</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Mixer Layers */}
          <div className="lg:col-span-3 space-y-4">
            {layers.map((layer) => (
              <div key={layer.id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sliders className="w-5 h-5 text-primary-400" />
                    <h3 className="text-xl font-bold">{layer.name}</h3>
                  </div>
                  <button
                    onClick={() => {
                      setLayers((prev) =>
                        prev.map((l) =>
                          l.id === layer.id ? { ...l, muted: !l.muted } : l
                        )
                      )
                    }}
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      layer.muted
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-primary-500/20 text-primary-300'
                    }`}
                  >
                    {layer.muted ? 'Muted' : 'Active'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Volume: {layer.volume}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={layer.volume}
                      onChange={(e) => {
                        setLayers((prev) =>
                          prev.map((l) =>
                            l.id === layer.id
                              ? { ...l, volume: parseInt(e.target.value) }
                              : l
                          )
                        )
                      }}
                      className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Pan: {layer.pan}
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={layer.pan}
                      onChange={(e) => {
                        setLayers((prev) =>
                          prev.map((l) =>
                            l.id === layer.id
                              ? { ...l, pan: parseInt(e.target.value) }
                              : l
                          )
                        )
                      }}
                      className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Reverb</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.effects.reverb}
                        onChange={(e) => {
                          setLayers((prev) =>
                            prev.map((l) =>
                              l.id === layer.id
                                ? {
                                    ...l,
                                    effects: {
                                      ...l.effects,
                                      reverb: parseInt(e.target.value),
                                    },
                                  }
                                : l
                            )
                          )
                        }}
                        className="w-full h-1.5 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-accent-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Delay</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.effects.delay}
                        onChange={(e) => {
                          setLayers((prev) =>
                            prev.map((l) =>
                              l.id === layer.id
                                ? {
                                    ...l,
                                    effects: {
                                      ...l.effects,
                                      delay: parseInt(e.target.value),
                                    },
                                  }
                                : l
                            )
                          )
                        }}
                        className="w-full h-1.5 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-accent-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Distortion</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.effects.distortion}
                        onChange={(e) => {
                          setLayers((prev) =>
                            prev.map((l) =>
                              l.id === layer.id
                                ? {
                                    ...l,
                                    effects: {
                                      ...l.effects,
                                      distortion: parseInt(e.target.value),
                                    },
                                  }
                                : l
                            )
                          )
                        }}
                        className="w-full h-1.5 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-accent-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Master Controls</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Play Mix</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save & Register</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {savedIP && (
              <div className="card bg-green-500/10 border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-300">Mix Registered!</span>
                </div>
                <p className="text-sm text-gray-400 font-mono break-all">
                  IP ID: {savedIP.id}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Composition saved on-chain via Story Protocol
                </p>
              </div>
            )}

            <div className="card">
              <h4 className="font-semibold mb-2">Session Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Layers</span>
                  <span className="font-semibold">{layers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active</span>
                  <span className="font-semibold">
                    {layers.filter((l) => !l.muted).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

