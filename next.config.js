/** @type {import('next').NextConfig} */
const dns = require("dns");
module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  reactStrictMode: true,
  async rewrites() {
    let address = null;
    console.log(process.env.API_URL);
    console.log(
      dns.lookup(process.env.API_URL, (err, address, family) => {
        console.log("address: %j family: IPv%s", address, family);
        address = address;
      })
    );
    // console.log(dns.lookup(process.env.API_URL));
    const url = address ? `http://${address}` : process.env.API_URL;
    console.log(url);
    return [
      {
        source: "/api/graphql",
        destination: `${url}`,
      },
    ];
  },
};
