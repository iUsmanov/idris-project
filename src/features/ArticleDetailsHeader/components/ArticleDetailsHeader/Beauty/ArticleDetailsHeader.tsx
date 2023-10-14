import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsHeader.module.scss';
import { User } from '@/entities/User';
import { HStack } from '@/shared/components/Stack';
import { Avatar } from '@/shared/components/Avatar';
import { Text } from '@/shared/components/Text';
import { AppLink } from '@/shared/components/AppLink';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';
import { getArticleCanEdit } from '../../../model/selectors/getArticleCanEdit/getArticleCanEdit';
import { Card } from '@/shared/components/Card';

export interface ArticleDetailsHeaderPropsBeauty {
	className?: string;
	author?: User;
	createdAt?: string;
	views?: number;
}

export const ArticleDetailsHeader = memo((props: ArticleDetailsHeaderPropsBeauty) => {
	const { className, author, createdAt, views } = props;
	const { t } = useTranslation('article-details');
	const canEdit = useSelector(getArticleCanEdit);
	const { id } = useParams<{ id: string }>();

	if (!id || !author || !createdAt || !views) return null;

	return (
		<Card
			flex
			direction='column'
			padding='24'
			border='high'
			gap='32'
			className={classNames(cls.articleDetailsHeader, {}, [className])}
		>
			<HStack gap='8' align='center'>
				<Avatar src={author.avatar} size={32} />
				<Text text={author.username} size='size_m' bold />
				<Text text={createdAt} size='size_m' />
			</HStack>
			{canEdit && (
				<AppLink to={getRouteArticleEdit(id)} variant='outline'>
					{t('Редактировать')}
				</AppLink>
			)}
			<Text size='size_m' text={t('Просмотров', { count: views })} />
		</Card>
	);
});
