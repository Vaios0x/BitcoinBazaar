'use client'

import Link from 'next/link'
import { Twitter, Github, MessageCircle, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">₿</span>
              </div>
              <h3 className="text-xl font-bold text-white">BitcoinBazaar</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              The first NFT marketplace powered by Bitcoin. Buy, sell, and create NFTs
              with Bitcoin's security and Stacks' smart contracts.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a href="https://discord.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-400" />
              </a>
              <a href="https://github.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a href="mailto:hello@bitcoinbazaar.com" className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-white font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-gray-400 hover:text-white text-sm transition-colors">Explore</Link></li>
              <li><Link href="/collections" className="text-gray-400 hover:text-white text-sm transition-colors">Collections</Link></li>
              <li><Link href="/auctions" className="text-gray-400 hover:text-white text-sm transition-colors">Auctions</Link></li>
              <li><Link href="/stats" className="text-gray-400 hover:text-white text-sm transition-colors">Stats</Link></li>
              <li><Link href="/activity" className="text-gray-400 hover:text-white text-sm transition-colors">Activity</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">Documentation</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</Link></li>
              <li><Link href="/api" className="text-gray-400 hover:text-white text-sm transition-colors">API</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © {currentYear} BitcoinBazaar. Built on Stacks, secured by Bitcoin.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">Testnet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
