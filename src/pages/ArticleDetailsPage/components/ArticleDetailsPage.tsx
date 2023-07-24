import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { Page } from '@/widgets/Page';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleDetails, getArticleDetailsError } from '@/features/ArticleDetails';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/components/Stack';

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const error = useSelector(getArticleDetailsError);

	return (
		<Page className={classNames('', {}, [])}>
			<VStack gap='16' max>
				<ArticleDetails />
				{!error && (
					<>
						<ArticleRecommendations />
						<ArticleCommentsList />
					</>
				)}
			</VStack>
		</Page>
	);
});
