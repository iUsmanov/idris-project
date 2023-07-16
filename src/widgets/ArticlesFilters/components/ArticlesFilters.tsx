import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { VStack } from '@/shared/components/Stack';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { Card } from '@/shared/components/Card/Card';
import { Input } from '@/shared/components/Input/Input';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { TabItem } from '@/shared/components/Tabs/Tabs';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

interface ArticlesFiltersProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	search: string;
	type: ArticleType;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newSort: ArticleSortField) => void;
	onChangeSearch: (search: string) => void;
	onChangeType: (tab: TabItem<ArticleType>) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
	const {
		className,
		order,
		search,
		sort,
		onChangeOrder,
		onChangeSort,
		onChangeSearch,
		onChangeType,
		type,
	} = props;
	const { t } = useTranslation();

	return (
		<VStack gap='16' className={classNames(cls.articlesFilters, {}, [className])}>
			<ArticleSortSelector
				onChangeOrder={onChangeOrder}
				onChangeSort={onChangeSort}
				order={order}
				sort={sort}
			/>
			<Card>
				<Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
			</Card>
			<ArticleTypeTabs onChangeType={onChangeType} type={type} />
		</VStack>
	);
});
