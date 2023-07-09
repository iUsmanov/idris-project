import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Flex, VStack } from '@/shared/components/Stack';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { getSidebarItems } from '../../model/selectors/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const sidebarItemsList = useSelector(getSidebarItems);
	return (
		<div
			data-testid={'sidebar'}
			className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<VStack gap='16' className={cls.items}>
				{sidebarItemsList.map((item) => (
					<SidebarItem key={item.text} item={item} collapsed={collapsed} />
				))}
			</VStack>
			<Button
				variant='backgroundInverted'
				className={cls.collapseButton}
				data-testid={'collapseButton'}
				onClick={() => setCollapsed((prev) => !prev)}
			>
				{collapsed ? '>' : '<'}
			</Button>
			<Flex
				direction={collapsed ? 'column' : 'row'}
				justify='center'
				align='center'
				max
				className={cls.switchers}
			>
				<ThemeSwitcher />
				<LangSwitcher className={cls.langSwitcher} short={collapsed} />
			</Flex>
		</div>
	);
});
