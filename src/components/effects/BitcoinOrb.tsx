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
      antialias: true 
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create Bitcoin orb
    const geometry = new THREE.SphereGeometry(2, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      color: 0xF97316, // Bitcoin orange
      shininess: 100,
      transparent: true,
      opacity: 0.9
    })

    const orb = new THREE.Mesh(geometry, material)
    scene.add(orb)

    // Add Bitcoin symbol
    const symbolGeometry = new THREE.PlaneGeometry(1, 1)
    const symbolMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.8
    })
    const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial)
    symbol.position.z = 2.1
    scene.add(symbol)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add particle system
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x5546FF,
      size: 0.02,
      transparent: true,
      opacity: 0.6
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    camera.position.z = 5

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.01
      
      // Rotate orb
      orb.rotation.x += 0.01
      orb.rotation.y += 0.01
      
      // Pulsing effect
      const scale = 1 + Math.sin(frame * 2) * 0.1
      orb.scale.set(scale, scale, scale)
      
      // Rotate particles
      particles.rotation.x += 0.001
      particles.rotation.y += 0.002
      
      // Gentle camera movement
      camera.position.x = Math.sin(frame * 0.5) * 0.5
      camera.position.y = Math.cos(frame * 0.3) * 0.5
      
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
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full" />
  )
}
