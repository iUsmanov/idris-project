import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';

interface LoginFormProps {
	className?: string;
	isOpened?: boolean;
}

export const LoginForm = memo((props: LoginFormProps) => {
	const { className, isOpened } = props;
	const { t } = useTranslation();
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const onChangeLogin = useCallback((value: string) => {
		setLogin(value);
	}, []);

	const onChangePassword = useCallback((value: string) => {
		setPassword(value);
	}, []);

	return (
		<div className={classNames(cls.loginForm, {}, [className])}>
			<Input
				className={cls.input}
				placeholder={t('Введите username')}
				onChange={onChangeLogin}
				value={login}
				autoFocus={isOpened}
			/>
			<Input
				className={cls.input}
				placeholder={t('Введите пароль')}
				onChange={onChangePassword}
				value={password}
			/>
			<Button className={cls.loginBtn} variant='outline'>
				{t('Войти')}
			</Button>
		</div>
	);
});
