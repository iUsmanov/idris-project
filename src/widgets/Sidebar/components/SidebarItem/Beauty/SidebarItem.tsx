import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { AppLink } from '@/shared/components/AppLink';
import { HStack } from '@/shared/components/Stack';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../../model/types/sidebar';
import { Icon } from '@/shared/components/Icon';

export interface SidebarItemProps {
	className?: string;
	item: SidebarItemType;
	collapsed?: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { item, collapsed, className } = props;
	const { t } = useTranslation();
	const isAuth = useSelector(getUserAuthData);

	if (!isAuth && item.authOnly) {
		return null;
	}

	return (
		<AppLink
			activeClassName={cls.active}
			className={classNames(cls.item, { [cls.collapsed]: collapsed }, [className])}
			to={item.path}
			data-testid='SidebarItem'
		>
			<HStack align='center' justify={collapsed ? 'center' : 'left'}>
				<Icon Svg={item.Icon} />
				<span className={cls.link}>{t(item.text)}</span>
			</HStack>
		</AppLink>
	);
});
