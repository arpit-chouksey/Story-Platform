/**
 * Wallet Connection for Story Protocol - Fixed for v1.4.2
 */

'use client'

import { StoryClient } from '@story-protocol/core-sdk'
import { createWalletClient, custom } from 'viem'
import { storyProtocol } from './story-protocol'

/**
 * Initialize Story Protocol client with wallet connection
 */
export async function initStoryClientWithWallet(): Promise<StoryClient> {
  if (typeof window === 'undefined') {
    throw new Error('Wallet connection is only available in the browser')
  }

  if (!window.ethereum) {
    throw new Error('No Web3 wallet found. Please install MetaMask or another Web3 wallet extension.')
  }

  try {
    // Request wallet connection
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found. Please unlock your wallet and try again.')
    }

    const accountAddress = accounts[0] as `0x${string}`

    // Create wallet client
    const walletClient = createWalletClient({
      account: accountAddress,
      transport: custom(window.ethereum),
    })

    if (!walletClient.account || !walletClient.account.address) {
      throw new Error('Failed to create wallet client. Please try again.')
    }

    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://aeneid-rpc.story.foundation'

    console.log('Initializing Story Protocol client:', {
      account: walletClient.account.address,
      rpcUrl,
      chainId: 'aeneid',
    })

    // Create Story Protocol client with wallet for v1.4.2
    const client = StoryClient.newClientUseWallet({
      wallet: walletClient as any,
      transport: custom(window.ethereum),
      chainId: 'aeneid',
    } as any)
    
    if (!client) {
      throw new Error('Story Protocol client is null after initialization')
    }
    
    // Set client in SDK instance
    storyProtocol.setClient(client)

    console.log('Story Protocol client initialized successfully')
    return client
  } catch (error: any) {
    console.error('Failed to initialize Story Protocol client with wallet:', error)
    
    if (error.code === 4001) {
      throw new Error('Wallet connection rejected. Please approve the connection request.')
    }
    
    if (error.code === -32002) {
      throw new Error('Wallet connection request already pending. Please check your wallet.')
    }
    
    if (error.message) {
      throw error
    }
    
    throw new Error(`Failed to connect wallet: ${error.toString()}`)
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, handler: (...args: any[]) => void) => void
      removeListener: (event: string, handler: (...args: any[]) => void) => void
    }
  }
}
