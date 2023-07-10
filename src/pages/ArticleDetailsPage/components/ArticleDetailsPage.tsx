import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleCommentsList } from '@/features/ArticleCommentsList';

export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div className={classNames('', {}, [])}>{t('Статья не найдена')}</div>;
	}

	return (
		<div className={classNames('', {}, [])}>
			<ArticleDetails className={cls.articleDetails} id={id} />
			<ArticleCommentsList />
		</div>
	);
});
