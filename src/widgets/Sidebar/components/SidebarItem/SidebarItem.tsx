import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { HStack } from '@/shared/components/Stack';
import { SidebarItemType } from '../../model/items';

interface SidebarItemProps {
	item: SidebarItemType;
	collapsed?: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { item, collapsed } = props;
	const { t } = useTranslation();

	return (
		<AppLink
			variant='inverted'
			className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
			to={item.path}
		>
			<HStack align='center'>
				<item.Icon className={cls.icon} />
				<span className={cls.link}>{t(item.text)}</span>
			</HStack>
		</AppLink>
	);
});
