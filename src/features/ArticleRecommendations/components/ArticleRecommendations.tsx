import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRecommendations.module.scss';
import { VStack } from '@/shared/components/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import {
	articleRecommendationsReducer,
	getArticleRecommendations,
} from '../model/slice/articleRecommendationsSlice';
import { useSelector } from 'react-redux';
import {
	getArticleRecommendationsError,
	getArticleRecommendationsIsLoading,
} from '../model/selectors/articleRecommendationsSelectors';
import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/components/Text/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticleRecommendations } from '../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

interface ArticleRecommendationsProps {
	className?: string;
}

const reducers: ReducersList = {
	articleRecommendations: articleRecommendationsReducer,
};

export const ArticleRecommendations = memo((props: ArticleRecommendationsProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const isLoading = useSelector(getArticleRecommendationsIsLoading);
	const error = useSelector(getArticleRecommendationsError);

	useDynamicModule({ reducers });

	useInitialEffect(() => {
		dispatch(fetchArticleRecommendations());
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
		<VStack gap='16' className={classNames(cls.articleRecommendations, {}, [className])}>
			<Text size='size_l' title={t('Рекомендуем')} />
			<ArticleList
				target='_blank'
				className={cls.recommendations}
				articles={recommendations}
				isLoading={isLoading}
			/>
		</VStack>
	);
});
