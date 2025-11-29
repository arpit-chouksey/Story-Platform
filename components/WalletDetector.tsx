'use client'

import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

export function WalletDetector() {
  const [hasWallet, setHasWallet] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWallet(!!window.ethereum)
    }
  }, [])

  if (hasWallet === false) {
    return (
      <div className="fixed bottom-4 right-4 max-w-sm bg-vercel-gray-950 border border-vercel-gray-800 rounded-lg p-4 shadow-lg z-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white mb-1">Wallet Not Found</p>
            <p className="text-xs text-vercel-gray-400 mb-2">
              Install MetaMask or another Web3 wallet to connect and register IP assets.
            </p>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-vercel-blue-400 hover:text-vercel-blue-300 underline"
            >
              Install MetaMask →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return null
}

