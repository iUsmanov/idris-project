import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '@/shared/components/Card';
import { HStack } from '@/shared/components/Stack';
import { typedMemo } from '@/shared/lib/helpers/typedMemo/typedMemo';

export interface TabItem<T extends string> {
	value: T;
	content: ReactNode;
}

export interface TabsMatrixProps<T extends string> {
	className?: string;
	tabs: TabItem<T>[];
	value: T;
	onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = typedMemo(<T extends string>(props: TabsMatrixProps<T>) => {
	const { className, tabs, onTabClick, value } = props;
	const { t } = useTranslation();

	const onClick = useCallback(
		(tab: TabItem<T>) => () => {
			onTabClick(tab);
		},
		[onTabClick]
	);

	return (
		<HStack gap='8' className={classNames('', {}, [className])}>
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

export type TypeOfTabs = typeof Tabs;

const TabsAsync = <T extends string>(props: TabsMatrixProps<T>) => {
	const { isLoaded, Tabs } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Tabs {...props} />;
};

export const TabsMatrix = <T extends string>(props: TabsMatrixProps<T>) => {
	return (
		<MatrixSharedProvider>
			<TabsAsync {...props} />
		</MatrixSharedProvider>
	);
};
