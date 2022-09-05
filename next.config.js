/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"]
  },
  env: {
    payment_contract_address: process.env.PAYMENT_CONTRACT_ADDRESS,
    moralis_api_key: process.env.MORALIS_API_KEY,
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  }
}

module.exports = nextConfig