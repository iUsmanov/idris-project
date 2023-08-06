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

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const error = useSelector(getArticleDetailsError);
	const { id } = useParams<{ id: string }>();

	if(!id) return null;

	return (
		<Page className={classNames('', {}, [])}>
			<VStack gap='16' max>
				<ArticleDetails />
				{!error && (
					<>
						<ArticleRating articleId={id} />
						<ArticleRecommendations />
						<ArticleCommentsList />
					</>
				)}
			</VStack>
		</Page>
	);
});
