// web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.itch.zone",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
