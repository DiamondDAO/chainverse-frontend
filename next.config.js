/** @type {import('next').NextConfig} */
module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: `http://${process.env.API_URL}`,
      },
    ];
  },
};
