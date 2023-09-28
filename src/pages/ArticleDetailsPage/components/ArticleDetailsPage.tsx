import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { Page } from '@/widgets/Page';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/components/Stack';
import { ArticleRating } from '@/features/articleRating';
import { useParams } from 'react-router-dom';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { Counter } from '@/entities/Counter';
import { Card } from '@/shared/components/Card';
import { ArticleDetails, getArticleDetailsData, getArticleDetailsError } from '@/entities/Article';
import { ArticleDetailsHeader, ArticleDetailsHeaderBeauty } from '@/features/ArticleDetailsHeader';
import { StickyContentLayout } from '@/shared/layouts';

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const error = useSelector(getArticleDetailsError);
	const { id } = useParams<{ id: string }>();
	const article = useSelector(getArticleDetailsData);

	if (!id || !article) return null;

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={
				<StickyContentLayout
					content={
						<Page className={classNames('', {}, [])}>
							<VStack gap='16' max>
								<Card padding='24' border='round'>
									<ArticleDetails />
								</Card>
								{!error && (
									<>
										<ToggleFeatures
											name='isCounterEnabled'
											on={<Counter />}
											off={<Card max>{t('Счётчик скоро появится!')}</Card>}
										/>
										<ToggleFeatures
											name='isArticleRatingEnabled'
											on={<ArticleRating articleId={id} />}
											off={<Card max>{t('Оценка статей скоро появится!')}</Card>}
										/>
										<ArticleRecommendations />
										<ArticleCommentsList />
									</>
								)}
							</VStack>
						</Page>
					}
					right={
						<ArticleDetailsHeaderBeauty
							author={article.user}
							createdAt={article.createdAt}
							views={article.views}
						/>
					}
				/>
			}
			off={
				<Page className={classNames('', {}, [])}>
					<VStack gap='16' max>
						<ArticleDetailsHeader />
						<ArticleDetails />
						{!error && (
							<>
								<ToggleFeatures
									name='isCounterEnabled'
									on={<Counter />}
									off={<Card max>{t('Счётчик скоро появится!')}</Card>}
								/>
								<ToggleFeatures
									name='isArticleRatingEnabled'
									on={<ArticleRating articleId={id} />}
									off={<Card max>{t('Оценка статей скоро появится!')}</Card>}
								/>
								<ArticleRecommendations />
								<ArticleCommentsList />
							</>
						)}
					</VStack>
				</Page>
			}
		/>
	);
});

/* 

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
							off={articleRatingCard && <ArticleRating articleId={id} />}
						/>
						<ToggleFeatures
							name={'isArticleRatingEnabled'}
							on={
								<div>
									<div>{articleRatingCard}</div>
								</div>
							}
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


*/
