import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;

	const [collapsed, setCollapsed] = useState<boolean>(false);

	return (
		<div className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
			<Button onClick={() => setCollapsed((prev) => !prev)}>TOGGLE</Button>
			<div className={cls.switchers}>
				<ThemeSwitcher />
			</div>
		</div>
	);
});
