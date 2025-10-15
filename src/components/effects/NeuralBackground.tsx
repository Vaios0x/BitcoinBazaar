'use client'

import React from 'react'
import * as THREE from 'three'

export function NeuralBackground() {
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

    // Enhanced neural network nodes
    const nodes: THREE.Mesh[] = []
    const nodeGeometry = new THREE.SphereGeometry(0.15, 32, 32)
    
    // Create Bitcoin-colored nodes
    const bitcoinNodeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xF97316,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    })
    
    // Create Stacks-colored nodes
    const stacksNodeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x5546FF,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    })

    // Create 80 nodes in 3D space with mixed colors
    for (let i = 0; i < 80; i++) {
      const isBitcoin = Math.random() > 0.5
      const node = new THREE.Mesh(
        nodeGeometry, 
        isBitcoin ? bitcoinNodeMaterial.clone() : stacksNodeMaterial.clone()
      )
      node.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      )
      nodes.push(node)
      scene.add(node)
    }

    // Enhanced connections with gradient colors
    const bitcoinLineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xF97316,
      transparent: true,
      opacity: 0.3
    })
    
    const stacksLineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x5546FF,
      transparent: true,
      opacity: 0.3
    })

    const connections: THREE.Line[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < 8) {
          const points = []
          points.push(nodes[i].position)
          points.push(nodes[j].position)
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          
          // Color connections based on node types
          const node1Material = nodes[i].material as THREE.MeshPhongMaterial
          const node2Material = nodes[j].material as THREE.MeshPhongMaterial
          const isBitcoinConnection = (node1Material as any).color?.getHex() === 0xF97316 || 
                                    (node2Material as any).color?.getHex() === 0xF97316
          
          const line = new THREE.Line(
            geometry, 
            isBitcoinConnection ? bitcoinLineMaterial.clone() : stacksLineMaterial.clone()
          )
          connections.push(line)
          scene.add(line)
        }
      }
    }

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    // Add directional lighting
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Add point lights for dynamic lighting
    const bitcoinLight = new THREE.DirectionalLight(0xF97316, 1)
    bitcoinLight.position.set(10, 10, 10)
    scene.add(bitcoinLight)

    const stacksLight = new THREE.DirectionalLight(0x5546FF, 1)
    stacksLight.position.set(-10, -10, -10)
    scene.add(stacksLight)

    camera.position.z = 20

    // Enhanced animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.008
      
      // Rotate and pulse nodes with enhanced effects
      nodes.forEach((node, i) => {
        node.rotation.x += 0.005
        node.rotation.y += 0.008
        node.rotation.z += 0.003
        
        // Enhanced pulsing with different frequencies
        const scale = 1 + Math.sin(frame * 2 + i * 0.1) * 0.3 + 
                     Math.sin(frame * 0.5 + i * 0.05) * 0.1
        node.scale.set(scale, scale, scale)
        
        // Dynamic opacity with breathing effect
        const material = node.material as THREE.MeshPhongMaterial
        ;(material as any).opacity = 0.6 + Math.sin(frame * 1.5 + i * 0.2) * 0.3 +
                          Math.sin(frame * 0.3 + i * 0.1) * 0.1
        
        // Color intensity variation
        const colorIntensity = 0.8 + Math.sin(frame + i * 0.1) * 0.2
        ;(material as any).color?.multiplyScalar(colorIntensity)
      })
      
      // Enhanced connection animations
      connections.forEach((line, i) => {
        const material = line.material as THREE.LineBasicMaterial
        ;(material as any).opacity = 0.2 + Math.sin(frame * 1.2 + i * 0.03) * 0.2 +
                          Math.sin(frame * 0.4 + i * 0.07) * 0.1
        
        // Color pulsing
        const colorIntensity = 0.7 + Math.sin(frame * 0.8 + i * 0.05) * 0.3
        ;(material as any).color?.multiplyScalar(colorIntensity)
      })
      
      // Dynamic camera movement with multiple orbits
      camera.position.x = Math.sin(frame * 0.05) * 8 + Math.sin(frame * 0.1) * 3
      camera.position.y = Math.cos(frame * 0.05) * 8 + Math.cos(frame * 0.1) * 3
      camera.position.z = 20 + Math.sin(frame * 0.08) * 5
      camera.lookAt(0, 0, 0)
      
      // Animate lights
      bitcoinLight.position.x = Math.sin(frame * 0.3) * 15
      bitcoinLight.position.y = Math.cos(frame * 0.3) * 15
      bitcoinLight.position.z = Math.sin(frame * 0.2) * 10
      
      stacksLight.position.x = Math.sin(frame * 0.4 + Math.PI) * 15
      stacksLight.position.y = Math.cos(frame * 0.4 + Math.PI) * 15
      stacksLight.position.z = Math.sin(frame * 0.25 + Math.PI) * 10
      
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
      className="fixed inset-0 -z-10 opacity-40 neural-grid floating-particles" 
    />
  )
}
