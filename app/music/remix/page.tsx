'use client'

import { useState } from 'react'
import { Upload, Play, Pause, Download, CheckCircle2, Loader2, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { storyProtocol } from '@/lib/story-protocol'

interface Stem {
  id: string
  file: File
  name: string
  volume: number
  pan: number
  muted: boolean
}

export default function MusicRemixPage() {
  const [stems, setStems] = useState<Stem[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportedIP, setExportedIP] = useState<any>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newStems = acceptedFiles.map((file) => ({
        id: Date.now().toString() + Math.random(),
        file,
        name: file.name,
        volume: 100,
        pan: 0,
        muted: false,
      }))
      setStems((prev) => [...prev, ...newStems])
    },
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.ogg'],
    },
  })

  const handleRemoveStem = (id: string) => {
    setStems((prev) => prev.filter((s) => s.id !== id))
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simulate export and registration
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      const ipAsset = await storyProtocol.registerIP({
        hash: 'remix-' + Date.now(),
        metadata: {
          title: `Remix: ${stems.map(s => s.name).join(' + ')}`,
          description: 'Music remix created from multiple stems',
          type: 'music',
          tags: ['remix', 'music', 'stems'],
        },
        owner: '0x' + '0'.repeat(40),
      })

      setExportedIP(ipAsset)
    } catch (error) {
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Music Stem Remixing</h1>
          <p className="text-gray-400">Drag & drop stems, remix controls, export and auto-register IP</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stems Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Upload Area */}
            <div className="card">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                  transition-all duration-200
                  ${isDragActive ? 'border-primary-500 bg-primary-500/10' : 'border-dark-600 hover:border-primary-500/50'}
                `}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="font-semibold mb-2">
                  {isDragActive ? 'Drop audio stems here' : 'Drag & drop audio stems'}
                </p>
                <p className="text-sm text-gray-400">or click to browse</p>
              </div>
            </div>

            {/* Stems List */}
            {stems.length > 0 && (
              <div className="card space-y-4">
                <h3 className="text-xl font-bold">Stems ({stems.length})</h3>
                {stems.map((stem) => (
                  <div key={stem.id} className="bg-dark-700/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => handleRemoveStem(stem.id)}
                          className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                        <p className="font-semibold truncate">{stem.name}</p>
                      </div>
                      <button
                        onClick={() => {
                          setStems((prev) =>
                            prev.map((s) =>
                              s.id === stem.id ? { ...s, muted: !s.muted } : s
                            )
                          )
                        }}
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          stem.muted
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-primary-500/20 text-primary-300'
                        }`}
                      >
                        {stem.muted ? 'Muted' : 'Active'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-sm text-gray-400">Volume: {stem.volume}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={stem.volume}
                          onChange={(e) => {
                            setStems((prev) =>
                              prev.map((s) =>
                                s.id === stem.id ? { ...s, volume: parseInt(e.target.value) } : s
                              )
                            )
                          }}
                          className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Pan: {stem.pan}</label>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={stem.pan}
                          onChange={(e) => {
                            setStems((prev) =>
                              prev.map((s) =>
                                s.id === stem.id ? { ...s, pan: parseInt(e.target.value) } : s
                              )
                            )
                          }}
                          className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Remix Controls</h3>
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
                      <span>Play Remix</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleExport}
                  disabled={stems.length === 0 || isExporting}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Export & Register IP</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {exportedIP && (
              <div className="card bg-green-500/10 border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-300">Remix Registered!</span>
                </div>
                <p className="text-sm text-gray-400 font-mono break-all">
                  IP ID: {exportedIP.id}
                </p>
              </div>
            )}

            <div className="card">
              <h4 className="font-semibold mb-2">Share as Short Audio</h4>
              <p className="text-sm text-gray-400 mb-4">
                Export a TikTok-style 15-60 second clip
              </p>
              <button className="w-full btn-secondary text-sm">
                Create Short Clip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

