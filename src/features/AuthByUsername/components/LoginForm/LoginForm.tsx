import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { useSelector } from 'react-redux';
import { loginActions } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/components/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';

interface LoginFormProps {
	className?: string;
	isOpened?: boolean;
	onOpenToggle?: (bool: boolean) => void;
	onMountToggle?: (bool: boolean) => void;
}

export const LoginForm = memo((props: LoginFormProps) => {
	const { className, isOpened, onMountToggle, onOpenToggle } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch]
	);

	const onLoginClick = useCallback(async () => {
		const act = dispatch(loginByUsername({ username, password }));
		if ((await act).meta.requestStatus === 'fulfilled') {
			onOpenToggle(false);
			onMountToggle(false);
		}
	}, [dispatch, onMountToggle, onOpenToggle, password, username]);

	return (
		<div className={classNames(cls.loginForm, {}, [className])}>
			<Text align='center' size='size_m' title={t('Форма авторизации')} />
			{error && <Text variant='error' title={t('Вы ввели неверный логин или пароль')} />}
			<Input
				className={cls.input}
				placeholder={t('Введите username')}
				onChange={onChangeUsername}
				value={username}
				autoFocus={isOpened}
			/>
			<Input
				className={cls.input}
				placeholder={t('Введите пароль')}
				onChange={onChangePassword}
				value={password}
			/>
			<Button disabled={isLoading} onClick={onLoginClick} className={cls.loginBtn} variant='outline'>
				{t('Войти')}
			</Button>
		</div>
	);
});
