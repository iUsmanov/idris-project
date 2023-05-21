import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildScssLoader } from './loaders/buildScssLoader';
import { buildSvgrLoader } from './loaders/buildSvgrLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const svgrLoader = buildSvgrLoader();

	const assetsLoader = {
		test: /\.(png|jpg|gif|woff|woff2)$/i,
		type: 'asset/resource',
		// dependency: { not: ['url'] },
	};

	const babelLoader = {
		test: /\.(js|jsx|ts|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	};

	const scssLoader = buildScssLoader(options.isDev);

	return [typescriptLoader, scssLoader, svgrLoader, assetsLoader];
}
