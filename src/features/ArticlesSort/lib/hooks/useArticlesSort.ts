import { useCallback, useMemo } from 'react';
import { SelectOption } from '@/shared/components/Select';
import { SortOrder } from '@/shared/types/sort';
import { articlesSortActions, articlesSortReducer } from '../../model/slice/articlesSortSlice';
import { ArticlesSortField } from '../../model/types/articlesSort';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesSort } from '../../model/services/initArticlesSort/initArticlesSort';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';

export function useArticlesSort(onChangeSort: VoidFunction, onChangeOrder: VoidFunction) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const reducers = useMemo<ReducersList>(
		() => ({
			articlesSort: articlesSortReducer,
		}),
		[]
	);

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

	return {
		orderOptions,
		orderFieldOptions,
		changeSortHandler,
		changeOrderHandler,
	};
}
