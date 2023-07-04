/** @type {import('next').NextConfig} */
const nextConfig = {
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
