import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { useTranslation } from 'react-i18next';
import { getSidebarItems } from '../../../model/selectors/items';
import { useSelector } from 'react-redux';

export interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const sidebarItemsList = useSelector(getSidebarItems);

	return (
		<section
			data-testid={'sidebar'}
			className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			514806
		</section>
	);
});
