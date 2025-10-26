/// <reference types="@hirosystems/clarinet-sdk/vitest" />

declare global {
  const simnet: {
    getAccounts(): Map<string, string>
    blockHeight: number
    callReadOnlyFn(contract: string, fn: string, args: any[], caller: string): { result: any }
    callPublicFn(contract: string, fn: string, args: any[], caller: string): { result: any }
    mineBlock(): void
    mineBlocks(count: number): void
    getDataVar(contract: string, variable: string): any
    getMapEntry(contract: string, map: string, key: any): any
  }
}

export {}
