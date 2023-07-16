import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/components/Tabs/Tabs';

interface ArticleTypeTabsProps {
	className?: string;
	type: string;
	onChangeType: (tab: TabItem) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const { className, onChangeType, type } = props;
	const { t } = useTranslation();

	const typeTabs = useMemo<TabItem[]>(
		() => [
			{
				content: t('Все статьи'),
				value: 'ALL',
			},
			{
				content: t('Экономика'),
				value: 'ECONOMICS',
			},
			{
				content: t('Наука'),
				value: 'SCIENCE',
			},
			{
				content: t('Айти'),
				value: 'IT',
			},
		],
		[t]
	);

	return (
		<Tabs
			className={classNames('', {}, [className])}
			onTabClick={onChangeType}
			tabs={typeTabs}
			value={type}
		/>
	);
});
