import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Flex, VStack } from '@/shared/components/Stack';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { SidebarItemsList } from '../../model/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const [collapsed, setCollapsed] = useState<boolean>(false);

	return (
		<div
			data-testid={'sidebar'}
			className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<VStack gap='16' className={cls.items}>
				{SidebarItemsList.map((item) => (
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
