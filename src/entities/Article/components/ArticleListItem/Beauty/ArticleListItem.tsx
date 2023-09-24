import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleTextBlock, ArticleView } from '../../../model/types/article';
import { Card } from '@/shared/components/Card';
import { Text } from '@/shared/components/Text';
import { HStack } from '@/shared/components/Stack';
import { Icon } from '@/shared/components/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Avatar } from '@/shared/components/Avatar';
import { AppLink } from '@/shared/components/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/components/AppImage';
import { Skeleton } from '@/shared/components/Skeleton';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view, target } = props;
	const { t } = useTranslation();

	const types = <Text size='size_s' text={article.type.join(', ')} className={cls.types} />;
	const views = (
		<HStack align='center' gap='8'>
			<Icon Svg={EyeIcon} />
			<Text size='size_m' text={String(article.views)} className={cls.views} />
		</HStack>
	);

	if (view === 'LIST') {
		const textBlock = article.blocks.find((block) => block.type === 'TEXT') as ArticleTextBlock;
		return (
			<Card
				flex
				max
				gap='16'
				direction='column'
				className={classNames(cls.articleListItem, {}, [className, cls[view]])}
				padding='24'
			>
				<HStack gap='8' align='center' className={cls.header}>
					<Avatar size={32} src={article.user?.avatar} />
					<Text bold size='size_m' text={article.user?.username} />
					<Text size='size_m' text={article.createdAt} />
				</HStack>
				<Text size='size_l' bold text={article.title} />
				<Text size='size_m' text={article.subtitle} />
				<div className={cls.image}>
					<AppImage
						loadingFallback={<Skeleton width={'100%'} height={250} />}
						src={article.img}
						alt={article.title}
						className={cls.img}
					/>
				</div>
				{textBlock && (
					<Text text={textBlock.paragraphs.slice(0, 2).join(' ')} className={cls.textBlock} />
				)}
				<HStack max align='center' justify='between'>
					<AppLink to={getRouteArticleDetails(article.id)} variant='outline'>
						{t('Читать далее...')}
					</AppLink>
					{views}
				</HStack>
			</Card>
		);
	}

	return (
		<AppLink to={getRouteArticleDetails(article.id)} target={target}>
			<Card className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
				<div className={cls.image}>
					<AppImage
						loadingFallback={<Skeleton width={200} height={200} />}
						src={article.img}
						alt={article.title}
						className={cls.img}
					/>
					<Text size='size_m' className={cls.createdAt} text={article.createdAt} />
				</div>
				<HStack justify='between'>
					{types}
					{views}
				</HStack>
				<Text size='size_m' text={article.title} className={cls.title} />
			</Card>
		</AppLink>
	);
});
