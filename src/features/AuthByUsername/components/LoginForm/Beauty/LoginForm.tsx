import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
	className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.loginForm, {}, [className])}></div>;
});
