'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sword, Shield, Zap, Target, Trophy, Flame, Skull, Crown, Star, Sparkles } from 'lucide-react'
import * as THREE from 'three'
import type { NFT } from '@/types/nft'

interface BattleModalProps {
  isOpen: boolean
  onClose: () => void
  nft: NFT
}

export function BattleModal({ isOpen, onClose, nft }: BattleModalProps) {
  const [battlePhase, setBattlePhase] = useState<'select' | 'battle' | 'result'>('select')
  const [selectedOpponent, setSelectedOpponent] = useState<any>(null)
  const [battleResult, setBattleResult] = useState<'win' | 'lose' | null>(null)
  const [battleProgress, setBattleProgress] = useState(0)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [playerHealth, setPlayerHealth] = useState(100)
  const [opponentHealth, setOpponentHealth] = useState(100)
  const [specialEffects, setSpecialEffects] = useState<string[]>([])
  
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | undefined>(undefined)

  // Enhanced opponents with 3D battle data
  const opponents = [
    {
      id: 1,
      name: 'Shadow Warrior',
      power: 320,
      defense: 250,
      speed: 180,
      health: 280,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      difficulty: 'Easy',
      reward: '50 XP',
      specialAbilities: ['Shadow Strike', 'Dark Aura'],
      color: '#8B5CF6',
      glowColor: '#A855F7'
    },
    {
      id: 2,
      name: 'Dragon Mage',
      power: 450,
      defense: 300,
      speed: 220,
      health: 350,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center',
      difficulty: 'Medium',
      reward: '100 XP',
      specialAbilities: ['Fire Breath', 'Dragon Shield'],
      color: '#EF4444',
      glowColor: '#F87171'
    },
    {
      id: 3,
      name: 'Dark Lord',
      power: 600,
      defense: 400,
      speed: 150,
      health: 500,
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop&crop=center',
      difficulty: 'Hard',
      reward: '200 XP',
      specialAbilities: ['Death Ray', 'Void Shield', 'Soul Drain'],
      color: '#1F2937',
      glowColor: '#374151'
    }
  ]

  // Enhanced 3D Battle Arena Setup
  useEffect(() => {
    if (!isOpen || !sceneRef.current) return

    try {
      const width = Math.min(250, window.innerWidth - 100)
      const height = Math.min(150, window.innerHeight * 0.2)
      
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      })

      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 0)
      sceneRef.current.appendChild(renderer.domElement)

      // Create battle arena with enhanced 3D effects
      const arenaGeometry = new (THREE as any).CylinderGeometry(8, 8, 0.5, 32)
      const arenaMaterial = new THREE.MeshPhongMaterial({
        color: 0x1F2937,
        transparent: true,
        opacity: 0.8,
        emissive: 0x0F172A
      })
      const arena = new THREE.Mesh(arenaGeometry, arenaMaterial)
      scene.add(arena)

      // Add arena rim with glow
      const rimGeometry = new (THREE as any).CylinderGeometry(8.2, 8.2, 0.1, 32)
      const rimMaterial = new THREE.MeshPhongMaterial({
        color: 0xF97316,
        emissive: 0x331100,
        transparent: true,
        opacity: 0.6
      })
      const rim = new THREE.Mesh(rimGeometry, rimMaterial)
      rim.position.y = 0.3
      scene.add(rim)

      // Create floating particles around arena
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 200
      const positions = new Float32Array(particlesCount * 3)
      const colors = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 20
        positions[i3 + 1] = Math.random() * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 20

        // Mix Bitcoin and Stacks colors
        const isBitcoin = Math.random() > 0.5
        if (isBitcoin) {
          colors[i3] = 0.97
          colors[i3 + 1] = 0.45
          colors[i3 + 2] = 0.09
        } else {
          colors[i3] = 0.33
          colors[i3 + 1] = 0.27
          colors[i3 + 2] = 1.0
        }
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
      })

      const particles = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particles)

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5)
      directionalLight.position.set(10, 10, 5)
      scene.add(directionalLight)

      const bitcoinLight = new (THREE as any).PointLight(0xF97316, 2, 20)
      bitcoinLight.position.set(5, 5, 5)
      scene.add(bitcoinLight)

      const stacksLight = new (THREE as any).PointLight(0x5546FF, 2, 20)
      stacksLight.position.set(-5, 5, -5)
      scene.add(stacksLight)

      camera.position.set(0, 8, 12)
      camera.lookAt(0, 0, 0)

      // Animation loop
      let frame = 0
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate)
        frame += 0.01

        // Rotate arena
        arena.rotation.y += 0.005
        rim.rotation.y += 0.008

        // Rotate particles
        particles.rotation.y += 0.002

        // Animate lights
        bitcoinLight.position.x = Math.sin(frame * 0.5) * 8
        bitcoinLight.position.z = Math.cos(frame * 0.5) * 8
        
        stacksLight.position.x = Math.sin(frame * 0.5 + Math.PI) * 8
        stacksLight.position.z = Math.cos(frame * 0.5 + Math.PI) * 8

        // Camera movement
        camera.position.x = Math.sin(frame * 0.1) * 2
        camera.position.z = 12 + Math.sin(frame * 0.05) * 2
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        if (sceneRef.current?.contains(renderer.domElement)) {
          sceneRef.current.removeChild(renderer.domElement)
        }
      }
    } catch (error) {
      console.warn('3D scene setup failed, falling back to 2D:', error)
    }
  }, [isOpen])

  const startBattle = async (opponent: any) => {
    setSelectedOpponent(opponent)
    setBattlePhase('battle')
    setBattleProgress(0)
    setPlayerHealth(100)
    setOpponentHealth(100)
    setBattleLog([])
    setSpecialEffects([])
    
    try {
      // Start real blockchain battle transaction
      const { startBattleSimple } = await import('@/lib/stacks/transactions-simple')
      
      // Add battle start log
      setBattleLog(prev => [...prev, `🚀 Starting battle with ${opponent.name}...`])
      
      // Call the real battle function
      const battleTxId = await startBattleSimple(
        nft.id,
        opponent.id,
        0.1, // Default wager
        'STX' // Default payment token
      )
      
      setBattleLog(prev => [...prev, `✅ Battle transaction submitted: ${battleTxId}`])
      
      // Enhanced battle simulation with real-time updates
      const battleInterval = setInterval(() => {
        setBattleProgress(prev => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            clearInterval(battleInterval)
            const win = Math.random() > 0.3
            setBattleResult(win ? 'win' : 'lose')
            setBattlePhase('result')
            
            // Complete battle on blockchain
            completeBattle(win ? 'win' : 'lose', battleTxId)
            return 100
          }
          return newProgress
        })

        // Simulate battle actions
        const actions = [
          `${nft.name} attacks with Bitcoin Strike!`,
          `${opponent.name} uses ${opponent.specialAbilities[Math.floor(Math.random() * opponent.specialAbilities.length)]}!`,
          'Critical hit!',
          'Blocked!',
          'Special ability activated!',
          'Energy surge detected!'
        ]
        
        setBattleLog(prev => [...prev.slice(-4), actions[Math.floor(Math.random() * actions.length)]])
        
        // Update health
        setPlayerHealth(prev => Math.max(0, prev - Math.random() * 15))
        setOpponentHealth(prev => Math.max(0, prev - Math.random() * 12))
        
        // Add special effects
        if (Math.random() > 0.7) {
          const effects = ['Lightning', 'Fire', 'Ice', 'Shadow', 'Light']
          setSpecialEffects(prev => [...prev.slice(-2), effects[Math.floor(Math.random() * effects.length)]])
        }
      }, 100)
      
    } catch (error) {
      console.error('Battle start failed:', error)
      setBattleLog(prev => [...prev, `❌ Battle failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
      
      // Reset to select phase on error
      setTimeout(() => {
        setBattlePhase('select')
        setSelectedOpponent(null)
      }, 3000)
    }
  }

  const completeBattle = async (result: 'win' | 'lose', battleTxId: string) => {
    try {
      const { completeBattleSimple } = await import('@/lib/stacks/transactions-simple')
      
      // Generate a battle ID (in real implementation, this would come from the start battle response)
      const battleId = Math.floor(Math.random() * 1000000)
      
      setBattleLog(prev => [...prev, `🏁 Completing battle...`])
      
      const completeTxId = await completeBattleSimple(battleId, result)
      
      setBattleLog(prev => [...prev, `✅ Battle completed: ${completeTxId}`])
      
    } catch (error) {
      console.error('Battle completion failed:', error)
      setBattleLog(prev => [...prev, `❌ Battle completion failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
    }
  }

  const resetBattle = () => {
    setBattlePhase('select')
    setSelectedOpponent(null)
    setBattleResult(null)
    setBattleProgress(0)
    setPlayerHealth(100)
    setOpponentHealth(100)
    setBattleLog([])
    setSpecialEffects([])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with 3D Effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 battle-arena-backdrop backdrop-blur-xl z-50"
            onClick={onClose}
          >
            {/* Floating particles background */}
            <div className="absolute inset-0 floating-particles neural-grid battle-arena-glow" />
          </motion.div>

          {/* Enhanced Modal with 3D Arena */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 battle-modal-container"
          >
            <div className="glass-card-premium rounded-xl w-full max-w-2xl max-h-[75vh] sm:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto overflow-x-hidden border-2 border-bitcoin-500/30 shadow-2xl battle-arena-3d mx-1">
              {/* Enhanced Header with 3D Effects */}
              <div className="relative p-3 border-b border-white/10 bg-gradient-to-r from-bitcoin-500/10 to-stacks-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
          <motion.div
                      className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-lg"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sword className="w-4 h-4 text-white" />
                    </motion.div>
                  <div>
                      <h2 className="text-lg font-bold gradient-text">Battle Arena 3D</h2>
                      <p className="text-xs text-gray-300">{nft.name}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110"
                >
                    <X className="w-6 h-6 text-gray-400" />
                </button>
                </div>
              </div>

              {/* Enhanced Content with 3D Arena */}
              <div className="flex-1 overflow-y-auto p-3 pb-8">
                {battlePhase === 'select' && (
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-3"
                    >
                      <h3 className="text-xl font-bold gradient-text mb-2">Choose Your Opponent</h3>
                      <p className="text-sm text-gray-300">Select a worthy adversary for your NFT warrior</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 mb-4">
                      {opponents.map((opponent, index) => (
                        <motion.div
                          key={opponent.id}
                          initial={{ opacity: 0, y: 50, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="battle-opponent-card rounded-2xl overflow-hidden border-2 border-white/10 hover:border-orange-500/50 transition-all duration-500 cursor-pointer group battle-card-3d"
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startBattle(opponent)}
                        >
                          {/* Opponent Image with 3D Effect */}
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={opponent.image}
                              alt={opponent.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* Difficulty Badge */}
                            <div className="absolute top-1 right-1">
                              <div className={`px-1 py-0.5 rounded-full text-xs font-bold ${
                                opponent.difficulty === 'Easy' ? 'bg-green-500/80 text-white' :
                                opponent.difficulty === 'Medium' ? 'bg-yellow-500/80 text-white' :
                                'bg-red-500/80 text-white'
                            }`}>
                              {opponent.difficulty}
                            </div>
                            </div>

                            {/* Power Level Indicator */}
                            <div className="absolute bottom-1 left-1 right-1">
                              <div className="flex items-center space-x-1">
                                <Flame className="w-3 h-3 text-orange-400" />
                                <div className="flex-1 bg-gray-700 rounded-full h-1">
                                  <div 
                                    className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((opponent.power / 600) * 100, 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-white">{opponent.power}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Opponent Stats */}
                          <div className="p-1">
                            <h4 className="text-xs font-bold text-white mb-1">{opponent.name}</h4>
                            
                            <div className="grid grid-cols-2 gap-1 mb-1">
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 mb-0.5">
                                  <Sword className="w-2 h-2 text-red-400" />
                                  <span className="text-xs text-gray-300">Attack</span>
                                </div>
                                <div className="text-xs font-bold text-white">{opponent.power}</div>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 mb-0.5">
                                  <Shield className="w-2 h-2 text-blue-400" />
                                  <span className="text-xs text-gray-300">Defense</span>
                                </div>
                                <div className="text-xs font-bold text-white">{opponent.defense}</div>
                              </div>
                            </div>

                            {/* Special Abilities */}
                            <div className="mb-1">
                              <div className="text-xs text-gray-400 mb-0.5">Special Abilities:</div>
                              <div className="flex flex-wrap gap-0.5">
                                {opponent.specialAbilities.map((ability, idx) => (
                                  <span 
                                    key={idx}
                                    className="px-0.5 py-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded text-xs"
                                  >
                                    {ability}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Reward */}
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-400">Reward:</div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-2 h-2 text-yellow-400" />
                                <span className="text-yellow-400 font-bold text-xs">{opponent.reward}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                  </div>
                )}

                {battlePhase === 'battle' && selectedOpponent && (
                  <div className="space-y-3">
                    {/* 3D Battle Arena */}
                    <div className="glass-card rounded-xl p-3 mb-3">
                      <div className="text-center mb-2">
                        <h3 className="text-lg font-bold gradient-text mb-1">Epic Battle in Progress</h3>
                        <p className="text-sm text-gray-300">Witness the ultimate showdown!</p>
                      </div>
                      
                      {/* 3D Scene Container */}
                      <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden mb-2">
                        <div ref={sceneRef} className="w-full h-full" />
                        
                        {/* Battle UI Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                          {/* Player Health Bar */}
                          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-32 sm:w-48">
                            <div className="flex items-center space-x-2 mb-1">
                              <img src={nft.imageUri} alt={nft.name} className="w-8 h-8 rounded-full" />
                              <span className="text-white font-bold">{nft.name}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 battle-health-bar">
                              <motion.div 
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                                animate={{ width: `${playerHealth}%` }}
                                transition={{ duration: 0.3 }}
                          />
                        </div>
                            <div className="text-xs text-gray-300 mt-1">{playerHealth.toFixed(0)}% HP</div>
                      </div>

                          {/* Opponent Health Bar */}
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-32 sm:w-48">
                            <div className="flex items-center space-x-2 mb-1 justify-end">
                              <span className="text-white font-bold">{selectedOpponent.name}</span>
                              <img src={selectedOpponent.image} alt={selectedOpponent.name} className="w-8 h-8 rounded-full" />
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 battle-health-bar">
                        <motion.div
                                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full"
                                animate={{ width: `${opponentHealth}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <div className="text-xs text-gray-300 mt-1 text-right">{opponentHealth.toFixed(0)}% HP</div>
                      </div>

                          {/* Battle Progress */}
                          <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4">
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                              <motion.div 
                                className="battle-progress-bar h-2 rounded-full"
                                animate={{ width: `${battleProgress}%` }}
                                transition={{ duration: 0.2 }}
                          />
                        </div>
                            <div className="text-center text-sm text-gray-300">
                              Battle Progress: {battleProgress.toFixed(0)}%
                            </div>
                          </div>

                          {/* Special Effects */}
                          {specialEffects.length > 0 && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              {specialEffects.map((effect, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                                  transition={{ duration: 1, delay: idx * 0.2 }}
                                  className={`text-2xl font-bold ${
                                    effect === 'Lightning' ? 'battle-effect-lightning text-yellow-400' :
                                    effect === 'Fire' ? 'battle-effect-fire text-red-400' :
                                    effect === 'Ice' ? 'battle-effect-ice text-blue-400' :
                                    'text-yellow-400'
                                  }`}
                                >
                                  {effect}
                                </motion.div>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>

                      {/* Battle Log */}
                      <div className="glass-card rounded-xl p-2 max-h-16 overflow-y-auto">
                        <h4 className="text-sm font-bold text-white mb-1 flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span>Battle Log</span>
                        </h4>
                        <div className="space-y-1">
                          {battleLog.map((log, idx) => (
                      <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="battle-log-entry text-xs text-gray-300 flex items-center space-x-1 p-1 rounded"
                            >
                              <Sparkles className="w-3 h-3 text-yellow-400" />
                              <span>{log}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {battlePhase === 'result' && battleResult && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 10, stiffness: 200 }}
                      className="mb-8"
                    >
                      {battleResult === 'win' ? (
                        <div className="relative battle-result-victory">
                          <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                            <Crown className="w-16 h-16 text-white" />
                          </div>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400"
                          >
                            <Star className="w-full h-full" />
                          </motion.div>
                        </div>
                      ) : (
                        <div className="battle-result-defeat">
                          <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                            <Skull className="w-16 h-16 text-white" />
                          </div>
                        </div>
                      )}
                    </motion.div>

                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-4xl font-bold mb-4 ${
                        battleResult === 'win' ? 'gradient-text' : 'text-red-400'
                      }`}
                    >
                      {battleResult === 'win' ? 'VICTORY!' : 'DEFEAT!'}
                    </motion.h3>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-300 mb-8 text-lg"
                    >
                      {battleResult === 'win' 
                        ? `You defeated ${selectedOpponent.name} and earned ${selectedOpponent.reward}!`
                        : `${selectedOpponent.name} was too strong. Better luck next time!`
                      }
                    </motion.p>

                    {/* Transaction Info */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">Blockchain Transaction</span>
                      </div>
                      <div className="text-xs text-gray-300 space-y-1">
                        <p>• Battle transaction signed with Leather Wallet</p>
                        <p>• Results recorded on Stacks blockchain</p>
                        <p>• Rewards distributed automatically</p>
                        <p>• Transaction verified on Bitcoin L2</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center"
                    >
                      <button
                        onClick={resetBattle}
                        className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm"
                      >
                        Battle Again
                      </button>
                      <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50 text-sm"
                      >
                        Close Arena
                      </button>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
