'use client'

import { useState } from 'react'
import { Upload, Music, Video, CheckCircle2, Loader2, Play } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { storyProtocol } from '@/lib/story-protocol'

export default function MusicSyncPage() {
  const [memeFile, setMemeFile] = useState<File | null>(null)
  const [musicFile, setMusicFile] = useState<File | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportedIP, setExportedIP] = useState<any>(null)

  const memeDropzone = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) setMemeFile(acceptedFiles[0])
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov'],
    },
  })

  const musicDropzone = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) setMusicFile(acceptedFiles[0])
    },
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.ogg'],
    },
  })

  const handleSync = async () => {
    if (!memeFile || !musicFile) return

    setIsSyncing(true)
    // Simulate sync process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSyncing(false)
  }

  const handleExport = async () => {
    if (!memeFile || !musicFile) return

    setIsExporting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      const ipAsset = await storyProtocol.registerIP({
        hash: 'sync-' + Date.now(),
        metadata: {
          title: `Synced: ${memeFile.name} + ${musicFile.name}`,
          description: 'Music synced with meme/video',
          type: 'music',
          tags: ['sync', 'meme', 'music', 'remix'],
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
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Music → Meme Syncing Tool</h1>
          <p className="text-gray-400">Upload meme or video, auto-sync music, export + register remix IP</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Meme/Video Upload */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-primary-400" />
              <h3 className="text-xl font-bold">Meme / Video</h3>
            </div>
            <div
              {...memeDropzone.getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center
                ${memeDropzone.isDragActive ? 'border-primary-500 bg-primary-500/10' : 'border-dark-600 hover:border-primary-500/50'}
              `}
            >
              <input {...memeDropzone.getInputProps()} />
              {memeFile ? (
                <div className="space-y-2">
                  <Video className="w-12 h-12 mx-auto text-primary-400" />
                  <p className="font-semibold">{memeFile.name}</p>
                  <p className="text-sm text-gray-400">
                    {(memeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <>
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-semibold mb-2">Drop meme/video here</p>
                  <p className="text-sm text-gray-400">or click to browse</p>
                </>
              )}
            </div>
          </div>

          {/* Music Upload */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-accent-400" />
              <h3 className="text-xl font-bold">Music Track</h3>
            </div>
            <div
              {...musicDropzone.getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center
                ${musicDropzone.isDragActive ? 'border-accent-500 bg-accent-500/10' : 'border-dark-600 hover:border-accent-500/50'}
              `}
            >
              <input {...musicDropzone.getInputProps()} />
              {musicFile ? (
                <div className="space-y-2">
                  <Music className="w-12 h-12 mx-auto text-accent-400" />
                  <p className="font-semibold">{musicFile.name}</p>
                  <p className="text-sm text-gray-400">
                    {(musicFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <>
                  <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-semibold mb-2">Drop music here</p>
                  <p className="text-sm text-gray-400">or click to browse</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Preview & Controls */}
        {memeFile && musicFile && (
          <div className="card space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Synced Preview</h3>
              <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 text-primary-400" />
                  <p className="text-gray-400">Preview synced content</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Music className="w-5 h-5" />
                    <span>Auto-Sync Music</span>
                  </>
                )}
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Export & Register IP</span>
                  </>
                )}
              </button>
            </div>

            {exportedIP && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-300">Remix IP Registered!</span>
                </div>
                <p className="text-sm text-gray-400 font-mono break-all">
                  IP ID: {exportedIP.id}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

