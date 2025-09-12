/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        hostname: 'rhwcoyrutufrlmqudaay.supabase.co',
      },
      {
        hostname: 'github.com'
      }
    ],
  },
};

export default nextConfig;
