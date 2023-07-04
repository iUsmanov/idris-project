import webpack from 'webpack';

export function buildBabelLoader(isDev: boolean): webpack.RuleSetRule {
	const babelLoader = {
		test: /\.(js|jsx|ts|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
			},
		},
	};

	return babelLoader;
}
