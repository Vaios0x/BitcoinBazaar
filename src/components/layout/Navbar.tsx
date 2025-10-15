'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Bell, User, Wallet, Menu, X } from 'lucide-react'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12">
              {/* Enhanced 3D Bitcoin Orb Logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full blur-lg opacity-60 animate-bitcoin-pulse" />
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full bitcoin-glow group-hover:scale-110 transition-transform duration-300">
                <Logo 
                  variant="main" 
                  size="md" 
                  animate={true} 
                  glow={true}
                  className="w-8 h-8"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text animate-gradient-shift group-hover:scale-105 transition-transform duration-300">
                BitcoinBazaar
              </h1>
              <p className="text-xs text-gray-400 group-hover:text-stacks-400 transition-colors duration-300">Powered by Bitcoin</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/explore">Explore</NavLink>
            <NavLink href="/gaming">Gaming</NavLink>
            <NavLink href="/defi">DeFi</NavLink>
            <NavLink href="/collections">Collections</NavLink>
            <NavLink href="/auctions">Auctions</NavLink>
            <NavLink href="/stats">Stats</NavLink>
          </div>
          
          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFTs, collections, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-stacks-500 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Notifications */}
            <div className="relative" data-notifications>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 glass-card-premium rounded-full hover:bg-white/10 transition-colors stacks-glow group"
              >
                <Bell className="w-5 h-5 text-gray-300 group-hover:text-stacks-400 transition-colors duration-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              
              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-80 glass-card-premium rounded-2xl p-4 shadow-2xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                    <button 
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-80 overflow-y-auto">
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
            
            {/* Wallet Connection */}
            <ConnectWallet />
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 glass-card-premium rounded-full hover:scale-110 transition-transform duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-card-premium m-4 rounded-2xl p-6 floating-particles"
        >
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/explore">Explore</MobileNavLink>
            <MobileNavLink href="/gaming">Gaming</MobileNavLink>
            <MobileNavLink href="/defi">DeFi</MobileNavLink>
            <MobileNavLink href="/collections">Collections</MobileNavLink>
            <MobileNavLink href="/auctions">Auctions</MobileNavLink>
            <MobileNavLink href="/stats">Stats</MobileNavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string, children: any }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors font-medium relative group hover:scale-105 transform duration-300">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-bitcoin-500 to-stacks-500 group-hover:w-full transition-all duration-300" />
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string, children: any }) {
  return (
    <Link href={href} className="text-lg text-gray-300 hover:text-stacks-400 transition-colors font-medium hover:scale-105 transform duration-300">
      {children}
    </Link>
  )
}
