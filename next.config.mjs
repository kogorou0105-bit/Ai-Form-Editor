/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/gemini-api/:path*",
        destination: "https://generativelanguage.googleapis.com/:path*",
      },
    ];
  },
};

export default nextConfig;
