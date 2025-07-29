/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  
  // Configure domains for external images if using images in ads
  images: {
    domains: [
      'googleads.g.doubleclick.net',
      'tpc.googlesyndication.com',
      'pagead2.googlesyndication.com'
    ],
  },
  
  // Headers for AdSense
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ]
  },
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID,
  },
}

module.exports = nextConfig