/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud', 'arweave.net', 'via.placeholder.com', 'images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

export default nextConfig
