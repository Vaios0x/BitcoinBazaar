declare module 'three' {
  export * from 'three'
  
  export class Scene {
    constructor()
    add(object: any): void
    remove(object: any): void
  }
  
  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number)
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void }
    aspect: number
    updateProjectionMatrix(): void
    lookAt(x: number, y: number, z: number): void
  }
  
  export class WebGLRenderer {
    constructor(options?: any)
    setSize(width: number, height: number): void
    setClearColor(color: number, alpha?: number): void
    render(scene: Scene, camera: PerspectiveCamera): void
    domElement: HTMLCanvasElement
  }
  
  export class SphereGeometry {
    constructor(radius: number, widthSegments?: number, heightSegments?: number)
  }
  
  export class MeshPhongMaterial {
    constructor(options?: any)
    clone(): MeshPhongMaterial
  }
  
  export class Mesh {
    constructor(geometry: any, material: any)
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void; distanceTo(other: any): number }
    rotation: { x: number; y: number; z: number; set(x: number, y: number, z: number): void }
    scale: { x: number; y: number; z: number; set(x: number, y: number, z: number): void }
    material: any
  }
  
  export class PlaneGeometry {
    constructor(width: number, height: number)
  }
  
  export class MeshBasicMaterial {
    constructor(options?: any)
    clone(): MeshBasicMaterial
    opacity: number
  }
  
  export class LineBasicMaterial {
    constructor(options?: any)
    clone(): LineBasicMaterial
    opacity: number
  }
  
  export class AmbientLight {
    constructor(color: any, intensity?: number)
  }
  
  export class DirectionalLight {
    constructor(color: any, intensity?: number)
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void }
  }
  
  export class BufferGeometry {
    constructor()
    setAttribute(name: string, attribute: any): void
    setFromPoints(points: any[]): void
  }
  
  export class BufferAttribute {
    constructor(array: any, itemSize: number)
  }
  
  export class PointsMaterial {
    constructor(options?: any)
  }
  
  export class Points {
    constructor(geometry: any, material: any)
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void }
    rotation: { x: number; y: number; z: number; set(x: number, y: number, z: number): void }
  }
  
  export class Line {
    constructor(geometry: any, material: any)
    material: any
  }
}
