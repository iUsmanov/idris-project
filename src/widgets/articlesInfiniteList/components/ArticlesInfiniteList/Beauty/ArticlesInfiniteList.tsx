import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import cls from './ArticlesInfiniteList.module.scss';
import {
	articlesInfiniteListActions,
	articlesInfiniteListReducer,
	getArticlesInfiniteList,
} from '../../../model/slices/articlesInfiniteListSlice';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import {
	getArticlesInfiniteListError,
	getArticlesInfiniteListIsLoading,
	getArticlesInfiniteListView,
} from '../../../model/selectors/articlesInfiniteListSelectors';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleList, ArticleView } from '@/entities/Article';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticlesSearch } from '@/features/ArticlesSearch';
import { ArticlesSort } from '@/features/ArticlesSort';
import { Text } from '@/shared/components/Text';
import { StickyContentLayout } from '@/shared/layouts';
import { Card } from '@/shared/components/Card';

export interface ArticlesInfiniteListProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesInfiniteList: articlesInfiniteListReducer,
};

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const articles = useSelector(getArticlesInfiniteList.selectAll);
	const isLoading = useSelector(getArticlesInfiniteListIsLoading);
	const error = useSelector(getArticlesInfiniteListError);
	const view = useSelector(getArticlesInfiniteListView);

	useDynamicModule({ reducers, saveAfterUnmount: true });

	useInitialEffect(() => {
		dispatch(initArticlesPage());
	});

	const fetchData = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchArticlesList({ replace: true }));
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
		<StickyContentLayout
			left={<ArticleViewSelector view={view} onViewClick={onChangeView} />}
			content={
				<ArticleList
					className={classNames('', {}, [className])}
					articles={articles}
					isLoading={isLoading}
					view={view}
				/>
			}
			right={
				<Card
					flex
					direction='column'
					gap='32'
					padding='24'
					className={classNames(cls.filters, {}, [className])}
				>
					<ArticlesSearch onChangeSearch={onChangeSearch} />
					<ArticleTypeTabs onChangeType={onChangeType} />
					<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
				</Card>
			}
		/>
	);
});
/* 

<VStack max gap='16'>
			<HStack max justify='between'>
				<VStack gap='16' className={classNames('', {}, [className])}>
					<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
					<ArticlesSearch onChangeSearch={onChangeSearch} />
					<ArticleTypeTabs onChangeType={onChangeType} />
				</VStack>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</HStack>
			<ArticleList
				className={classNames('', {}, [className])}
				articles={articles}
				isLoading={isLoading}
				view={view}
			/>
		</VStack>

*/
