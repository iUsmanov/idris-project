import { ArticleList, ArticleView } from '@/entities/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles,
} from '../model/slice/articlesPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
	getArticlesError,
	getArticlesIsLoading,
	getArticlesSearch,
	getArticlesView,
} from '../model/selectors/articlesPageSelectors';
import { Text } from '@/shared/components/Text/Text';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { HStack } from '@/shared/components/Stack';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import cls from './ArticlesPage.module.scss';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { useSearchParams } from 'react-router-dom';

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

export const ArticlesPage = memo(() => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesIsLoading);
	const error = useSelector(getArticlesError);
	const view = useSelector(getArticlesView);
	const search = useSelector(getArticlesSearch);
	const [searchParams] = useSearchParams();

	useDynamicModule({ reducers, saveAfterUnmount: true });

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

	const onLoadNextPart = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchNextArticlesPage());
		}
	}, [dispatch]);

	const fetchData = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchArticlesList({ replace: true }));
		}
	}, [dispatch]);

	const debouncedFetchData = useDebounce(fetchData, 500);

	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
			localStorage.setItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY, view);
		},
		[dispatch]
	);

	const onChangeSort = useCallback(() => {
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeOrder = useCallback(() => {
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeSearch = useCallback(
		(search: string) => {
			dispatch(articlesPageActions.setSearch(search));
			dispatch(articlesPageActions.setPage(1));
			debouncedFetchData();
		},
		[dispatch, debouncedFetchData]
	);

	const onChangeType = useCallback(() => {
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	if (error) {
		return (
			<Text
				align='center'
				size='size_l'
				variant='error'
				title={t('Произошла непредвиденная ошибка')}
			/>
		);
	}

	return (
		<Page onScrollEnd={onLoadNextPart}>
			<HStack max justify='between' align='center' className={cls.tools}>
				<ArticlesFilters
					onChangeOrder={onChangeOrder}
					onChangeSearch={onChangeSearch}
					onChangeSort={onChangeSort}
					onChangeType={onChangeType}
					search={search}
				/>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</HStack>
			<ArticleList articles={articles} isLoading={isLoading} view={view} />
		</Page>
	);
});
