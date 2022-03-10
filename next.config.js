/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
