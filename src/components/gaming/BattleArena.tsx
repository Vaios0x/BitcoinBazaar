'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, Zap, Trophy, Coins } from 'lucide-react'
import Image from 'next/image'
// @ts-ignore
import Confetti from 'react-confetti'

interface GamingNFT {
  id: string
  name: string
  imageUri: string
  stats: {
    hp: number
    attack: number
    defense: number
    speed: number
    level: number
    wins: number
    losses: number
  }
}

interface BattleArenaProps {
  nft1: GamingNFT
  nft2: GamingNFT
  wager: number
  onBattleComplete: (result: any) => void
  onClose: () => void
}

export function BattleArena({ nft1, nft2, wager, onBattleComplete, onClose }: BattleArenaProps) {
  const [battlePhase, setBattlePhase] = React.useState<'setup' | 'fighting' | 'result'>('setup')
  const [winner, setWinner] = React.useState<number | null>(null)
  const [showConfetti, setShowConfetti] = React.useState(false)
  const [battleLog, setBattleLog] = React.useState<string[]>([])

  const startBattle = async () => {
    setBattlePhase('fighting')
    setBattleLog([])
    
    // Simulate battle animation with log
    await new Promise(resolve => setTimeout(resolve, 500))
    setBattleLog((prev: string[]) => [...prev, `⚔️ ${nft1.name} vs ${nft2.name} - FIGHT!`])

    await new Promise(resolve => setTimeout(resolve, 1000))
    setBattleLog((prev: string[]) => [...prev, `💥 ${nft1.name} attacks with ${nft1.stats.attack} power!`])

    await new Promise(resolve => setTimeout(resolve, 1000))
    setBattleLog((prev: string[]) => [...prev, `🛡️ ${nft2.name} defends with ${nft2.stats.defense} defense!`])

    await new Promise(resolve => setTimeout(resolve, 1000))
    setBattleLog((prev: string[]) => [...prev, `⚡ Using Bitcoin block randomness...`])

    // Execute actual battle on blockchain
    const battleResult = await executeBattle(nft1.id, nft2.id, wager)

    await new Promise(resolve => setTimeout(resolve, 1000))

    setWinner(parseInt(battleResult.winnerId))
    setBattlePhase('result')
    setShowConfetti(true)

    setBattleLog((prev: string[]) => [...prev, `🏆 ${battleResult.winnerId === nft1.id ? nft1.name : nft2.name} WINS!`])

    onBattleComplete(battleResult)
  }

  const executeBattle = async (nft1Id: string, nft2Id: string, wagerAmount: number) => {
    // Simulate blockchain call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock result - in real implementation, this would call the smart contract
    const winnerId = Math.random() > 0.5 ? nft1Id : nft2Id
    
    return {
      winnerId,
      winnings: wagerAmount * 2,
      xpGained: 100
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="max-w-6xl w-full p-8">
        <AnimatePresence mode="wait">
          {battlePhase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-3xl p-8"
            >
              <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-bitcoin-500 to-stacks-500 bg-clip-text text-transparent">
                Battle Arena
              </h2>
              
              <div className="grid grid-cols-3 gap-8 items-center mb-8">
                {/* NFT 1 */}
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image src={nft1.imageUri} alt={nft1.name} fill className="rounded-2xl object-cover" />
                    <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{nft1.name}</h3>
                  <p className="text-lg text-gray-400">Level {nft1.stats.level}</p>
                  <div className="mt-2 text-bitcoin-500 font-bold">Power: {nft1.stats.attack + nft1.stats.defense}</div>
                </div>
                
                {/* VS + Wager */}
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl font-bold text-white mb-4"
                  >
                    VS
                  </motion.div>
                  
                  <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Coins className="w-6 h-6 text-bitcoin-500" />
                      <span className="text-2xl font-bold text-white">{wager}</span>
                      <span className="text-lg text-gray-400">sBTC</span>
                    </div>
                    <p className="text-sm text-gray-400">Winner takes all</p>
                  </div>
                </div>
                
                {/* NFT 2 */}
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image src={nft2.imageUri} alt={nft2.name} fill className="rounded-2xl object-cover" />
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{nft2.name}</h3>
                  <p className="text-lg text-gray-400">Level {nft2.stats.level}</p>
                  <div className="mt-2 text-bitcoin-500 font-bold">Power: {nft2.stats.attack + nft2.stats.defense}</div>
                </div>
              </div>
              
              <button
                onClick={startBattle}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xl font-bold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all flex items-center justify-center space-x-2"
              >
                <Swords className="w-6 h-6" />
                <span>START BATTLE</span>
                <Zap className="w-6 h-6" />
              </button>
            </motion.div>
          )}
          
          {battlePhase === 'fighting' && (
            <motion.div
              key="fighting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-32 h-32 mx-auto mb-8"
              >
                <Swords className="w-full h-full text-bitcoin-500" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-4">Battle in Progress...</h2>
              <p className="text-xl text-gray-400">Using Bitcoin blockchain for randomness</p>
              
              {/* Battle Log */}
              <div className="mt-8 glass-card p-6 rounded-2xl max-w-2xl mx-auto">
                <div className="space-y-2 text-left max-h-64 overflow-y-auto">
                  {battleLog.map((log: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-white font-mono text-sm"
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {battlePhase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-8 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: 3, duration: 0.5 }}
              >
                <Trophy className="w-32 h-32 mx-auto text-bitcoin-500 mb-4" />
              </motion.div>
              
              <h2 className="text-5xl font-bold text-white mb-4">
                {winner === parseInt(nft1.id) ? nft1.name : nft2.name} WINS!
              </h2>
              
              <div className="glass-card p-6 rounded-2xl max-w-md mx-auto mb-6">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Coins className="w-8 h-8 text-bitcoin-500" />
                  <span className="text-4xl font-bold text-white">{wager * 2}</span>
                  <span className="text-2xl text-gray-400">sBTC</span>
                </div>
                <p className="text-gray-400">Earnings</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-3xl font-bold text-green-400 mb-1">+100 XP</div>
                  <p className="text-sm text-gray-400">Experience Gained</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-3xl font-bold text-bitcoin-500 mb-1">+1</div>
                  <p className="text-sm text-gray-400">Win Streak</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-bitcoin-500 to-stacks-500 text-white font-bold rounded-xl hover:shadow-lg"
              >
                Return to Arena
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
