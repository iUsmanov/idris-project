import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { HStack } from '@/shared/components/Stack';
import { NotificationsPopup } from '@/features/notificationsPopup';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { Button } from '@/shared/components/Button';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

export interface NavbarProps {
	className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);
	const {
		isOpened: isAuthModalOpened,
		isMounted: isAuthModalMounted,
		onMountAndOpen: onAuthModalOpen,
		onUnmountAndClose: onAuthModalClose,
	} = useModal();

	if (authData) {
		return (
			<HStack
				Tag='header'
				align='start'
				max
				className={classNames(cls.navbar, {}, [className])}
				data-testid='Navbar'
			>
				<NotificationsPopup />
				<AvatarDropdown />
			</HStack>
		);
	}

	return (
		<HStack
			Tag='header'
			justify='between'
			align='center'
			max
			className={classNames(cls.navbar, {}, [className])}
			data-testid='Navbar'
		>
			<LoginModal
				isOpened={isAuthModalOpened}
				isMounted={isAuthModalMounted}
				onModalClose={onAuthModalClose}
			/>
			<Button variant='clear' className={cls.login} onClick={onAuthModalOpen}>
				{t('Войти')}
			</Button>
		</HStack>
	);
});
