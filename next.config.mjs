/** @type {import('next').NextConfig} */
const nextConfig = {
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