/** @type {import("next").NextConfig} */
const config = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
}

export default config
