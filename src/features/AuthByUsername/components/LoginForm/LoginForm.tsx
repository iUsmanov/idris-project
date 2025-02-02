import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/components/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { AppLink } from '@/shared/components/AppLink';

export interface LoginFormProps {
	className?: string;
	isOpened?: boolean;
	onModalClose?: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

export const LoginForm = memo((props: LoginFormProps) => {
	const { className, isOpened, onModalClose } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	useDynamicModule({ reducers: initialReducers });

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
		if (__ENVIRON__ !== 'storybook') {
			const action = await dispatch(loginByUsername({ username, password }));
			if (action.meta.requestStatus === 'fulfilled') {
				onModalClose?.();
			}
		}
	}, [dispatch, onModalClose, password, username]);

	return (
		<div className={classNames(cls.loginForm, {}, [className])} data-testid='LoginForm'>
			<Text align='center' size='size_m' title={t('Форма авторизации')} className={cls.title} />
			<AppLink
				target='_blank'
				variant='outline'
				to={'https://github.com/iUsmanov/idris-project/blob/main/docs/authentication.md'}
				// eslint-disable-next-line i18next/no-literal-string
			>
				КАК ВОЙТИ ?
			</AppLink>
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
