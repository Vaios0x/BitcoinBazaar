'use client'

import React from 'react'

export function LightEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Bitcoin light rays */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-bitcoin-500/50 to-transparent animate-pulse" 
           style={{ transform: 'rotate(15deg)', animationDelay: '0s' }} />
      <div className="absolute top-0 right-1/3 w-px h-24 bg-gradient-to-b from-bitcoin-400/40 to-transparent animate-pulse" 
           style={{ transform: 'rotate(-20deg)', animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-px h-28 bg-gradient-to-t from-bitcoin-600/30 to-transparent animate-pulse" 
           style={{ transform: 'rotate(25deg)', animationDelay: '4s' }} />
      
      {/* Stacks light rays */}
      <div className="absolute top-1/4 right-0 w-px h-20 bg-gradient-to-b from-stacks-500/50 to-transparent animate-pulse" 
           style={{ transform: 'rotate(-15deg)', animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-px h-24 bg-gradient-to-t from-stacks-400/40 to-transparent animate-pulse" 
           style={{ transform: 'rotate(30deg)', animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-0 w-px h-16 bg-gradient-to-b from-stacks-600/30 to-transparent animate-pulse" 
           style={{ transform: 'rotate(-25deg)', animationDelay: '5s' }} />
      
      {/* Ambient light spots */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-bitcoin-500/5 rounded-full blur-3xl animate-float" 
           style={{ animationDelay: '0s', animationDuration: '8s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-stacks-500/5 rounded-full blur-2xl animate-float" 
           style={{ animationDelay: '3s', animationDuration: '10s' }} />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/3 rounded-full blur-3xl animate-float" 
           style={{ animationDelay: '6s', animationDuration: '12s' }} />
    </div>
  )
}
