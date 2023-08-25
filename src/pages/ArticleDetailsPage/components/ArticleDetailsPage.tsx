import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { Page } from '@/widgets/Page';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleDetails, getArticleDetailsError } from '@/features/ArticleDetails';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/components/Stack';
import { ArticleRating } from '@/features/articleRating';
import { useParams } from 'react-router-dom';
import { ToggleFeatures, getFeatureFlag, toggleFeatures } from '@/shared/lib/featureFlags';
import { Counter } from '@/entities/Counter';
import { Card } from '@/shared/components/Card';

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const error = useSelector(getArticleDetailsError);
	const { id } = useParams<{ id: string }>();
	const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
	const isCounterEnabled = getFeatureFlag('isCounterEnabled');

	if (!id) return null;

	const articleRatingCard = toggleFeatures({
		name: 'isArticleRatingEnabled',
		on: () => <ArticleRating articleId={id} />,
		off: () => <Card max>{t('Оценка статей скоро появится!')}</Card>,
	});

	toggleFeatures({
		name: 'isArticleRatingEnabled',
		on: () => console.log('ONN'),
		off: () => console.log('OFF'),
	});

	return (
		<Page className={classNames('', {}, [])}>
			<VStack gap='16' max>
				<ArticleDetails />
				{!error && (
					<>
						{isCounterEnabled && <Counter />}
						<ToggleFeatures
							name='isArticleRatingEnabled'
							on={<ArticleRating articleId={id} />}
							off={articleRatingCard}
						/>
						<ToggleFeatures
							name='isCounterEnabled'
							on={<ArticleRating articleId={id} />}
							off={<Card max>{t('Оценка статей скоро появится!')}</Card>}
						/>
						<ArticleRecommendations />
						<ArticleCommentsList />
					</>
				)}
			</VStack>
		</Page>
	);
});
