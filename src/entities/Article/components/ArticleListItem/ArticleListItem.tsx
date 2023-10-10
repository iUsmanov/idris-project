import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleTextBlock, ArticleView } from '../../model/types/article';
import { Card } from '@/shared/components/Card';
import { Text } from '@/shared/components/Text';
import { HStack } from '@/shared/components/Stack';
import { Icon } from '@/shared/components/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Avatar } from '@/shared/components/Avatar';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/components/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/components/AppImage';
import { Skeleton } from '@/shared/components/Skeleton';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticleListItemBeauty } from './Beauty/ArticleListItem.async';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view, target } = props;
	const { t } = useTranslation('articles');

	const types = <Text size='size_m' text={article.type.join(', ')} className={cls.types} />;
	const views = (
		<HStack align='center'>
			<Text size='size_m' text={String(article.views)} className={cls.views} />
			<Icon Svg={EyeIcon} />
		</HStack>
	);

	if (view === 'LIST') {
		const textBlock = article.blocks.find((block) => block.type === 'TEXT') as ArticleTextBlock;
		return (
			<ToggleFeatures
				name='isBeautyDesign'
				on={<ArticleListItemBeauty {...props} />}
				off={
					<Card className={classNames('', {}, [className, cls[view]])}>
						<HStack justify='between' align='center' className={cls.header}>
							<HStack gap='8' align='center'>
								<Avatar size={30} src={article.user?.avatar} />
								<Text size='size_m' text={article.user?.username} />
							</HStack>
							<Text size='size_m' text={article.createdAt} />
						</HStack>
						<Text size='size_m' text={article.title} />
						{types}
						<div className={cls.image}>
							<AppImage
								loadingFallback={<Skeleton width={'100%'} height={250} />}
								src={article.img}
								alt={article.title}
								className={cls.img}
							/>
						</div>
						{textBlock && (
							<ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
						)}
						<HStack align='center' justify='between'>
							<AppLink to={getRouteArticleDetails(article.id)} variant='outline'>
								{t('Читать далее...')}
							</AppLink>
							{views}
						</HStack>
					</Card>
				}
			/>
		);
	}

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticleListItemBeauty {...props} />}
			off={
				<AppLink to={getRouteArticleDetails(article.id)} target={target}>
					<Card className={classNames('', {}, [className, cls[view]])}>
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
			}
		/>
	);
});
