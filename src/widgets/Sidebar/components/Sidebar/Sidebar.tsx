import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Button } from '@/shared/components/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Flex, VStack } from '@/shared/components/Stack';
import { LangSwitcher } from '@/features/LangSwitcher';
import { getSidebarItems } from '../../model/selectors/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { SidebarBeauty } from './Beauty/Sidebar.async';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const sidebarItemsList = useSelector(getSidebarItems);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<SidebarBeauty />}
			off={
				<section
					data-testid={'Sidebar'}
					className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
				>
					<VStack Tag='nav' gap='16' className={cls.items}>
						{sidebarItemsList.map((item) => (
							<SidebarItem key={item.text} item={item} collapsed={collapsed} />
						))}
					</VStack>
					<Button
						variant='backgroundInverted'
						className={cls.collapseButton}
						data-testid={'CollapseButton'}
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
						data-testid={'Switchers'}
					>
						<ThemeSwitcher />
						<LangSwitcher className={cls.langSwitcher} short={collapsed} />
					</Flex>
				</section>
			}
		/>
	);
});
