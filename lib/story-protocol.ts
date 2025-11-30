/**
 * Story Protocol SDK Integration - Fixed for v1.4.2
 */

import { StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export interface IPAsset {
  id: string
  hash: string
  ipfsHash?: string
  arweaveId?: string
  owner: string
  registeredAt: number
  metadata: IPMetadata
  lineage?: string[]
  royalties?: RoyaltyInfo
}

export interface IPMetadata {
  title: string
  description?: string
  type: 'art' | 'text' | 'code' | 'music' | 'research' | 'ai-output'
  tags?: string[]
  license?: string
  permissions?: Permission[]
}

export interface RoyaltyInfo {
  percentage: number
  recipients: RoyaltyRecipient[]
}

export interface RoyaltyRecipient {
  address: string
  percentage: number
}

export interface Permission {
  type: 'view' | 'edit' | 'commercial' | 'derivative'
  grantedTo?: string
  accessKey?: string
}

/**
 * Initialize Story Protocol Client with private key
 */
export function createStoryClient(): StoryClient | null {
  try {
    const privateKey = process.env.WALLET_PRIVATE_KEY
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || process.env.RPC_PROVIDER_URL
    
    if (privateKey && rpcUrl) {
      const account = privateKeyToAccount(`0x${privateKey.replace('0x', '')}` as `0x${string}`)
      
      const config: StoryConfig = {
        account: account,
        transport: http(rpcUrl),
        chainId: 'aeneid',
      }
      
      return StoryClient.newClient(config)
    }
    
    return null
  } catch (error) {
    console.error('Failed to initialize Story Protocol client:', error)
    return null
  }
}

/**
 * Story Protocol SDK wrapper - simplified for working with v1.4.2
 */
export class StoryProtocolSDK {
  private _client: StoryClient | null
  private isClientSide: boolean

  constructor(client?: StoryClient) {
    this._client = client || createStoryClient()
    this.isClientSide = typeof window !== 'undefined'
  }

  get client(): StoryClient | null {
    return this._client
  }

  setClient(client: StoryClient) {
    this._client = client
  }

  /**
   * Register an IP asset on Story Protocol
   */
  async registerIP(asset: {
    hash: string
    ipfsHash?: string
    arweaveId?: string
    metadata: IPMetadata
    owner: string
  }): Promise<IPAsset> {
    if (!this._client) {
      throw new Error('Story Protocol client not initialized. Please connect your wallet.')
    }

    if (!asset.metadata.title || asset.metadata.title.trim() === '') {
      throw new Error('IP asset title is required')
    }

    try {
      // Prepare media URL
      const mediaUrl = asset.ipfsHash 
        ? `ipfs://${asset.ipfsHash}` 
        : asset.arweaveId 
          ? `ar://${asset.arweaveId}`
          : `https://placeholder.com/${asset.hash}`

      console.log('Registering IP with Story Protocol:', {
        name: asset.metadata.title,
        mediaUrl: mediaUrl.substring(0, 50) + '...',
      })

      // Register using Story Protocol SDK v1.4.2 API
      const response = await this._client.ipAsset.register({
        nftMetadata: {
          nftMetadataURI: mediaUrl,
        },
        ipMetadata: {
          ipMetadataURI: mediaUrl,
        },
      } as any)

      // Extract IP ID from response
      const ipId = response.ipId || response.txHash
      
      if (!ipId) {
        throw new Error('Invalid response from Story Protocol - no IP ID returned')
      }

      return {
        id: ipId,
        hash: asset.hash,
        ipfsHash: asset.ipfsHash,
        arweaveId: asset.arweaveId,
        owner: asset.owner,
        registeredAt: Date.now(),
        metadata: asset.metadata,
        lineage: [],
        royalties: {
          percentage: 0,
          recipients: [],
        },
      }
    } catch (error: any) {
      console.error('Failed to register IP asset:', error)
      
      // Better error messages
      if (error.message?.includes('wallet') || error.message?.includes('account')) {
        throw new Error('Wallet not properly connected. Please reconnect and try again.')
      }
      
      if (error.message?.includes('insufficient') || error.message?.includes('gas')) {
        throw new Error('Insufficient funds. Please ensure you have enough tokens for gas fees.')
      }
      
      throw new Error(error.message || 'Failed to register IP asset. Please try again.')
    }
  }

  /**
   * Placeholder methods for future SDK integration
   */
  async getIPAsset(ipId: string): Promise<IPAsset | null> {
    console.log('getIPAsset is not yet implemented')
    return null
  }

  async updateIPMetadata(ipId: string, metadata: Partial<IPMetadata>): Promise<IPAsset> {
    throw new Error('updateIPMetadata is not yet implemented')
  }

  async setRoyalties(ipId: string, royalties: RoyaltyInfo): Promise<void> {
    console.log('setRoyalties is not yet implemented')
  }

  async grantPermission(ipId: string, permission: Permission): Promise<void> {
    console.log('grantPermission is not yet implemented')
  }

  async getLineage(ipId: string): Promise<IPAsset[]> {
    console.log('getLineage is not yet implemented')
    return []
  }

  async createLicense(ipId: string, licenseTerms: any) {
    throw new Error('createLicense is not yet implemented')
  }
}

// Create singleton instance
export const storyProtocol = new StoryProtocolSDK()
