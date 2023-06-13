import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/components/Input/Input';
import { Button } from '@/shared/components/Button/Button';
import { useSelector, useStore } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/components/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';

export interface LoginFormProps {
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
	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		store.reducerManager.add('loginForm', loginReducer);
		dispatch({ type: `@INIT loginForm reducer` });
		return () => {
			store.reducerManager.remove('loginForm');
			dispatch({ type: `@DESTROY loginForm reducer` });
		};
		// eslint-disable-next-line
	}, []);

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
