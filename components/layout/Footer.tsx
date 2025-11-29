'use client'

import Link from 'next/link'
import { Sparkles, Github, Twitter, BookOpen, ExternalLink, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { label: 'IP Registration', href: '/ip-registration' },
      { label: 'AI Chat', href: '/ai-chat' },
      { label: 'Music Apps', href: '/music' },
    ],
    resources: [
      { label: 'Story Protocol Docs', href: 'https://docs.story.foundation', external: true },
      { label: 'SDK Documentation', href: 'https://docs.story.foundation/developers/typescript-sdk', external: true },
      { label: 'GitHub Repository', href: 'https://github.com/storyprotocol/sdk', external: true },
    ],
    community: [
      { label: 'Twitter', href: 'https://twitter.com/storyprotocol', external: true },
      { label: 'Discord', href: 'https://discord.gg/storyprotocol', external: true },
      { label: 'Blog', href: 'https://blog.story.foundation', external: true },
    ],
  }

  return (
    <footer className="border-t border-vercel-gray-800 bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center group-hover:bg-vercel-gray-100 transition-colors">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-semibold text-white">Story Protocol</span>
            </Link>
            <p className="text-sm text-vercel-gray-400">
              Web3 IP Management Platform for creators, artists, and innovators.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-vercel-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-vercel-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-3">
              {links.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-vercel-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-vercel-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-vercel-gray-500">
              © {currentYear} Story Protocol IP Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-vercel-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>and care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

