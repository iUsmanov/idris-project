import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '@/shared/components/Card';
import { Flex, FlexDirection } from '@/shared/components/Stack';
import { typedMemo } from '@/shared/lib/helpers/typedMemo/typedMemo';

export interface TabItem<T extends string> {
	value: T;
	content: ReactNode;
}

export interface TabsBeautyProps<T extends string> {
	className?: string;
	tabs: TabItem<T>[];
	value: T;
	onTabClick: (tab: TabItem<T>) => void;
	direction?: FlexDirection;
}

export const Tabs = typedMemo(<T extends string>(props: TabsBeautyProps<T>) => {
	const { className, tabs, onTabClick, value, direction = 'row' } = props;
	const { t } = useTranslation();

	const onClick = useCallback(
		(tab: TabItem<T>) => () => {
			onTabClick(tab);
		},
		[onTabClick]
	);

	return (
		<Flex direction={direction} gap='8' className={classNames(cls.tabs, {}, [className])}>
			{tabs.map((tab) => {
				const isSelected = tab.value === value;
				return (
					<Card
						key={tab.value}
						className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
						variant={isSelected ? 'light' : 'primary'}
						onClick={onClick(tab)}
						border='round'
					>
						{tab.content}
					</Card>
				);
			})}
		</Flex>
	);
});

export type TypeOfTabs = typeof Tabs;

const TabsAsync = <T extends string>(props: TabsBeautyProps<T>) => {
	const { isLoaded, Tabs } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Tabs {...props} />;
};

export const TabsBeauty = <T extends string>(props: TabsBeautyProps<T>) => {
	return (
		<BeautySharedProvider>
			<TabsAsync {...props} />
		</BeautySharedProvider>
	);
};
