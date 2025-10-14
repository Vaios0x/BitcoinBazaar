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
      antialias: true 
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create neural network nodes
    const nodes: THREE.Mesh[] = []
    const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16)
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x5546ff,
      transparent: true,
      opacity: 0.8
    })

    // Create 50 nodes in 3D space
    for (let i = 0; i < 50; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone())
      node.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      nodes.push(node)
      scene.add(node)
    }

    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x5546ff,
      transparent: true,
      opacity: 0.2
    })

    const connections: THREE.Line[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < 5) {
          const points = []
          points.push(nodes[i].position)
          points.push(nodes[j].position)
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          const line = new THREE.Line(geometry, lineMaterial.clone())
          connections.push(line)
          scene.add(line)
        }
      }
    }

    camera.position.z = 15

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.01
      
      // Rotate and pulse nodes
      nodes.forEach((node, i) => {
        node.rotation.x += 0.01
        node.rotation.y += 0.01
        const scale = 1 + Math.sin(frame + i * 0.1) * 0.2
        node.scale.set(scale, scale, scale)
        
        // Pulsing glow
        const material = node.material as THREE.MeshBasicMaterial
        material.opacity = 0.5 + Math.sin(frame + i * 0.2) * 0.3
      })
      
      // Update connection opacity based on node positions
      connections.forEach((line, i) => {
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.1 + Math.sin(frame + i * 0.05) * 0.1
      })
      
      // Gentle camera rotation
      camera.position.x = Math.sin(frame * 0.1) * 2
      camera.position.y = Math.cos(frame * 0.1) * 2
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
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 opacity-30" />
  )
}
