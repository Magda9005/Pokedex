/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const path = require("path");

module.exports = {
  images: {
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["raw.githubusercontent.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
