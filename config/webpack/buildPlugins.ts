import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
	const plugins: webpack.WebpackPluginInstance[] = [
		new HtmlWebpackPlugin({
			template: options.buildPaths.html,
		}),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(options.isDev),
		}),
	];

	if (!options.isDev) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			})
		);
	}

	if (options.isDev) {
		plugins.push(new ReactRefreshWebpackPlugin());
	}

	return plugins;
}
