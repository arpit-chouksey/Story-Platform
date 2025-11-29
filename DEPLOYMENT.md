# Deployment Guide

This guide will help you deploy the Story Protocol IP Platform to various hosting platforms.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Environment variables configured

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Test locally**
   ```bash
   npm start
   ```

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Or push to GitHub and connect your repository on [vercel.com](https://vercel.com)

3. **Configure Environment Variables**
   - Go to your project settings on Vercel
   - Navigate to "Environment Variables"
   - Add all variables from `.env.example`

4. **Redeploy**
   - Vercel automatically redeploys on git push
   - Or manually trigger from the dashboard

#### Vercel Configuration

The project includes `vercel.json` with optimized settings:
- Automatic builds on git push
- Optimized regions
- Environment variable templates

### 2. Netlify

#### Steps:

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build command**
   ```bash
   npm run build
   ```

3. **Publish directory**
   ```
   .next
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

5. **Configure Environment Variables**
   - Netlify Dashboard → Site Settings → Environment Variables

### 3. Docker

#### Steps:

1. **Build Docker image**
   ```bash
   docker build -t story-protocol-ip-apps .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=your_key \
     -e NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/ \
     story-protocol-ip-apps
   ```

3. **Docker Compose** (optional)
   Create `docker-compose.yml`:
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=${STORY_PROTOCOL_API_KEY}
         - NEXT_PUBLIC_IPFS_GATEWAY=${IPFS_GATEWAY}
   ```

### 4. AWS (EC2/ECS/Lambda)

#### EC2 Deployment

1. **Launch EC2 instance**
   - Ubuntu 22.04 LTS
   - t2.micro or larger
   - Security group: Allow HTTP (80) and HTTPS (443)

2. **SSH into instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install dependencies**
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm nginx
   ```

4. **Clone and build**
   ```bash
   git clone your-repo-url
   cd story-protocol-ip-apps
   npm install
   npm run build
   ```

5. **Set up PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "story-ip-apps" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### 5. Railway

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize**
   ```bash
   railway init
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Set environment variables**
   ```bash
   railway variables set NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=your_key
   ```

### 6. Render

1. **Create new Web Service**
   - Connect your GitHub repository
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

2. **Environment Variables**
   - Add all variables from `.env.example`

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_STORY_PROTOCOL_API_KEY=your_api_key
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
NEXT_PUBLIC_ARWEAVE_GATEWAY=https://arweave.net/
```

Optional variables:

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_RPC_URL=your_rpc_url
```

## Build Optimization

### Next.js Configuration

The project is configured for optimal production builds:

- Automatic code splitting
- Image optimization
- Static page generation where possible
- API route optimization

### Performance Tips

1. **Enable ISR (Incremental Static Regeneration)**
   - Already configured in page components

2. **Optimize Images**
   - Use Next.js Image component
   - Configure image domains in `next.config.js`

3. **Enable Compression**
   - Most hosting platforms enable this automatically
   - For custom servers, use gzip/brotli

## Monitoring

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
2. **Sentry** for error tracking
3. **Google Analytics** for user analytics
4. **LogRocket** for session replay

### Health Checks

Create a health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: Date.now() })
}
```

## Troubleshooting

### Build Failures

1. **Clear cache**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Check Node version**
   ```bash
   node --version  # Should be 18+
   ```

3. **Verify dependencies**
   ```bash
   npm install
   ```

### Runtime Errors

1. **Check environment variables**
   - Ensure all required variables are set
   - Verify variable names match exactly

2. **Check logs**
   - Vercel: Dashboard → Deployments → View Logs
   - Docker: `docker logs <container-id>`
   - PM2: `pm2 logs`

### Performance Issues

1. **Enable caching**
   - Configure CDN caching headers
   - Use Next.js caching strategies

2. **Optimize bundle size**
   ```bash
   npm run build
   # Check .next/analyze for bundle analysis
   ```

## Security Checklist

- [ ] Environment variables are not committed to git
- [ ] API keys are stored securely
- [ ] HTTPS is enabled
- [ ] CORS is configured correctly
- [ ] Rate limiting is implemented (if needed)
- [ ] Input validation is in place
- [ ] File upload size limits are set

## Support

For deployment issues:
1. Check the [Next.js deployment docs](https://nextjs.org/docs/deployment)
2. Review platform-specific documentation
3. Open an issue on GitHub

---

Happy deploying! 🚀

