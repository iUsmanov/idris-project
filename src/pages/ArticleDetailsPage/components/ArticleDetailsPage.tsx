import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { PageMainContent } from '@/widgets/PageMainContent';
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
import cls from './ArticleDetailsPage.module.scss';

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const error = useSelector(getArticleDetailsError);
	const { id } = useParams<{ id: string }>();
	const article = useSelector(getArticleDetailsData);

	if (!id) return null;

	const additionalContent = !error && (
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
	);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={
				<StickyContentLayout
					data-testid='ArticleDetailsPage'
					content={
						<PageMainContent className={classNames('', {}, [])}>
							<VStack gap='16' className={cls.articleDetails}>
								<Card padding='24' border='high' max>
									<ArticleDetails />
								</Card>
								{additionalContent}
							</VStack>
						</PageMainContent>
					}
					right={
						<ArticleDetailsHeaderBeauty
							author={article?.user}
							createdAt={article?.createdAt}
							views={article?.views}
						/>
					}
				/>
			}
			off={
				<PageMainContent className={classNames('', {}, [])} data-testid='ArticleDetailsPage'>
					<VStack gap='16' max>
						<ArticleDetailsHeader />
						<ArticleDetails />
						{additionalContent}
					</VStack>
				</PageMainContent>
			}
		/>
	);
});

/* 

import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { PageMainContent } from '@/widgets/PageMainContent';
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
		<PageMainContent className={classNames('', {}, [])}>
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
		</PageMainContent>
	);
});


*/
