/** @type {import('next').NextConfig} */
console.log("API_URL");
console.log(`${process.env.API_URL}`);
module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:5000/:path*`,
      },
    ];
  },
};
