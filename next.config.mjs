/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify is now enabled by default in Next.js 15, so we can remove it
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    VITE_LEGISCAN_API_KEY: process.env.VITE_LEGISCAN_API_KEY,
  },
  // Disable static optimization for problematic pages
  unstable_disableStaticImages: true,
  // Use the standalone output format
  output: 'standalone',
  // Explicitly disable CSS optimization
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react'],
  }
}

export default nextConfig
