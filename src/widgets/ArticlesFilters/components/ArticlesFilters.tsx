import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { VStack } from '@/shared/components/Stack';
import { ArticlesSort } from '@/features/ArticlesSort';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticlesSearch } from '@/features/ArticlesSearch';

interface ArticlesFiltersProps {
	className?: string;
	onChangeOrder: () => void;
	onChangeSort: () => void;
	onChangeSearch: () => void;
	onChangeType: () => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
	const { className, onChangeOrder, onChangeSort, onChangeSearch, onChangeType } = props;
	const { t } = useTranslation();

	return (
		<VStack gap='16' className={classNames(cls.articlesFilters, {}, [className])}>
			<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
			<ArticlesSearch onChangeSearch={onChangeSearch} />
			<ArticleTypeTabs onChangeType={onChangeType} />
		</VStack>
	);
});
