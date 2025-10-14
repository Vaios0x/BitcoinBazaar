'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Bell, User, Wallet, Menu, X } from 'lucide-react'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
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

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: backdropBlur,
        backgroundColor: backgroundColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              {/* 3D Bitcoin Orb Logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full blur-lg opacity-50 animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-bitcoin-500 to-stacks-500 rounded-full">
                <span className="text-2xl font-bold text-white">₿</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-bitcoin-500 to-stacks-500 bg-clip-text text-transparent">
                BitcoinBazaar
              </h1>
              <p className="text-xs text-gray-400">Powered by Bitcoin</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/explore">Explore</NavLink>
            <NavLink href="/gaming">Gaming</NavLink>
            <NavLink href="/defi">DeFi</NavLink>
            <NavLink href="/collections">Collections</NavLink>
            <NavLink href="/auctions">Auctions</NavLink>
            <NavLink href="/stats">Stats</NavLink>
            <NavLink href="/create">Create</NavLink>
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
            {/* Create Button */}
            <Link
              href="/create"
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-stacks-500/50 transition-all"
            >
              Create
            </Link>
            
            {/* Notifications */}
            <button className="relative p-2 glass-card rounded-full hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            {/* Wallet Connection */}
            <ConnectWallet />
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 glass-card rounded-full"
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
          className="md:hidden glass-card m-4 rounded-2xl p-6"
        >
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="/explore">Explore</MobileNavLink>
            <MobileNavLink href="/gaming">Gaming</MobileNavLink>
            <MobileNavLink href="/defi">DeFi</MobileNavLink>
            <MobileNavLink href="/collections">Collections</MobileNavLink>
            <MobileNavLink href="/auctions">Auctions</MobileNavLink>
            <MobileNavLink href="/stats">Stats</MobileNavLink>
            <MobileNavLink href="/create">Create</MobileNavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string, children: any }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors font-medium relative group">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-bitcoin-500 to-stacks-500 group-hover:w-full transition-all duration-300" />
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string, children: any }) {
  return (
    <Link href={href} className="text-lg text-gray-300 hover:text-white transition-colors font-medium">
      {children}
    </Link>
  )
}
