import path from 'path';
import webpack from 'webpack';
import { webpackConfiguration } from './config/webpack/buildWebpackConfig';
import { BuildEnv, BuildOptions, BuildPaths } from './config/webpack/types/config';

export default (env: BuildEnv): webpack.Configuration => {
	const port = env.port || 3000;
	const mode = env.mode || 'development';
	const isDev = mode === 'development';
	const analyze = env.analyze || false;
	const apiURL = env.apiURL || 'http://localhost:8000';
	const environ = 'app';

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		locales: path.resolve(__dirname, 'public', 'locales'),
		buildLocales: path.resolve(__dirname, 'build', 'locales'),
	};

	const buildOptions: BuildOptions = {
		buildPaths: paths,
		mode,
		isDev,
		port,
		analyze,
		apiURL,
		environ,
	};

	return webpackConfiguration(buildOptions);
};
