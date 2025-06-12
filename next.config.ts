import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	typescript: {
		ignoreBuildErrors: true,
	},
	rules: {
		"react/no-unescaped-entities": "off",
		"@next/next/no-page-custom-font": "off",
		"@typescript-eslint/no-unused-vars": "off",
	},
};

export default nextConfig;
