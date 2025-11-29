'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle2, Loader2, Hash, Link as LinkIcon, Wallet, AlertCircle } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '@/lib/storage'
import { storyProtocol, type IPAsset } from '@/lib/story-protocol'
import { initStoryClientWithWallet } from '@/lib/wallet-client'

type Step = 'upload' | 'metadata' | 'registering' | 'complete'

export default function IPRegistrationPage() {
  const [step, setStep] = useState<Step>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    type: 'art' as const,
    tags: '',
    license: '',
  })
  const [registeredIP, setRegisteredIP] = useState<IPAsset | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          // Initialize client if not already initialized
          initStoryClientWithWallet()
        }
      })
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    setError('')
    
    // Check if wallet is available
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('No Web3 wallet found. Please install MetaMask or another Web3 wallet extension.')
      setIsConnecting(false)
      return
    }

    try {
      const client = await initStoryClientWithWallet()
      
      // Get the connected account
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0])
          console.log('Wallet connected successfully:', accounts[0])
        } else {
          throw new Error('No accounts found after connection')
        }
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error)
      const errorMessage = error.message || 'Failed to connect wallet. Please make sure MetaMask is installed and try again.'
      setError(errorMessage)
    } finally {
      setIsConnecting(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setFile(acceptedFiles[0])
        setStep('metadata')
      }
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'audio/*': ['.mp3', '.wav', '.flac', '.ogg'],
      'video/*': ['.mp4', '.webm', '.mov'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md'],
      'application/json': ['.json'],
    },
  })

  const handleRegister = async () => {
    if (!file) return

    // Check if wallet is connected
    if (!walletAddress) {
      setError('Please connect your wallet first')
      await connectWallet()
      return
    }

    setIsProcessing(true)
    setStep('registering')
    setError('')

    try {
      // Ensure client is initialized
      if (!storyProtocol.client) {
        try {
          await initStoryClientWithWallet()
          // Update wallet address after connection
          if (typeof window !== 'undefined' && window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' })
            if (accounts && accounts.length > 0) {
              setWalletAddress(accounts[0])
            }
          }
        } catch (error: any) {
          throw new Error(`Failed to initialize Story Protocol client: ${error.message || 'Please connect your wallet'}`)
        }
      }

      // Upload to IPFS/Arweave
      const storageResult = await uploadFile(file)

      // Register on Story Protocol
      const ipAsset = await storyProtocol.registerIP({
        hash: storageResult.hash,
        ipfsHash: storageResult.ipfsHash,
        arweaveId: storageResult.arweaveId,
        metadata: {
          title: metadata.title || file.name,
          description: metadata.description,
          type: metadata.type,
          tags: metadata.tags.split(',').map(t => t.trim()).filter(Boolean),
          license: metadata.license,
        },
        owner: walletAddress,
      })

      setRegisteredIP(ipAsset)
      setStep('complete')
    } catch (error: any) {
      console.error('Registration error:', error)
      setError(error.message || 'Failed to register IP. Please make sure your wallet is connected and you have sufficient funds.')
      setStep('metadata')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">IP Registration</h1>
          <p className="text-gray-400">Upload, hash, and register your IP assets on Story Protocol</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-4">
          {[
            { key: 'upload', label: 'Upload' },
            { key: 'metadata', label: 'Metadata' },
            { key: 'registering', label: 'Registering' },
            { key: 'complete', label: 'Complete' },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${step === s.key ? 'bg-primary-500 text-white' : ''}
                  ${['registering', 'complete'].includes(step) && i < 2 ? 'bg-primary-500 text-white' : ''}
                  ${step === 'complete' && i < 3 ? 'bg-primary-500 text-white' : ''}
                  ${!['registering', 'complete'].includes(step) && i > 0 ? 'bg-dark-700 text-gray-500' : ''}
                  ${['registering', 'complete'].includes(step) && i === 2 ? 'bg-primary-500/50 text-primary-300' : ''}
                `}
              >
                {i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`
                    w-16 h-1 mx-2
                    ${['registering', 'complete'].includes(step) && i < 2 ? 'bg-primary-500' : 'bg-dark-700'}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Upload Step */}
        {step === 'upload' && (
          <div className="card">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
                transition-all duration-200
                ${isDragActive ? 'border-primary-500 bg-primary-500/10' : 'border-dark-600 hover:border-primary-500/50'}
              `}
            >
              <input {...getInputProps()} />
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-semibold mb-2">
                {isDragActive ? 'Drop your file here' : 'Drag & drop your file'}
              </p>
              <p className="text-gray-400 mb-4">or click to browse</p>
              <p className="text-sm text-gray-500">
                Supports: Images, Audio, Video, PDF, Text, Code
              </p>
            </div>
          </div>
        )}

        {/* Wallet Connection Warning */}
        {!walletAddress && (
          <div className="card bg-vercel-gray-950 border-vercel-gray-800 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">Wallet Not Connected</p>
                <p className="text-xs text-vercel-gray-400">Connect your wallet to register IP assets on Story Protocol</p>
              </div>
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="card bg-red-500/10 border-red-500/20 mb-6">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Metadata Step */}
        {step === 'metadata' && file && (
          <div className="card space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">File Information</h3>
              <div className="flex items-center gap-4 p-4 bg-dark-700/50 rounded-lg">
                <FileText className="w-8 h-8 text-primary-400" />
                <div className="flex-1">
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                type="text"
                className="input-field"
                value={metadata.title}
                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                placeholder="Enter IP asset title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                className="input-field min-h-[100px]"
                value={metadata.description}
                onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                placeholder="Describe your IP asset"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <select
                className="input-field"
                value={metadata.type}
                onChange={(e) => setMetadata({ ...metadata, type: e.target.value as any })}
              >
                <option value="art">Art</option>
                <option value="text">Text</option>
                <option value="code">Code</option>
                <option value="music">Music</option>
                <option value="research">Research</option>
                <option value="ai-output">AI Output</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                className="input-field"
                value={metadata.tags}
                onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">License</label>
              <input
                type="text"
                className="input-field"
                value={metadata.license}
                onChange={(e) => setMetadata({ ...metadata, license: e.target.value })}
                placeholder="e.g., CC BY 4.0, MIT, All Rights Reserved"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setFile(null)
                  setStep('upload')
                }}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button
                onClick={handleRegister}
                disabled={!metadata.title}
                className="btn-primary flex-1"
              >
                Register IP
              </button>
            </div>
          </div>
        )}

        {/* Registering Step */}
        {step === 'registering' && (
          <div className="card text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary-400 animate-spin" />
            <h3 className="text-2xl font-bold mb-2">Registering IP Asset</h3>
            <p className="text-gray-400">
              Uploading to IPFS/Arweave and registering on Story Protocol...
            </p>
          </div>
        )}

        {/* Complete Step */}
        {step === 'complete' && registeredIP && (
          <div className="card space-y-6">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-bold mb-2">IP Asset Registered!</h3>
              <p className="text-gray-400">Your IP asset has been successfully registered on Story Protocol</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-dark-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-primary-400" />
                  <span className="text-sm font-semibold text-gray-400">IP ID</span>
                </div>
                <p className="font-mono text-sm break-all">{registeredIP.id}</p>
              </div>

              {registeredIP.ipfsHash && (
                <div className="p-4 bg-dark-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon className="w-4 h-4 text-primary-400" />
                    <span className="text-sm font-semibold text-gray-400">IPFS Hash</span>
                  </div>
                  <p className="font-mono text-sm break-all">{registeredIP.ipfsHash}</p>
                </div>
              )}

              <div className="p-4 bg-dark-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-primary-400" />
                  <span className="text-sm font-semibold text-gray-400">File Hash</span>
                </div>
                <p className="font-mono text-sm break-all">{registeredIP.hash}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setFile(null)
                setMetadata({ title: '', description: '', type: 'art', tags: '', license: '' })
                setRegisteredIP(null)
                setStep('upload')
              }}
              className="btn-primary w-full"
            >
              Register Another Asset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

