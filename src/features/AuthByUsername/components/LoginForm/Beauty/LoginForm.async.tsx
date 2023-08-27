import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

const LoginFormAsync = lazy<FC<LoginFormProps>>(() =>
	import('./LoginForm').then((module) => ({ default: module.LoginForm }))
);

export { LoginFormAsync as LoginFormBeauty };
