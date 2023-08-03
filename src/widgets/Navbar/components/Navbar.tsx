import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { getRouteArticleCreate } from '@/shared/const/router';
import { Text } from '@/shared/components/Text/Text';
import { HStack } from '@/shared/components/Stack';
import { NotificationsPopup } from '@/features/notificationsPopup';
import { AvatarDropdown } from '@/features/avatarDropdown';

interface NavbarProps {
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
			<HStack Tag='header' align='center' max className={classNames(cls.navbar, {}, [className])}>
				<Text variant='inverted' size='size_m' title={t('Articles App')} className={cls.title} />
				<HStack max align='center' justify='between'>
					<AppLink to={getRouteArticleCreate()} variant='inverted'>
						{t('Создать статью')}
					</AppLink>
					<HStack align='center' gap='16'>
						<NotificationsPopup />
						<AvatarDropdown />
					</HStack>
				</HStack>
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
		>
			<LoginModal
				isOpened={isAuthModalOpened}
				isMounted={isAuthModalMounted}
				onModalClose={onAuthModalClose}
			/>
			<Text variant='inverted' size='size_m' title={t('Articles App')} className={cls.title} />
			<Button variant='clearInverted' className={cls.login} onClick={onAuthModalOpen}>
				{t('Войти')}
			</Button>
		</HStack>
	);
});
