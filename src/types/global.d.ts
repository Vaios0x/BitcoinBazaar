// Global type declarations for BitcoinBazaar

declare module 'bn.js' {
  export default class BN {
    constructor(value: string | number, base?: number)
    toString(base?: number): string
    toNumber(): number
    add(other: BN): BN
    sub(other: BN): BN
    mul(other: BN): BN
    div(other: BN): BN
    mod(other: BN): BN
    pow(other: BN): BN
    eq(other: BN): boolean
    lt(other: BN): boolean
    lte(other: BN): boolean
    gt(other: BN): boolean
    gte(other: BN): boolean
    isZero(): boolean
    isNeg(): boolean
    abs(): BN
    neg(): BN
    toArrayLike(type: 'hex' | 'be' | 'le', length?: number): Buffer
  }
}

declare module 'json5' {
  export function parse(text: string, reviver?: (key: any, value: any) => any): any
  export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string
}

declare module 'prop-types' {
  export interface Validator<T> {
    (props: any, propName: string, componentName: string, location: string, propFullName: string): Error | null
  }
  
  export const string: Validator<string>
  export const number: Validator<number>
  export const bool: Validator<boolean>
  export const func: Validator<Function>
  export const array: Validator<any[]>
  export const object: Validator<object>
  export const node: Validator<React.ReactNode>
  export const element: Validator<React.ReactElement>
  export const oneOf: <T>(types: T[]) => Validator<T>
  export const oneOfType: <T>(validators: Validator<T>[]) => Validator<T>
  export const arrayOf: <T>(validator: Validator<T>) => Validator<T[]>
  export const objectOf: <T>(validator: Validator<T>) => Validator<{ [key: string]: T }>
  export const shape: <T>(shape: { [K in keyof T]: Validator<T[K]> }) => Validator<T>
  export const exact: <T>(shape: { [K in keyof T]: Validator<T[K]> }) => Validator<T>
  export const any: Validator<any>
  export const symbol: Validator<symbol>
  export const elementType: Validator<React.ElementType>
}

declare module 'stats.js' {
  export default class Stats {
    constructor()
    dom: HTMLElement
    begin(): void
    end(): void
    update(): void
    setMode(mode: number): void
    showPanel(id: number): void
  }
}

declare module 'webxr' {
  export interface XRSession extends EventTarget {
    readonly inputSources: XRInputSource[]
    readonly environmentBlendMode: XREnvironmentBlendMode
    readonly interactionMode: XRInteractionMode
    readonly visibilityState: XRVisibilityState
    readonly supportedFrameRates: Float32Array
    readonly frameRate: number
    readonly preferredFrameRate: number
    readonly domOverlayState: XRDOMOverlayState | null
    readonly viewerSpace: XRSpace
    readonly trackedAnchors: XRAnchorSet
    readonly worldInformation: XRWorldInformation
    readonly inputSourceChange: XRInputSourceChangeEvent
    readonly select: XRInputSourceEvent
    readonly selectstart: XRInputSourceEvent
    readonly selectend: XRInputSourceEvent
    readonly squeeze: XRInputSourceEvent
    readonly squeezestart: XRInputSourceEvent
    readonly squeezeend: XRInputSourceEvent
    readonly visibilitychange: XRSessionEvent
    readonly frameratechange: XRSessionEvent
    readonly end: XRSessionEvent
    readonly inputsourceschange: XRSessionEvent
    readonly select: XRInputSourceEvent
    readonly selectstart: XRInputSourceEvent
    readonly selectend: XRInputSourceEvent
    readonly squeeze: XRInputSourceEvent
    readonly squeezestart: XRInputSourceEvent
    readonly squeezeend: XRInputSourceEvent
    readonly visibilitychange: XRSessionEvent
    readonly frameratechange: XRSessionEvent
    readonly end: XRSessionEvent
    readonly inputsourceschange: XRSessionEvent
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void
    requestReferenceSpace(type: XRReferenceSpaceType): Promise<XRReferenceSpace>
    updateRenderState(state?: XRRenderState): void
    requestAnimationFrame(callback: XRFrameRequestCallback): number
    cancelAnimationFrame(handle: number): void
    end(): Promise<void>
  }
}

// Extend Window interface for wallet providers
declare global {
  interface Window {
    XverseProviders?: {
      StacksProvider?: any
    }
    LeatherProvider?: any
    HiroWalletProvider?: any
  }
}

export {}