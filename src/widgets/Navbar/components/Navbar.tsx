import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getIsAdminOrManager, getUserAuthData, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { getRouteAdminPanel, getRouteArticleCreate, getRouteProfile } from '@/shared/const/router';
import { Text } from '@/shared/components/Text/Text';
import { HStack } from '@/shared/components/Stack';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Icon } from '@/shared/components/Icon/Icon';
import { Dropdown, DropdownItem } from '@/shared/components/Popups';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);
	const isAdminOrManager = useSelector(getIsAdminOrManager);
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

	const items = useMemo<DropdownItem[]>(
		() => [
			...(isAdminOrManager
				? [
						{
							content: t('Админка'),
							href: getRouteAdminPanel(),
						},
				  ]
				: []),
			{
				content: t('Выйти'),
				onClick: onLogout,
			},
			...(authData?.id
				? [
						{
							content: t('Профиль'),
							href: getRouteProfile(authData?.id),
						},
				  ]
				: []),
		],
		[authData?.id, isAdminOrManager, onLogout, t]
	);

	if (authData) {
		return (
			<HStack Tag='header' align='center' max className={classNames(cls.navbar, {}, [className])}>
				<Text variant='inverted' size='size_m' title={t('Articles App')} className={cls.title} />
				<HStack max align='center' justify='between'>
					<AppLink to={getRouteArticleCreate()} variant='inverted'>
						{t('Создать статью')}
					</AppLink>
					<HStack align='center' gap='16'>
						<Button variant='clear'>
							<Icon Svg={NotificationIcon} variant='inverted' />
						</Button>
						<Dropdown
							items={items}
							trigger={<Avatar size={30} src={authData.avatar} />}
							direction='bottomLeft'
						/>
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
				onOpenToggle={onAuthModalOpenToggle}
				onMountToggle={onAuthModalMountToggle}
			/>
			<Text variant='inverted' size='size_m' title={t('Articles App')} className={cls.title} />
			<Button variant='clearInverted' className={cls.login} onClick={onAuthModalMountAndOpen}>
				{t('Войти')}
			</Button>
		</HStack>
	);
});
