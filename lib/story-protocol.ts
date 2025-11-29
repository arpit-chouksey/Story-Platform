/**
 * Story Protocol SDK Integration
 * This module provides utilities for interacting with Story Protocol
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
 * Initialize Story Protocol Client
 * Supports both private key and wallet connection
 */
export function createStoryClient(): StoryClient | null {
  try {
    // Option 1: Use private key from environment (for server-side)
    const privateKey = process.env.WALLET_PRIVATE_KEY
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || process.env.RPC_PROVIDER_URL
    
    if (privateKey && rpcUrl) {
      const account = privateKeyToAccount(`0x${privateKey.replace('0x', '')}` as `0x${string}`)
      
      const config: StoryConfig = {
        account: account,
        transport: http(rpcUrl),
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID || 'aeneid', // Story Protocol testnet
      }
      
      return StoryClient.newClient(config)
    }
    
    // Option 2: Will be initialized with wallet connection (client-side)
    // This will be handled by wallet connection hooks
    return null
  } catch (error) {
    console.error('Failed to initialize Story Protocol client:', error)
    return null
  }
}

/**
 * Story Protocol SDK wrapper with real SDK integration
 */
export class StoryProtocolSDK {
  private _client: StoryClient | null
  private isClientSide: boolean

  constructor(client?: StoryClient) {
    this._client = client || createStoryClient()
    this.isClientSide = typeof window !== 'undefined'
  }

  /**
   * Get client (read-only access)
   */
  get client(): StoryClient | null {
    return this._client
  }

  /**
   * Set client (for wallet connection)
   */
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
      throw new Error('Story Protocol client not initialized. Please connect your wallet or set WALLET_PRIVATE_KEY.')
    }

    // Validate required fields
    if (!asset.metadata.title || asset.metadata.title.trim() === '') {
      throw new Error('IP asset title is required')
    }

    try {
      // Get IP Org ID and convert to BigInt
      const ipOrgIdStr = process.env.NEXT_PUBLIC_IP_ORG_ID || '1'
      let ipOrgId: bigint
      try {
        ipOrgId = BigInt(ipOrgIdStr)
      } catch (e) {
        throw new Error(`Invalid IP Org ID: ${ipOrgIdStr}. Must be a valid number.`)
      }

      // Ensure mediaUrl is not empty - Story Protocol requires a valid URL
      const mediaUrl = asset.ipfsHash 
        ? `ipfs://${asset.ipfsHash}` 
        : asset.arweaveId 
          ? `ar://${asset.arweaveId}`
          : `https://placeholder.com/${asset.hash}` // Fallback URL

      // Validate client account
      if (!this._client.account || !this._client.account.address) {
        throw new Error('Story Protocol client account is not properly configured. Please reconnect your wallet.')
      }

      // Validate account
      const accountAddress = this._client.account?.address
      if (!accountAddress) {
        throw new Error('Account address is missing. Please reconnect your wallet.')
      }

      console.log('Registering IP with:', {
        ipOrgId: ipOrgId.toString(),
        name: asset.metadata.title,
        mediaUrl: mediaUrl.substring(0, 50) + '...',
        account: accountAddress,
      })

      // Prepare registration parameters
      const registerParams: any = {
        ipOrgId: ipOrgId,
        name: asset.metadata.title,
        mediaUrl: mediaUrl,
      }

      // Add metadata if the SDK supports it
      // Some SDK versions might expect metadata in a different format
      try {
        // Try with metadata object
        registerParams.metadata = {
          name: asset.metadata.title,
          description: asset.metadata.description || '',
          type: asset.metadata.type,
          tags: asset.metadata.tags || [],
          license: asset.metadata.license || '',
        }
      } catch (e) {
        // If metadata format is wrong, continue without it
        console.warn('Metadata format issue, continuing without metadata object')
      }

      // Register IP Asset using Story Protocol SDK
      const response = await this._client.ipAsset.register(registerParams)

      if (!response || !response.ipAssetId) {
        throw new Error('Invalid response from Story Protocol SDK: missing ipAssetId')
      }

      return {
        id: response.ipAssetId,
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
      
      // Provide more helpful error messages
      if (error.message?.includes('BigInt')) {
        throw new Error('Invalid parameter format. Please check your IP Org ID configuration.')
      }
      
      if (error.message?.includes('account') || error.message?.includes('wallet')) {
        throw new Error('Wallet not properly connected. Please reconnect your wallet and try again.')
      }
      
      if (error.message?.includes('insufficient funds') || error.message?.includes('gas')) {
        throw new Error('Insufficient funds for transaction. Please ensure you have enough tokens for gas fees.')
      }
      
      // Re-throw with original message if it's already helpful
      throw new Error(error.message || 'Failed to register IP asset. Please try again.')
    }
  }

  /**
   * Get IP asset details
   */
  async getIPAsset(ipId: string): Promise<IPAsset | null> {
    if (!this._client) {
      throw new Error('Story Protocol client not initialized.')
    }

    try {
      const ipAsset = await this._client.ipAsset.get({
        ipAssetId: ipId,
      })

      if (!ipAsset) return null

      return {
        id: ipId,
        hash: '', // Will be fetched from metadata
        owner: ipAsset.owner || '',
        registeredAt: ipAsset.createdAt ? Number(ipAsset.createdAt) * 1000 : Date.now(),
        metadata: {
          title: ipAsset.name || '',
          description: ipAsset.metadata?.description || '',
          type: (ipAsset.metadata?.type as any) || 'art',
          tags: ipAsset.metadata?.tags || [],
          license: ipAsset.metadata?.license || '',
        },
        lineage: [],
      }
    } catch (error) {
      console.error('Failed to get IP asset:', error)
      return null
    }
  }

  /**
   * Update IP asset metadata
   */
  async updateIPMetadata(ipId: string, metadata: Partial<IPMetadata>): Promise<IPAsset> {
    if (!this._client) {
      throw new Error('Story Protocol client not initialized.')
    }

    try {
      // Story Protocol SDK update method
      await this._client.ipAsset.update({
        ipAssetId: ipId,
        name: metadata.title,
        metadata: {
          name: metadata.title || '',
          description: metadata.description || '',
          type: metadata.type || 'art',
          tags: metadata.tags || [],
          license: metadata.license || '',
        },
      })

      const updated = await this.getIPAsset(ipId)
      if (!updated) {
        throw new Error('Failed to fetch updated IP asset')
      }
      return updated
    } catch (error) {
      console.error('Failed to update IP metadata:', error)
      throw error
    }
  }

  /**
   * Set royalties for an IP asset
   */
  async setRoyalties(ipId: string, royalties: RoyaltyInfo): Promise<void> {
    if (!this._client) {
      throw new Error('Story Protocol client not initialized.')
    }

    try {
      // Use Story Protocol Royalty Module
      await this._client.royalty.setRoyaltyPolicy({
        ipAssetId: ipId,
        royaltyPolicy: {
          royaltyStack: royalties.recipients.map((recipient) => ({
            receiver: recipient.address as `0x${string}`,
            percentage: recipient.percentage,
          })),
        },
      })
    } catch (error) {
      console.error('Failed to set royalties:', error)
      throw error
    }
  }

  /**
   * Grant permissions for an IP asset
   */
  async grantPermission(ipId: string, permission: Permission): Promise<void> {
    if (!this._client) {
      throw new Error('Story Protocol client not initialized.')
    }

    try {
      // Use Story Protocol License Module to grant permissions
      await this._client.license.mintLicense({
        ipAssetId: ipId,
        licenseTemplate: process.env.NEXT_PUBLIC_LICENSE_TEMPLATE_ID || '1',
        licenseTerms: {
          // Define license terms based on permission type
          commercialUse: permission.type === 'commercial',
          derivativeWorks: permission.type === 'derivative',
          // Add other terms as needed
        },
        recipient: permission.grantedTo as `0x${string}` || this._client.account.address,
      })
    } catch (error) {
      console.error('Failed to grant permission:', error)
      throw error
    }
  }

  /**
   * Get IP asset lineage (derivative relationships)
   */
  async getLineage(ipId: string): Promise<IPAsset[]> {
    if (!this._client) {
      throw new Error('Story Protocol client not initialized.')
    }

    try {
      // Fetch derivative relationships
      const relationships = await this._client.ipAsset.getRelations({
        ipAssetId: ipId,
      })

      // Convert to IPAsset format
      const lineage: IPAsset[] = []
      for (const rel of relationships) {
        const asset = await this.getIPAsset(rel.relatedIpAssetId)
        if (asset) {
          lineage.push(asset)
        }
      }

      return lineage
    } catch (error) {
      console.error('Failed to get lineage:', error)
      return []
    }
  }

  /**
   * Create a license for an IP asset
   */
  async createLicense(ipId: string, licenseTerms: {
    commercialUse?: boolean
    derivativeWorks?: boolean
    exclusive?: boolean
  }) {
    if (!this._client) {
      throw new Error('Story Protocol client not initialized.')
    }

    try {
      const response = await this.client.license.mintLicense({
        ipAssetId: ipId,
        licenseTemplate: process.env.NEXT_PUBLIC_LICENSE_TEMPLATE_ID || '1',
        licenseTerms: licenseTerms,
      })

      return response
    } catch (error) {
      console.error('Failed to create license:', error)
      throw error
    }
  }
}

// Create singleton instance
// Note: For client-side usage, you'll need to initialize with wallet connection
export const storyProtocol = new StoryProtocolSDK()
