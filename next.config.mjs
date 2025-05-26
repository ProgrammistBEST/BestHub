/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "10MB",
    },
  },
  devIndicators: false,
};

export default nextConfig;
