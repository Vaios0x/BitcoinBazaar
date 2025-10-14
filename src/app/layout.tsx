import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NeuralBackground } from '@/components/effects/NeuralBackground'
import { WalletProvider } from '@/components/providers/WalletProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BitcoinBazaar - The First Bitcoin-Native NFT Marketplace',
  description: 'Buy, sell, and create NFTs with Bitcoin\'s security and Stacks\' programmability. Features impossible on any other blockchain.',
  keywords: 'NFT, Bitcoin, Stacks, Marketplace, Blockchain, sBTC, STX',
  authors: [{ name: 'Vaios0x' }],
  openGraph: {
    title: 'BitcoinBazaar - Bitcoin-Native NFT Marketplace',
    description: 'The first NFT marketplace powered by Bitcoin. Dynamic pricing, dual-token payments, and Bitcoin-native features.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BitcoinBazaar - Bitcoin-Native NFT Marketplace',
    description: 'The first NFT marketplace powered by Bitcoin.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neural-background text-white antialiased`}>
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <NeuralBackground />
            <Navbar />
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(20px)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#F97316',
                  secondary: '#fff',
                },
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  )
}
