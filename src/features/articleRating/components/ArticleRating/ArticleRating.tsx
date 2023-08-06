import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRating.module.scss';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRatingQuery, usePostArticleRatingMutation } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/components/Skeleton/Skeleton';

export interface ArticleRatingProps {
	className?: string;
	articleId: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
	const { className, articleId } = props;
	const { t } = useTranslation();
	const userData = useSelector(getUserAuthData);
	const { data, isLoading, error } = useGetArticleRatingQuery({
		userId: userData?.id ?? '',
		articleId,
	});
	const [onArticleRatingMutation /* , {data, isLoading, error} */] = usePostArticleRatingMutation();
	const rating = data?.[0];

	const onAcceptOrCancel = useCallback(
		(starsCount: number, feedback?: string) => {
			try {
				onArticleRatingMutation({
					userId: userData?.id ?? '',
					articleId: articleId,
					rate: starsCount,
					feedback: feedback,
				});
			} catch (error) {
				console.log(error);
			}
		},
		[articleId, onArticleRatingMutation, userData?.id]
	);

	const onAccept = useCallback(
		(starsCount: number, feedback?: string) => {
			onAcceptOrCancel(starsCount, feedback);
		},
		[onAcceptOrCancel]
	);

	const onCancel = useCallback(
		(starsCount: number) => {
			onAcceptOrCancel(starsCount);
		},
		[onAcceptOrCancel]
	);

	if (isLoading) {
		return <Skeleton width={'100%'} height={120} />;
	}

	return (
		<RatingCard
			className={classNames(cls.articleRating, {}, [className])}
			title={t('Оцените статью')}
			feedbackTitle={t('Оставьте свой отзыв о статье')}
			hasFeedback
			rate={rating?.rate}
			onAccept={onAccept}
			onCancel={onCancel}
		/>
	);
});
