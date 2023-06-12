import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
	() =>
		new Promise((resolve) => {
			setTimeout(
				// @ts-ignore
				() => resolve(import('./LoginForm').then((module) => ({ default: module.LoginForm }))),
				800
			);
		})
);
// @ts-ignore
// const AboutPageLazy = lazy(() => import('./MainPage').then((module) => ({ default: module.MainPage })));
