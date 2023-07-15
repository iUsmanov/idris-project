import { ArticleList, ArticleSortField, ArticleView } from '@/entities/Article';
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
	getArticlesOrder,
	getArticlesSearch,
	getArticlesSort,
	getArticlesView,
} from '../model/selectors/articlesPageSelectors';
import { Text } from '@/shared/components/Text/Text';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { HStack } from '@/shared/components/Stack';
import { SortOrder } from '@/shared/types/sort';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import cls from './ArticlesPage.module.scss';

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
	const sort = useSelector(getArticlesSort);
	const order = useSelector(getArticlesOrder);
	const search = useSelector(getArticlesSearch);

	useDynamicModule({ reducers, saveAfterUnmount: true });

	useInitialEffect(() => {
		dispatch(initArticlesPage());
	});

	const onLoadNextPart = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchNextArticlesPage());
		}
	}, [dispatch]);

	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
			localStorage.setItem(LOCAL_STORAGE_ARTICLE_VIEW_KEY, view);
		},
		[dispatch]
	);

	const onChangeSort = useCallback(
		(newSort: ArticleSortField) => {
			dispatch(articlesPageActions.setSort(newSort));
		},
		[dispatch]
	);

	const onChangeOrder = useCallback(
		(newOrder: SortOrder) => {
			dispatch(articlesPageActions.setOrder(newOrder));
		},
		[dispatch]
	);

	const onChangeSearch = useCallback(
		(search: string) => {
			dispatch(articlesPageActions.setSearch(search));
		},
		[dispatch]
	);

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
					order={order}
					search={search}
					sort={sort}
				/>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</HStack>
			<ArticleList articles={articles} isLoading={isLoading} view={view} />
		</Page>
	);
});
