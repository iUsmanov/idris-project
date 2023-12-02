import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../../model/selectors/items';
import { useSelector } from 'react-redux';
import { AppLogo } from '@/shared/components/AppLogo';
import { Flex, VStack } from '@/shared/components/Stack';
import { SidebarItem } from '../../SidebarItem/SidebarItem';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '@/shared/components/Icon';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';

export interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const sidebarItemsList = useSelector(getSidebarItems);

	return (
		<section
			data-testid={'Sidebar'}
			className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />
			<VStack Tag='nav' gap='16' className={cls.items}>
				{sidebarItemsList.map((item) => (
					<SidebarItem key={item.text} item={item} collapsed={collapsed} />
				))}
			</VStack>
			<Icon
				Svg={ArrowIcon}
				className={cls.collapseButton}
				data-testid={'CollapseButton'}
				onClick={() => setCollapsed((prev) => !prev)}
				clickable
			/>
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
	);
});
