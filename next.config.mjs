/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dodo.ac',
        port: '',
        pathname: '/np/images/**',
      },
    ],
  },
};

export default nextConfig;
