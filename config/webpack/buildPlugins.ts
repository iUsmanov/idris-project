import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {


	const plugins: webpack.WebpackPluginInstance[] = [
		new HtmlWebpackPlugin({
			template: options.buildPaths.html
		}),
		new webpack.ProgressPlugin(),
	]

	if(!options.isDev) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css'
			})
		)
	}

	if(options.isDev) {
		
	}

	return plugins;
}