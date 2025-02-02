import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/components/Stack';
import { AppLink } from '@/shared/components/AppLink';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { getArticleCanEdit } from '../../model/selectors/getArticleCanEdit/getArticleCanEdit';
import { useParams } from 'react-router-dom';

interface ArticleDetailsHeaderProps {
	className?: string;
}

export const ArticleDetailsHeader = memo((props: ArticleDetailsHeaderProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const canEdit = useSelector(getArticleCanEdit);
	const { id } = useParams<{ id: string }>();

	if (!id) return null;

	return (
		<HStack
			max
			justify='between'
			align='center'
			className={className}
			data-testid='ArticleDetailsHeader'
		>
			<AppLink to={getRouteArticles()} variant='outline'>
				{t('Назад к списку')}
			</AppLink>
			{canEdit && (
				<AppLink to={getRouteArticleEdit(id)} variant='outline'>
					{t('Редактировать')}
				</AppLink>
			)}
		</HStack>
	);
});
