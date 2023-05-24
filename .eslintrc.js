module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
		'prettier',
		'plugin:storybook/recommended',
		'plugin:react-hooks/recommended',
	],
	overrides: [
		{
			files: ['**/*.test.ts', '**/*.test.js', '**/*.test.tsx', '**/*.test.jsx'],
			env: {
				jest: true,
			},
		},
		{
			files: ['**/src/**/*.test.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 0,
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		// По рекомендациям. Всё же отключил, так как возникли проблемы
		// project: './tsconfig.json',
		// tsconfigRootDir: __dirname,
	},
	plugins: ['react', '@typescript-eslint', 'i18next'],
	rules: {
		'react/display-name': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		// Warnings
		semi: 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'react/jsx-props-no-spreading': 'warn',
		// ERRORS
		'react/button-has-type': 'error',
		// 'no-undef': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
			},
		],
		// 'react/jsx-max-props-per-line': [2, { maximum: 3, when: 'always' }],
		// 'react/jsx-first-prop-new-line': [2, 'multiline'],
		'i18next/no-literal-string': [
			2,
			{
				onlyAttribute: ['data-testid', 'to'],
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
	},
	globals: {
		__IS_DEV__: true,
	},
	// По рекомендациям
	settings: {
		react: {
			createClass: 'createReactClass',
			pragma: 'React',
			fragment: 'Fragment',
			version: 'detect',
		},
	},
};
