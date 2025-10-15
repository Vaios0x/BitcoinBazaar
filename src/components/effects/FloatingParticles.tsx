'use client'

import React from 'react'

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Bitcoin particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-bitcoin-500 rounded-full animate-float opacity-60" 
           style={{ animationDelay: '0s', animationDuration: '6s' }} />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-bitcoin-400 rounded-full animate-float opacity-40" 
           style={{ animationDelay: '2s', animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-bitcoin-600 rounded-full animate-float opacity-50" 
           style={{ animationDelay: '4s', animationDuration: '7s' }} />
      
      {/* Stacks particles */}
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-stacks-500 rounded-full animate-float opacity-60" 
           style={{ animationDelay: '1s', animationDuration: '9s' }} />
      <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-stacks-400 rounded-full animate-float opacity-40" 
           style={{ animationDelay: '3s', animationDuration: '6s' }} />
      <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-stacks-600 rounded-full animate-float opacity-50" 
           style={{ animationDelay: '5s', animationDuration: '8s' }} />
      
      {/* Neutral particles */}
      <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full animate-float opacity-30" 
           style={{ animationDelay: '1.5s', animationDuration: '10s' }} />
      <div className="absolute bottom-1/5 right-1/5 w-1.5 h-1.5 bg-gray-400 rounded-full animate-float opacity-35" 
           style={{ animationDelay: '3.5s', animationDuration: '7s' }} />
      <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-gray-300 rounded-full animate-float opacity-25" 
           style={{ animationDelay: '6s', animationDuration: '9s' }} />
    </div>
  )
}
