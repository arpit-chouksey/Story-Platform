import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Providers } from '@/components/providers/Providers'

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
        </Providers>
      </body>
    </html>
  )
}

