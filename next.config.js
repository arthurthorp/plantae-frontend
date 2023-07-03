/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '0.0.0.0',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
