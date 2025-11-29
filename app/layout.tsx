import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/providers/Providers'
import { WalletDetector } from '@/components/WalletDetector'

export const metadata: Metadata = {
  title: 'Story Protocol IP Platform',
  description: 'Web3 IP Management Platform with Story Protocol Integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WalletDetector />
        </Providers>
      </body>
    </html>
  )
}

