/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dtt1wnvfb/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;