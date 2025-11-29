/**
 * Wallet Connection for Story Protocol
 * Handles client-side wallet connections (MetaMask, WalletConnect, etc.)
 */

'use client'

import { StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { http, createWalletClient, custom } from 'viem'
import { storyProtocol } from './story-protocol'

/**
 * Initialize Story Protocol client with wallet connection
 */
export async function initStoryClientWithWallet(): Promise<StoryClient> {
  if (typeof window === 'undefined') {
    throw new Error('Wallet connection is only available in the browser')
  }

  // Check if wallet is available
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

    // Create wallet client with the connected account
    const walletClient = createWalletClient({
      account: accountAddress,
      transport: custom(window.ethereum),
    })

    // Verify account was created
    if (!walletClient.account || !walletClient.account.address) {
      throw new Error('Failed to create wallet client. Please try again.')
    }

    // Get RPC URL and chain ID
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://aeneid-rpc.story.foundation'
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 'aeneid'

    console.log('Initializing Story Protocol client:', {
      account: walletClient.account.address,
      rpcUrl,
      chainId,
    })

    // Create Story Protocol config
    const config: StoryConfig = {
      account: walletClient.account,
      transport: http(rpcUrl),
      chainId: chainId as any,
    }

    // Initialize Story Protocol client
    let client: StoryClient
    try {
      client = StoryClient.newClient(config)
    } catch (sdkError: any) {
      console.error('Story Protocol SDK error:', sdkError)
      throw new Error(`Failed to initialize Story Protocol SDK: ${sdkError.message || 'Unknown error'}`)
    }
    
    // Verify client was created
    if (!client) {
      throw new Error('Story Protocol client is null after initialization')
    }
    
    // Set client in SDK instance
    storyProtocol.setClient(client)

    console.log('Story Protocol client initialized successfully')
    return client
  } catch (error: any) {
    console.error('Failed to initialize Story Protocol client with wallet:', error)
    
    // Provide user-friendly error messages
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

