/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core configuration
  reactStrictMode: true,
  
  // Build optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Environment variables
  env: {
    VITE_LEGISCAN_API_KEY: process.env.VITE_LEGISCAN_API_KEY,
  },
  
  // Disable experimental features to avoid conflicts
  experimental: {
    // Disable all experimental features
    optimizeCss: false,
    optimizePackageImports: [],
    serverComponentsExternalPackages: [],
  },
  
  // Use the standalone output format for better Vercel compatibility
  output: 'standalone',
  
  // Explicitly disable SWC minification to avoid conflicts
  swcMinify: false,
  
  // Webpack configuration to avoid conflicts
  webpack: (config, { isServer }) => {
    // Return the modified config
    return config
  },
}

export default nextConfig
