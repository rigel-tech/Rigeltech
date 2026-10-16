/** @type {import('next').NextConfig} */
const supabaseHostname = (() => {
  try {
    return process.env.SUPABASE_URL
      ? new URL(process.env.SUPABASE_URL).hostname
      : null
  } catch {
    return null
  }
})()

const nextConfig = {
  // The previous site served every page under /vi (and /en); keep those links working
  async redirects() {
    return [
      { source: '/vi', destination: '/', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      { source: '/vi/:path*', destination: '/:path*', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ]
  },
  // Optimize CSS loading
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chart.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.baophapluat.vn',
      },
      {
        protocol: 'http',
        hostname: 'kyluc.vn',
      },
      {
        protocol: 'https',
        hostname: 'kyluc.vn',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      ...(supabaseHostname
        ? [
            {
              protocol: 'https',
              hostname: supabaseHostname,
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig
