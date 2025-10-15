'use client'

import Link from 'next/link'
import { Twitter, Github, MessageCircle, Mail } from 'lucide-react'
import { Logo } from '@/components/assets/OptimizedImage'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand - Full width on mobile, 2 columns on tablet, 2 columns on desktop */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
                <Logo 
                  variant="main" 
                  size="sm" 
                  animate={true} 
                  glow={true}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">BitcoinBazaar</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md leading-relaxed">
              The first NFT marketplace powered by Bitcoin. Buy, sell, and create NFTs
              with Bitcoin's security and Stacks' smart contracts.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://twitter.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </a>
              <a href="https://discord.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors" aria-label="Discord">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </a>
              <a href="https://github.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </a>
              <a href="mailto:hello@bitcoinbazaar.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Explore</Link></li>
              <li><Link href="/collections" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Collections</Link></li>
              <li><Link href="/auctions" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Auctions</Link></li>
              <li><Link href="/stats" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Stats</Link></li>
              <li><Link href="/activity" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Activity</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Documentation</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Blog</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Help Center</Link></li>
              <li><Link href="/api" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">API</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar - Enhanced Responsive */}
        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} BitcoinBazaar. Built on Stacks, secured by Bitcoin.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
                <a href="/privacy" className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">Terms of Service</a>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">Testnet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
