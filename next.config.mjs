export default (phase, { defaultConfig }) => {
	/**
	 * @type {import('next').NextConfig}
	 */
	const nextConfig = {
		logging: {
			fetches: {
				fullUrl: true,
			},
		},
	};

	return nextConfig;
};
