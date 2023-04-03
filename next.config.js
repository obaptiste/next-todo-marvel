/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.annihil.us',
        port:'',
        pathname:'/u/prod/marvel/**'
      },
      {
        protocol:'http',
        hostname: 'i.annihil.us',
        port:'',
        pathname:'/u/prod/marvel/**'
      }
    ]
  }
}
