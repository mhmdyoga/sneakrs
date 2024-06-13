/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'github.com'
      }
    ],
  },
};

export default nextConfig;
