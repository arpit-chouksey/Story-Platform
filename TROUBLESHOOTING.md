# Troubleshooting Guide

## Common Errors and Solutions

### "Cannot convert undefined to a BigInt"

This error occurs when the Story Protocol SDK receives an undefined value where it expects a BigInt.

**Solutions:**

1. **Check IP Org ID:**
   - Ensure `NEXT_PUBLIC_IP_ORG_ID` is set in your `.env.local`
   - The value must be a valid number (e.g., "1", "2", etc.)
   - Example: `NEXT_PUBLIC_IP_ORG_ID=1`

2. **Verify Wallet Connection:**
   - Make sure your wallet is properly connected
   - The account address should be available
   - Try disconnecting and reconnecting your wallet

3. **Check Story Protocol Client:**
   - Ensure the client is properly initialized
   - Check browser console for initialization errors
   - Verify RPC URL is correct: `NEXT_PUBLIC_RPC_URL=https://aeneid-rpc.story.foundation`

4. **Environment Variables:**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_RPC_URL=https://aeneid-rpc.story.foundation
   NEXT_PUBLIC_CHAIN_ID=aeneid
   NEXT_PUBLIC_IP_ORG_ID=1
   ```

### "Story Protocol client not initialized"

**Solution:**
- Connect your wallet using the "Connect Wallet" button
- Make sure MetaMask or another Web3 wallet is installed
- Check that the wallet is on the correct network (Aeneid testnet)

### "Failed to register IP asset"

**Possible causes:**
1. **Insufficient funds** - You need tokens for gas fees
2. **Wrong network** - Make sure you're on Aeneid testnet
3. **Invalid IP Org ID** - Check your IP Organization ID
4. **RPC issues** - The RPC endpoint might be down

**Solutions:**
- Check your wallet balance
- Verify network settings
- Try again after a few moments
- Check Story Protocol status

### "Account address is missing"

**Solution:**
- Reconnect your wallet
- Make sure the wallet is unlocked
- Check browser console for wallet connection errors

## Testing Without Real Registration

If you want to test the UI without actually registering on-chain:

1. The app will show errors if the SDK isn't properly configured
2. You can still test the upload and metadata flow
3. For full functionality, you need:
   - Connected wallet
   - Testnet tokens
   - Valid IP Org ID
   - Working RPC endpoint

## Getting Help

1. Check browser console for detailed error messages
2. Verify all environment variables are set
3. Ensure wallet is connected and on correct network
4. Check Story Protocol documentation: https://docs.story.foundation

