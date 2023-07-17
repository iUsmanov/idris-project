import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesSort.module.scss';
import { Select, SelectOption } from '@/shared/components/Select/Select';
import { SortOrder } from '@/shared/types/sort';
import { HStack } from '@/shared/components/Stack';
import { articlesSortReducer } from '../model/slice/articlesSortSlice';
import { ArticlesSortField } from '../model/types/articlesSort';
import { useSelector } from 'react-redux';
import { getArticlesSortField, getArticlesSortOrder } from '../model/selectors/articlesSortSelectors';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';

interface ArticlesSortProps {
	className?: string;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newSort: ArticlesSortField) => void;
}

const reducers: ReducersList = {
	articlesSort: articlesSortReducer,
};

export const ArticlesSort = memo((props: ArticlesSortProps) => {
	const { className, onChangeOrder, onChangeSort } = props;
	const { t } = useTranslation();
	const sort = useSelector(getArticlesSortField);
	const order = useSelector(getArticlesSortOrder);

	useDynamicModule({ reducers, saveAfterUnmount: true });

	const orderOptions = useMemo<SelectOption<SortOrder>[]>(
		() => [
			{
				value: 'asc',
				content: t('возрастанию'),
			},
			{
				value: 'desc',
				content: t('убыванию'),
			},
		],
		[t]
	);

	const orderFieldOptions = useMemo<SelectOption<ArticlesSortField>[]>(
		() => [
			{
				value: 'createdAt',
				content: t('дате создания'),
			},
			{
				value: 'title',
				content: t('названию'),
			},
			{
				value: 'views',
				content: t('просмотрам'),
			},
		],
		[t]
	);

	return (
		<HStack gap='8' className={classNames(cls.articlesSort, {}, [className])}>
			<Select<ArticlesSortField>
				value={sort}
				onChange={onChangeSort}
				options={orderFieldOptions}
				label={t('Сортировать ПО')}
			/>
			<Select value={order} onChange={onChangeOrder} options={orderOptions} label={t('по')} />
		</HStack>
	);
});
