import webpack from 'webpack';

export function buildSvgrLoader(): webpack.RuleSetRule {
	const svgrLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
		exclude: /node_modules/,
	};

	return svgrLoader;
}
