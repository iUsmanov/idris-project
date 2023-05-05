import webpack from 'webpack'

export function buildLoaders(): webpack.RuleSetRule[] {

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
		  "style-loader",
		  {
			loader: "css-loader",
			options: {
			  modules: true,
			},
		  },
		  "sass-loader",
		],
	 }

	return [
		typescriptLoader,
		scssLoader,
	]
}