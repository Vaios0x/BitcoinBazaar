'use client'

import React from 'react'
import { DemoSection } from '@/components/demo/DemoSection'
import { BitcoinSymbolsIntense } from '@/components/effects/BitcoinSymbolsIntense'

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Background Animation */}
      <BitcoinSymbolsIntense />
      
      {/* Demo Section */}
      <DemoSection />
    </div>
  )
}
