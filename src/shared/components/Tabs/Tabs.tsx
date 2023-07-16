import { ReactNode, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { HStack } from '../Stack';

export interface TabItem<T extends string> {
	value: T;
	content: ReactNode;
}

interface TabsProps<T extends string> {
	className?: string;
	tabs: TabItem<T>[];
	value: T;
	onTabClick: (tab: TabItem<T>) => void;
}

const typedMemo: <T>(props: T) => T = memo;

export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
	const { className, tabs, onTabClick, value } = props;
	const { t } = useTranslation();

	const onClick = useCallback(
		(tab: TabItem<T>) => () => {
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
