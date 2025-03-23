/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy.html',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-and-conditions.html',
        permanent: true,
      },
      {
        source: '/cookies',
        destination: '/cookies-policy.html',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
