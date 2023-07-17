import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { VStack } from '@/shared/components/Stack';
import { ArticlesSort } from '@/features/ArticlesSort';
import { Card } from '@/shared/components/Card/Card';
import { Input } from '@/shared/components/Input/Input';
import { ArticleType } from '@/entities/Article';
import { TabItem } from '@/shared/components/Tabs/Tabs';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

interface ArticlesFiltersProps {
	className?: string;
	search: string;
	type: ArticleType;
	onChangeOrder: () => void;
	onChangeSort: () => void;
	onChangeSearch: (search: string) => void;
	onChangeType: (tab: TabItem<ArticleType>) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
	const { className, search, onChangeOrder, onChangeSort, onChangeSearch, onChangeType, type } = props;
	const { t } = useTranslation();

	return (
		<VStack gap='16' className={classNames(cls.articlesFilters, {}, [className])}>
			<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
			<Card>
				<Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
			</Card>
			<ArticleTypeTabs onChangeType={onChangeType} type={type} />
		</VStack>
	);
});
