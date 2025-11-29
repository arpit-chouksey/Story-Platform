'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Wallet } from 'lucide-react'
import { clsx } from 'clsx'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/ip-registration', label: 'IP Registration' },
    { href: '/ai-chat', label: 'AI Chat' },
    { href: '/music', label: 'Music Apps' },
  ]

  return (
    <nav className="glass border-b border-dark-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Story Protocol</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  pathname === item.href
                    ? 'bg-primary-500/20 text-primary-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-dark-700/50'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button className="btn-secondary flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

