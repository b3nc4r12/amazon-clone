/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    moralis_app_id: process.env.MORALIS_APP_ID,
    moralis_server_url: process.env.MORALIS_SERVER_URL,
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  },
  images: {
    domains: ["fakestoreapi.com", "links.papareact.com"]
  }
}

module.exports = nextConfig