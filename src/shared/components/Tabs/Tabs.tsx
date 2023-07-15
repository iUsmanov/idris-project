import { ReactNode, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { HStack } from '../Stack';

export interface TabItem {
	value: string;
	content: ReactNode;
}

interface TabsProps {
	className?: string;
	tabs: TabItem[];
	value: string;
	onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
	const { className, tabs, onTabClick, value } = props;
	const { t } = useTranslation();

	const onClick = useCallback(
		(tab: TabItem) => () => {
			onTabClick(tab);
		},
		[onTabClick]
	);

	return (
		<HStack gap='8' className={classNames(cls.tabs, {}, [className])}>
			{tabs.map((tab) => (
				<Card
					key={tab.value}
					className={cls.tab}
					variant={tab.value === value ? 'primary' : 'outline'}
					onClick={onClick(tab)}
				>
					{tab.content}
				</Card>
			))}
		</HStack>
	);
});
