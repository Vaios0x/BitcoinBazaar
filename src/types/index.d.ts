declare module 'react' {
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void
  export function useRef<T>(initialValue: T): { current: T }
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T
  export function useMemo<T>(factory: () => T, deps: any[]): T
  export const createContext: any
  export const useContext: any
  export const forwardRef: any
  export const memo: any
  export const lazy: any
  export const Suspense: any
  export const Fragment: any
  export const createElement: any
  export const Component: any
  export const PureComponent: any
  export const StrictMode: any
  export const version: string
}
