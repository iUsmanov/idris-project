import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { Page } from '@/widgets/Page';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleDetails, getArticleDetailsError } from '@/features/ArticleDetails';
import { useSelector } from 'react-redux';

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const error = useSelector(getArticleDetailsError);

	return (
		<Page className={classNames('', {}, [])}>
			<ArticleDetails className={cls.articleDetails} />
			{!error && (
				<>
					<ArticleRecommendations />
					<ArticleCommentsList />
				</>
			)}
		</Page>
	);
});
