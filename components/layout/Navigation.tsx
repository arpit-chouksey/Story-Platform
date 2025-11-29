'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Wallet, CheckCircle2 } from 'lucide-react'
import { clsx } from 'clsx'
import { initStoryClientWithWallet } from '@/lib/wallet-client'

export function Navigation() {
  const pathname = usePathname()
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setIsConnected(true)
          setWalletAddress(accounts[0])
        }
      })
    }
  }, [])

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    try {
      // Check if wallet is available first
      if (typeof window === 'undefined' || !window.ethereum) {
        alert('No Web3 wallet found. Please install MetaMask or another Web3 wallet extension.')
        setIsConnecting(false)
        return
      }

      const client = await initStoryClientWithWallet()
      
      // Get the connected account
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts && accounts.length > 0) {
          setIsConnected(true)
          setWalletAddress(accounts[0])
          console.log('Wallet connected successfully:', accounts[0])
        } else {
          throw new Error('No accounts found after connection')
        }
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
      const errorMessage = error.message || 'Failed to connect wallet. Please make sure MetaMask is installed and try again.'
      alert(errorMessage)
    } finally {
      setIsConnecting(false)
    }
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/ip-registration', label: 'IP Registration' },
    { href: '/ai-chat', label: 'AI Chat' },
    { href: '/music', label: 'Music Apps' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-vercel-gray-800 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center group-hover:bg-vercel-gray-100 transition-colors">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-semibold text-white">Story Protocol</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-white bg-vercel-gray-900'
                    : 'nav-link'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {isConnected ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-vercel-gray-900 border border-vercel-gray-800">
              <CheckCircle2 className="w-4 h-4 text-vercel-gray-400" />
              <span className="text-sm font-medium text-white">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

