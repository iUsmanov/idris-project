import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { getRouteArticleCreate, getRouteProfile } from '@/shared/const/router';
import { Text } from '@/shared/components/Text/Text';
import { HStack } from '@/shared/components/Stack';
import { Dropdown, DropdownItem } from '@/shared/components/Dropdown/Dropdown';
import { Avatar } from '@/shared/components/Avatar/Avatar';

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

	const items = useMemo<DropdownItem[]>(
		() => [
			{
				content: t('Выйти'),
				onClick: onLogout,
			},
			{
				content: t('Профиль'),
				href: authData?.id ? getRouteProfile(authData?.id) : '*',
			},
		],
		[authData?.id, onLogout, t]
	);

	if (authData) {
		return (
			<HStack Tag='header' align='center' max className={classNames(cls.navbar, {}, [className])}>
				<Text variant='inverted' size='size_m' title={t('Articles App')} className={cls.title} />
				<HStack max align='center' justify='between'>
					<AppLink to={getRouteArticleCreate()} variant='inverted'>
						{t('Создать статью')}
					</AppLink>
					<Dropdown
						items={items}
						trigger={
							<Avatar
								size={30}
								src={
									'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png'
								}
							/>
						}
						direction='bottomLeft'
					/>
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
