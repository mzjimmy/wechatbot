/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WECHAT_MERCHANT_ID: process.env.WECHAT_MERCHANT_ID,
    WECHAT_PRIVATE_KEY: process.env.WECHAT_PRIVATE_KEY,
    WECHAT_API_V3_KEY: process.env.WECHAT_API_V3_KEY,
  },
  // 添加构建配置
  eslint: {
    // 在生产构建时不因 ESLint 错误而失败
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在生产构建时不因 TypeScript 错误而失败
    ignoreBuildErrors: true,
  },
};

export default nextConfig; 