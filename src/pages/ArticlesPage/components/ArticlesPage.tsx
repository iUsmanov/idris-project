import { ArticleList } from '@/entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
	getArticlesError,
	getArticlesIsLoading,
	getArticlesView,
} from '../model/selectors/articlesPageSelectors';
import { Text } from '@/shared/components/Text/Text';

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

	useDynamicModule({ reducers });

	useInitialEffect(() => {
		dispatch(fetchArticlesList());
	});

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
		<div>
			<ArticleList articles={articles} isLoading={isLoading} /*  view={view} */ view='LIST' />
		</div>
	);
});
