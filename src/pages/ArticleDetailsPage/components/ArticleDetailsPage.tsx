import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { Page } from '@/widgets/Page';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { HStack } from '@/shared/components/Stack';

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div className={classNames('', {}, [])}>{t('Статья не найдена')}</div>;
	}

	return (
		<Page className={classNames('', {}, [])}>
			<HStack justify='between' align='center'>
				<AppLink to={getRouteArticles()} variant='outline'>
					{t('Назад к списку')}
				</AppLink>
				<AppLink to={getRouteArticleEdit(id)} variant='outline'>
					{t('Редактировать')}
				</AppLink>
			</HStack>
			<ArticleDetails className={cls.articleDetails} id={id} />
			<ArticleRecommendations />
			<ArticleCommentsList />
		</Page>
	);
});
