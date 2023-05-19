import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { HStack } from '@/shared/components/Stack';
import { LangSwitcher } from '@/features/LangSwitcher';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;

	const [collapsed, setCollapsed] = useState<boolean>(false);

	return (
		<div
			data-testid={'sidebar'}
			className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<Button data-testid={'collapseButton'} onClick={() => setCollapsed((prev) => !prev)}>
				TOGGLE
			</Button>
			<HStack justify='center' align='center' max className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher className={cls.langSwitcher} />
			</HStack>
		</div>
	);
});
