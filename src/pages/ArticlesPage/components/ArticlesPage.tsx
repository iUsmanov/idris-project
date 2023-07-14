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
	getArticlesView,
} from '../model/selectors/articlesPageSelectors';
import { Text } from '@/shared/components/Text/Text';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { LOCAL_STORAGE_ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';

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
			<ArticleViewSelector view={view} onViewClick={onChangeView} />
			<ArticleList articles={articles} isLoading={isLoading} view={view} />
		</Page>
	);
});
