import type { StorybookConfig } from '@storybook/react-webpack5';
import { buildScssLoader } from '../webpack/loaders/buildScssLoader';
import path from 'path';
import { buildSvgrLoader } from '../webpack/loaders/buildSvgrLoader';
import webpack, { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
	stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
	staticDirs: ['../../public'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-addon-mock',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config, { configType }) => {
		if (config.resolve) {
			config.resolve.modules = [
				...(config.resolve.modules || []),
				path.resolve(__dirname, '..', '..', 'src'),
			];
			config.resolve.alias = {
				...config.resolve.alias,
				'@': path.resolve(__dirname, '..', '..', 'src'),
			};
		}
		if (config.module?.rules) {
			config.module.rules = [...(config.module?.rules || []), buildScssLoader(true)];

			config.module.rules = config.module.rules.map((rule: RuleSetRule | '...') => {
				if (rule !== '...' && /svg/.test(rule.test as string)) {
					return { ...rule, exclude: /\.svg$/i };
				}

				return rule;
			});

			config.module.rules.push(buildSvgrLoader());
		}

		if (config.plugins) {
			config.plugins = [
				...config.plugins,
				new webpack.DefinePlugin({
					__IS_DEV__: JSON.stringify(true),
					__API__: JSON.stringify('https://storybook-api.story'),
					__ENVIRON__: JSON.stringify('storybook'),
				}),
			];
			// console.log('HAHAH');!NOT WoRKS
		}

		return config;
	},
};

export default config;
