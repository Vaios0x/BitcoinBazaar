'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Bell, User, Wallet, Menu, X, Plus } from 'lucide-react'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'
import { Logo } from '@/components/assets/OptimizedImage'
import { LOGO_ASSETS } from '@/lib/assets'

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: 'New Bid Received',
    message: 'Someone bid 0.15 sBTC on your Bitcoin Genesis #1',
    time: '2m ago',
    type: 'bid',
    isRead: false
  },
  {
    id: 2,
    title: 'Auction Won',
    message: 'You won the auction for Stacks Pioneer #42',
    time: '1h ago',
    type: 'win',
    isRead: false
  },
  {
    id: 3,
    title: 'Price Alert',
    message: 'Bitcoin Genesis floor price increased by 15%',
    time: '3h ago',
    type: 'alert',
    isRead: true
  },
  {
    id: 4,
    title: 'New Collection',
    message: 'Diamond Hands collection just launched',
    time: '5h ago',
    type: 'collection',
    isRead: true
  }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const { scrollY } = useScroll()

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  )

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 14, 39, 0)', 'rgba(10, 14, 39, 0.8)']
  )

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close notifications when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNotificationsOpen) {
        const target = event.target as Element
        if (!target.closest('[data-notifications]')) {
          setIsNotificationsOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotificationsOpen])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-card-premium border-b border-white/10"
      style={{
        backdropFilter: backdropBlur,
        backgroundColor: backgroundColor
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Responsive */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
              {/* Enhanced 3D Bitcoin Orb Logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full blur-lg opacity-60 animate-bitcoin-pulse" />
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full bitcoin-glow group-hover:scale-110 transition-transform duration-300">
                <Logo 
                  variant="main" 
                  size="sm" 
                  animate={true} 
                  glow={true}
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                />
              </div>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text animate-gradient-shift group-hover:scale-105 transition-transform duration-300">
                BitcoinBazaar
              </h1>
              <p className="text-xs text-gray-400 group-hover:text-stacks-400 transition-colors duration-300 hidden sm:block">Powered by Bitcoin</p>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/explore">Explore</NavLink>
            <NavLink href="/my-nfts" className="text-bitcoin-400 hover:text-bitcoin-300 font-semibold">
              🎨 Mis NFTs
            </NavLink>
            <NavLink href="/gaming">Gaming</NavLink>
            <NavLink href="/defi">DeFi</NavLink>
            <NavLink href="/collections">Collections</NavLink>
            <NavLink href="/auctions">Auctions</NavLink>
            <NavLink href="/stats">Stats</NavLink>
            <NavLink href="/demo" className="text-green-400 hover:text-green-300 font-semibold">
              🚀 Demo
            </NavLink>
            <NavLink href="/testing" className="text-blue-400 hover:text-blue-300 font-semibold">
              🧪 Testing
            </NavLink>
          </div>
          
          {/* Create Button - Desktop */}
          <div className="hidden lg:block ml-6 xl:ml-8">
            <Link 
              href="/create" 
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white font-semibold rounded-full hover:from-bitcoin-600 hover:to-stacks-600 transition-all duration-300 transform hover:scale-105 bitcoin-glow group"
            >
              <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Crear
            </Link>
          </div>
          
          {/* Search Bar - Hidden on mobile and tablet */}
          <div className="hidden xl:block flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFTs, collections, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500 rounded-full text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Notifications - Hidden on very small screens */}
            <div className="relative hidden sm:block" data-notifications>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 glass-card-premium rounded-full hover:bg-white/10 transition-colors stacks-glow group"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-stacks-400 transition-colors duration-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              
              {/* Notifications Dropdown - Responsive */}
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-72 sm:w-80 glass-card-premium rounded-2xl p-4 shadow-2xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">Notifications</h3>
                    <button 
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-xl transition-colors cursor-pointer hover:bg-white/5 ${
                          !notification.isRead ? 'bg-stacks-500/10 border-l-2 border-stacks-500' : 'bg-white/5'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            !notification.isRead ? 'bg-stacks-500' : 'bg-gray-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-white mb-1">
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-300 mb-2">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <button className="w-full text-center text-sm text-stacks-400 hover:text-stacks-300 transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Wallet Connection - Responsive */}
            <div className="hidden sm:block">
              <ConnectWallet />
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 glass-card-premium rounded-full hover:scale-110 transition-transform duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Enhanced Responsive with Solid Neural Background */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-white/10 m-2 sm:m-4 rounded-2xl p-4 sm:p-6 neural-grid-pattern"
        >
          {/* Mobile Search */}
          <div className="mb-4 sm:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFTs, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500 rounded-full text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/explore">Explore</MobileNavLink>
            <MobileNavLink href="/my-nfts" className="text-bitcoin-400 hover:text-bitcoin-300 font-semibold">
              🎨 Mis NFTs
            </MobileNavLink>
            <MobileNavLink href="/gaming">Gaming</MobileNavLink>
            <MobileNavLink href="/defi">DeFi</MobileNavLink>
            <MobileNavLink href="/collections">Collections</MobileNavLink>
            <MobileNavLink href="/auctions">Auctions</MobileNavLink>
            <MobileNavLink href="/stats">Stats</MobileNavLink>
            <MobileNavLink href="/demo" className="text-green-400 hover:text-green-300 font-semibold">
              🚀 Demo Interactivo
            </MobileNavLink>
            <MobileNavLink href="/testing" className="text-blue-400 hover:text-blue-300 font-semibold">
              🧪 Testing Suite
            </MobileNavLink>
            
            {/* Create Button - Mobile */}
            <Link 
              href="/create" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white font-semibold rounded-full hover:from-bitcoin-600 hover:to-stacks-600 transition-all duration-300 transform hover:scale-105 bitcoin-glow group mt-2"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Crear NFT
            </Link>
          </div>

          {/* Mobile Wallet Connection */}
          <div className="mt-4 pt-4 border-t border-white/10 sm:hidden">
            <ConnectWallet />
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children, className = "" }: { href: string, children: any, className?: string }) {
  return (
    <Link href={href} className={`text-gray-300 hover:text-white transition-colors font-medium relative group hover:scale-105 transform duration-300 ${className}`}>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-bitcoin-500 to-stacks-500 group-hover:w-full transition-all duration-300" />
    </Link>
  )
}

function MobileNavLink({ href, children, className = "" }: { href: string, children: any, className?: string }) {
  return (
    <Link href={href} className={`text-lg text-gray-300 hover:text-stacks-400 transition-colors font-medium hover:scale-105 transform duration-300 ${className}`}>
      {children}
    </Link>
  )
}
