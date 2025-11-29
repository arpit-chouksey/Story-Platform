# Vercel Deployment Setup Guide

This guide will help you deploy the Story Protocol IP Platform to Vercel without errors.

## ✅ Fixed Issues

- Removed non-existent secret references from `vercel.json`
- Environment variables should now be set directly in Vercel dashboard

## 🚀 Deployment Steps

### 1. Push to GitHub

Make sure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3. Configure Environment Variables

**IMPORTANT:** You must add environment variables in the Vercel dashboard before deploying.

1. In the project import screen, click **"Environment Variables"**
2. Add each variable one by one:

#### Required Variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `NEXT_PUBLIC_RPC_URL` | `https://aeneid-rpc.story.foundation` | Story Protocol RPC endpoint (or your custom RPC) |
| `NEXT_PUBLIC_CHAIN_ID` | `aeneid` | Story Protocol chain ID (testnet: 'aeneid', mainnet: check docs) |
| `NEXT_PUBLIC_IPFS_GATEWAY` | `https://ipfs.io/ipfs/` | IPFS gateway URL |
| `NEXT_PUBLIC_ARWEAVE_GATEWAY` | `https://arweave.net/` | Arweave gateway URL |

#### Optional Variables (for server-side operations):

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `WALLET_PRIVATE_KEY` | `0x...` | Private key for server-side operations (keep secret!) |
| `RPC_PROVIDER_URL` | `your_rpc_url` | Alternative RPC URL (server-side) |
| `NEXT_PUBLIC_IP_ORG_ID` | `1` | Default IP Organization ID |
| `NEXT_PUBLIC_LICENSE_TEMPLATE_ID` | `1` | Default License Template ID |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `your_project_id` | WalletConnect project ID (if using WalletConnect) |

### 4. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

## 🔧 Setting Environment Variables After Deployment

If you need to add/update environment variables after deployment:

1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add or edit variables
4. Click **"Redeploy"** for changes to take effect

## 📝 Local Development

For local development, create a `.env.local` file:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your actual values
```

**Note:** `.env.local` is already in `.gitignore` and won't be committed.

## 🐛 Troubleshooting

### Error: "Environment Variable references Secret which does not exist"

✅ **Fixed!** This error occurred because `vercel.json` was referencing a secret that didn't exist. The file has been updated to remove those references.

### Environment Variables Not Working

1. Make sure variable names start with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding new variables
3. Check the build logs for any errors

### Build Fails

1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version (should be 18+)

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## ✅ Checklist

Before deploying, make sure:

- [ ] Code is pushed to GitHub
- [ ] Environment variables are set in Vercel dashboard
- [ ] `vercel.json` doesn't reference non-existent secrets
- [ ] `.env.local` is in `.gitignore` (already done)
- [ ] `.env.example` exists for reference (already done)

---

**You're all set!** The project should now deploy successfully to Vercel. 🎉

