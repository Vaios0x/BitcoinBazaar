'use client'

import React from 'react'
import * as THREE from 'three'

export function BitcoinOrb() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create enhanced Bitcoin orb with multiple layers
    const outerGeometry = new THREE.SphereGeometry(2.2, 64, 64)
    const outerMaterial = new THREE.MeshPhongMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.3,
      shininess: 150,
      emissive: 0x331100
    })
    const outerOrb = new THREE.Mesh(outerGeometry, outerMaterial)
    scene.add(outerOrb)

    const innerGeometry = new THREE.SphereGeometry(2, 64, 64)
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0xF97316,
      shininess: 200,
      transparent: true,
      opacity: 0.9,
      emissive: 0x221100
    })
    const innerOrb = new THREE.Mesh(innerGeometry, innerMaterial)
    scene.add(innerOrb)

    // Create Bitcoin symbol with enhanced styling
    const symbolGeometry = new THREE.PlaneGeometry(1.5, 1.5)
    const symbolMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.9,
      emissive: 0x444444,
      shininess: 300
    })
    const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial)
    symbol.position.z = 2.1
    scene.add(symbol)

    // Add ring around the orb
    const ringGeometry = new THREE.SphereGeometry(2.5, 16, 16)
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.6,
      emissive: 0x110000
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    scene.add(ring)

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Bitcoin-colored point light
    const bitcoinLight = new THREE.DirectionalLight(0xF97316, 2)
    bitcoinLight.position.set(3, 3, 3)
    scene.add(bitcoinLight)

    // Stacks-colored point light
    const stacksLight = new THREE.DirectionalLight(0x5546FF, 1.5)
    stacksLight.position.set(-3, -3, -3)
    scene.add(stacksLight)

    // Enhanced particle system with multiple types
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    const sizes = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 40
      positions[i3 + 1] = (Math.random() - 0.5) * 40
      positions[i3 + 2] = (Math.random() - 0.5) * 40

      // Mix Bitcoin and Stacks colors
      const isBitcoin = Math.random() > 0.5
      if (isBitcoin) {
        colors[i3] = 0.97     // R
        colors[i3 + 1] = 0.45  // G
        colors[i3 + 2] = 0.09  // B
      } else {
        colors[i3] = 0.33     // R
        colors[i3 + 1] = 0.27  // G
        colors[i3 + 2] = 1.0   // B
      }

      sizes[i] = Math.random() * 0.05 + 0.01
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Add Bitcoin network grid around the orb
    const networkGeometry = new THREE.SphereGeometry(3.5, 16, 16)
    const networkMaterial = new THREE.MeshBasicMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    })
    const networkField = new THREE.Mesh(networkGeometry, networkMaterial)
    scene.add(networkField)

    // Add Bitcoin blockchain network lines
    const networkLinesGeometry = new THREE.BufferGeometry()
    const networkLinesCount = 50
    const networkPositions = new Float32Array(networkLinesCount * 6)
    
    for (let i = 0; i < networkLinesCount; i++) {
      const i6 = i * 6
      // Start point
      networkPositions[i6] = (Math.random() - 0.5) * 8
      networkPositions[i6 + 1] = (Math.random() - 0.5) * 8
      networkPositions[i6 + 2] = (Math.random() - 0.5) * 8
      // End point
      networkPositions[i6 + 3] = (Math.random() - 0.5) * 8
      networkPositions[i6 + 4] = (Math.random() - 0.5) * 8
      networkPositions[i6 + 5] = (Math.random() - 0.5) * 8
    }
    
    networkLinesGeometry.setAttribute('position', new THREE.BufferAttribute(networkPositions, 3))
    const networkLinesMaterial = new THREE.LineBasicMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.3
    })
    const networkLines = new THREE.Line(networkLinesGeometry, networkLinesMaterial)
    scene.add(networkLines)

    // Add Bitcoin blockchain nodes
    const nodesGeometry = new THREE.BufferGeometry()
    const nodesCount = 20
    const nodePositions = new Float32Array(nodesCount * 3)
    const nodeColors = new Float32Array(nodesCount * 3)
    
    for (let i = 0; i < nodesCount; i++) {
      const i3 = i * 3
      nodePositions[i3] = (Math.random() - 0.5) * 10
      nodePositions[i3 + 1] = (Math.random() - 0.5) * 10
      nodePositions[i3 + 2] = (Math.random() - 0.5) * 10
      
      // Bitcoin orange color
      nodeColors[i3] = 0.97
      nodeColors[i3 + 1] = 0.45
      nodeColors[i3 + 2] = 0.09
    }
    
    nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    nodesGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3))
    
    const nodesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      sizeAttenuation: true
    })
    
    const blockchainNodes = new THREE.Points(nodesGeometry, nodesMaterial)
    scene.add(blockchainNodes)

    camera.position.z = 8

    // Enhanced animation with multiple effects
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.008
      
      // Rotate orbs with different speeds
      outerOrb.rotation.x += 0.003
      outerOrb.rotation.y += 0.005
      outerOrb.rotation.z += 0.002
      
      innerOrb.rotation.x += 0.005
      innerOrb.rotation.y += 0.008
      innerOrb.rotation.z += 0.003
      
      // Enhanced pulsing with multiple frequencies
      const outerScale = 1 + Math.sin(frame * 1.5) * 0.15 + Math.sin(frame * 0.5) * 0.05
      const innerScale = 1 + Math.sin(frame * 2) * 0.2 + Math.sin(frame * 0.8) * 0.1
      
      outerOrb.scale.set(outerScale, outerScale, outerScale)
      innerOrb.scale.set(innerScale, innerScale, innerScale)
      
      // Rotate symbol
      symbol.rotation.z += 0.01
      
      // Rotate ring
      ring.rotation.x += 0.002
      ring.rotation.y += 0.003
      
      // Animate particles with orbital motion
      const positions = (particlesGeometry as any).attributes?.position?.array as Float32Array
      if (positions) {
        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3
          const angle = frame * 0.1 + i * 0.01
          const radius = 15 + Math.sin(frame * 0.5 + i * 0.1) * 5
          
          positions[i3] = Math.cos(angle) * radius
          positions[i3 + 1] = Math.sin(angle) * radius + Math.sin(frame * 0.3 + i * 0.05) * 3
          positions[i3 + 2] = Math.sin(angle * 0.7) * radius * 0.5
        }
        if ((particlesGeometry as any).attributes?.position) {
          (particlesGeometry as any).attributes.position.needsUpdate = true
        }
      }
      
      // Rotate particles
      particles.rotation.x += 0.001
      particles.rotation.y += 0.002
      particles.rotation.z += 0.0005
      
      // Animate Bitcoin network field
      networkField.rotation.x += 0.001
      networkField.rotation.y += 0.002
      const networkScale = 1 + Math.sin(frame * 0.8) * 0.1
      networkField.scale.set(networkScale, networkScale, networkScale)
      
      // Animate Bitcoin network lines
      // Note: Line objects have limited animation capabilities
      // We'll animate the material opacity instead
      
      // Pulse network lines
      const networkOpacity = 0.3 + Math.sin(frame * 1.2) * 0.1
      networkLinesMaterial.opacity = networkOpacity
      
      // Animate blockchain nodes
      blockchainNodes.rotation.x += 0.0003
      blockchainNodes.rotation.y += 0.0005
      blockchainNodes.rotation.z += 0.0002
      
      // Pulse blockchain nodes
      // Note: Points objects have limited animation capabilities
      // We'll animate the rotation instead
      blockchainNodes.rotation.x += 0.0005
      blockchainNodes.rotation.y += 0.0008
      
      // Dynamic lighting animation
      bitcoinLight.position.x = Math.sin(frame * 0.3) * 8
      bitcoinLight.position.y = Math.cos(frame * 0.3) * 8
      bitcoinLight.position.z = Math.sin(frame * 0.2) * 5
      
      stacksLight.position.x = Math.sin(frame * 0.4 + Math.PI) * 6
      stacksLight.position.y = Math.cos(frame * 0.4 + Math.PI) * 6
      stacksLight.position.z = Math.sin(frame * 0.25 + Math.PI) * 4
      
      // Enhanced camera movement
      camera.position.x = Math.sin(frame * 0.1) * 2 + Math.sin(frame * 0.05) * 1
      camera.position.y = Math.cos(frame * 0.1) * 2 + Math.cos(frame * 0.05) * 1
      camera.position.z = 8 + Math.sin(frame * 0.08) * 2
      camera.lookAt(0, 0, 0)
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bitcoin-glow animate-float-enhanced" 
    />
  )
}
