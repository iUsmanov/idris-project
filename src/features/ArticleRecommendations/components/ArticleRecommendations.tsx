import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRecommendations.module.scss';
import { VStack } from '@/shared/components/Stack';
import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/components/Text/Text';
import { useGetArticleRecommendationsQuery } from '../api/articleRecommendationsApi';

interface ArticleRecommendationsProps {
	className?: string;
}

export const ArticleRecommendations = memo((props: ArticleRecommendationsProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const { data: recommendations, isLoading, error } = useGetArticleRecommendationsQuery(8);

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
		<VStack gap='16' max className={classNames(cls.articleRecommendations, {}, [className])}>
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
