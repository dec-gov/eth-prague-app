/** @type {import("next").NextConfig} */
const config = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

export default config
