import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			exportAsDefault: true,
			svgrOptions: {
				icon: true,
				svgoConfig: {
					// plugins: [
					// 	{
					// 		name: 'convertColors',
					// 		params: {
					// 			currentColor: true,
					// 		},
					// 	},
					// ],
				},
				// replaceAttrValues: {
				// 	'/#[0-9A-F]{6}/g': 'red',
				// 	'#FFC700': 'currentColor',
				// },
			},
		}),
	],
	resolve: {
		alias: [{ find: '@', replacement: '/src' }],
	},
	define: {
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify('http://localhost:8000'),
		__ENVIRON__: JSON.stringify('app'),
	},
	css: {
		modules: {
			generateScopedName: '[path][name]__[local]--[hash:base64:5]',
		},
	},
});
