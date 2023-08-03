import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAdminOrManager, getUserAuthData, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Dropdown, DropdownItem } from '@/shared/components/Popups';

interface AvatarDropdownProps {
	className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isAdminOrManager = useSelector(getIsAdminOrManager);
	const authData = useSelector(getUserAuthData);

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

	if (!authData) return null;

	return (
		<Dropdown
			className={classNames('', {}, [className])}
			items={items}
			trigger={<Avatar size={30} src={authData.avatar} />}
			direction='bottomLeft'
		/>
	);
});
