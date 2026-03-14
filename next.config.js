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
