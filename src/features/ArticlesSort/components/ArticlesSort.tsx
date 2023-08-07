import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesSort.module.scss';
import { Select, SelectOption } from '@/shared/components/Select';
import { SortOrder } from '@/shared/types/sort';
import { HStack } from '@/shared/components/Stack';
import { articlesSortActions, articlesSortReducer } from '../model/slice/articlesSortSlice';
import { ArticlesSortField } from '../model/types/articlesSort';
import { useSelector } from 'react-redux';
import { getArticlesSortField, getArticlesSortOrder } from '../model/selectors/articlesSortSelectors';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { initArticlesSort } from '../model/services/initArticlesSort/initArticlesSort';
import { useSearchParams } from 'react-router-dom';

interface ArticlesSortProps {
	className?: string;
	onChangeOrder: () => void;
	onChangeSort: () => void;
}

const reducers: ReducersList = {
	articlesSort: articlesSortReducer,
};

export const ArticlesSort = memo((props: ArticlesSortProps) => {
	const { className, onChangeOrder, onChangeSort } = props;
	const { t } = useTranslation();
	const sort = useSelector(getArticlesSortField);
	const order = useSelector(getArticlesSortOrder);
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

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

	useInitialEffect(() => {
		dispatch(initArticlesSort(searchParams));
	});

	const changeSortHandler = useCallback(
		(newSort: ArticlesSortField) => {
			dispatch(articlesSortActions.setSort(newSort));
			onChangeSort();
		},
		[dispatch, onChangeSort]
	);

	const changeOrderHandler = useCallback(
		(newOrder: SortOrder) => {
			dispatch(articlesSortActions.setOrder(newOrder));
			onChangeOrder();
		},
		[dispatch, onChangeOrder]
	);

	return (
		<HStack gap='8' className={classNames(cls.articlesSort, {}, [className])}>
			<Select<ArticlesSortField>
				value={sort}
				onChange={changeSortHandler}
				options={orderFieldOptions}
				label={t('Сортировать ПО')}
			/>
			<Select value={order} onChange={changeOrderHandler} options={orderOptions} label={t('по')} />
		</HStack>
	);
});
