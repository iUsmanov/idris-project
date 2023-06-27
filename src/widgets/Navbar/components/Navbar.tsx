import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
interface NavbarProps {
	className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);
	const dispatch = useAppDispatch();
	const {
		isOpened: isAuthModalOpened,
		isMounted: isAuthModalMounted,
		onOpenToggle: onAuthModalOpenToggle,
		onMountToggle: onAuthModalMountToggle,
		onMountAndOpen: onAuthModalMountAndOpen,
	} = useModal();

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	if (authData) {
		return (
			<div className={classNames(cls.navbar, {}, [className])}>
				<div>{t('Articles App')}</div>
				<Button variant='clearInverted' className={cls.login} onClick={onLogout}>
					{t('Выйти')}
				</Button>
			</div>
		);
	}

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<LoginModal
				isOpened={isAuthModalOpened}
				isMounted={isAuthModalMounted}
				onOpenToggle={onAuthModalOpenToggle}
				onMountToggle={onAuthModalMountToggle}
			/>
			<div>{t('Articles App')}</div>
			<Button variant='clearInverted' className={cls.login} onClick={onAuthModalMountAndOpen}>
				{t('Войти')}
			</Button>
		</div>
	);
});
