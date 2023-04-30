/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['prod.demo.saleor.cloud', 'demo.saleor.io', 'www.breitling.com']
  }
}

module.exports = nextConfig
