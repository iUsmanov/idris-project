import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { AppLink } from '@/shared/components/AppLink';
import { HStack } from '@/shared/components/Stack';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { SidebarItemBeauty } from './Beauty/SidebarItem.async';

interface SidebarItemProps {
	className?: string;
	item: SidebarItemType;
	collapsed?: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { item, collapsed } = props;
	const { t } = useTranslation();
	const isAuth = useSelector(getUserAuthData);

	if (!isAuth && item.authOnly) {
		return null;
	}

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<SidebarItemBeauty {...props} />}
			off={
				<AppLink
					variant='inverted'
					className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
					to={item.path}
					data-testid='SidebarItem'
				>
					<HStack align='center'>
						<item.Icon className={cls.icon} />
						<span className={cls.link}>{t(item.text)}</span>
					</HStack>
				</AppLink>
			}
		/>
	);
});
