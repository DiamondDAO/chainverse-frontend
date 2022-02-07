/** @type {import('next').NextConfig} */
const dns = require("dns");
console.log(process.env.API_URL);
console.log(dns.lookup(process.env.API_URL));
module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: `${process.env.API_URL}`,
      },
    ];
  },
};
