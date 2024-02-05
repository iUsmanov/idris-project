import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	articlesInfiniteListActions,
	articlesInfiniteListReducer,
} from '../../model/slices/articlesInfiniteListSlice';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleView } from '@/entities/Article';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

export function useArticlesInfiniteList() {
	const dispatch = useAppDispatch();

	const reducers = useMemo<ReducersList>(
		() => ({
			articlesInfiniteList: articlesInfiniteListReducer,
		}),
		[]
	);

	useDynamicModule({ reducers, saveAfterUnmount: true });

	useInitialEffect(() => {
		dispatch(initArticlesPage());
	});

	const fetchData = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchArticlesList({ replace: true }));
		}
	}, [dispatch]);

	const onLoadNextPart = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchNextArticlesPage());
		}
	}, [dispatch]);

	const debouncedFetchData = useDebounce(fetchData, 500);

	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesInfiniteListActions.setView(view));
			localStorage.setItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY, view);
		},
		[dispatch]
	);

	const onChangeSort = useCallback(() => {
		dispatch(articlesInfiniteListActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeOrder = useCallback(() => {
		dispatch(articlesInfiniteListActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeSearch = useCallback(() => {
		dispatch(articlesInfiniteListActions.setPage(1));
		debouncedFetchData();
	}, [dispatch, debouncedFetchData]);

	const onChangeType = useCallback(() => {
		dispatch(articlesInfiniteListActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	return {
		onChangeView,
		onChangeSort,
		onChangeOrder,
		onChangeSearch,
		onChangeType,
		onLoadNextPart,
	};
}
