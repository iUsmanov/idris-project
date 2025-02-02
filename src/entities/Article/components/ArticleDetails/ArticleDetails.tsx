import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import { useSelector } from 'react-redux';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetailsSelectors/articleDetailsSelectors';
import { Text } from '@/shared/components/Text';
import { Flex, HStack, VStack } from '@/shared/components/Stack';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from '@/shared/components/Icon';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/shared/components/Skeleton';
import { AppImage } from '@/shared/components/AppImage';
import { ArticleDetailsBeauty } from './Beauty/ArticleDetails.async';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { useArticleDetails } from '../../lib/hooks/useArticleDetails';

interface ArticleDetailsProps {
	className?: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const article = useSelector(getArticleDetailsData);
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);
	const { id } = useParams<{ id: string }>();
	const { renderArticleBlock } = useArticleDetails(id, cls);

	if (!id) return null;

	if (isLoading) {
		return (
			<ToggleFeatures
				name='isBeautyDesign'
				on={<ArticleDetailsBeauty {...props} />}
				off={
					<VStack max gap='16' justify={'center'} className={classNames('', {}, [className])}>
						<Flex max justify='center' align='center'>
							<Skeleton width={200} height={200} borderRadius='50%' />
						</Flex>
						<Skeleton width={300} height={32} />
						<Skeleton width={600} height={24} />
						<Skeleton width={'100%'} height={200} />
						<Skeleton width={'100%'} height={200} />
					</VStack>
				}
			/>
		);
	}

	if (error) {
		return (
			<ToggleFeatures
				name='isBeautyDesign'
				on={<ArticleDetailsBeauty {...props} />}
				off={
					<Text
						align='center'
						variant='error'
						title={t('Произошла ошибка при загрузке статьи')}
						size='size_l'
					/>
				}
			/>
		);
	}

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticleDetailsBeauty {...props} />}
			off={
				<VStack
					max
					gap='16'
					className={classNames(cls.articleDetails, {}, [className])}
					data-testid='ArticleDetails'
				>
					<AppImage
						src={article?.img}
						className={cls.preview}
						data-testid='ArticleDetails.Image'
					/>
					<VStack max gap='8'>
						<Text
							title={article?.title}
							text={article?.subtitle}
							size='size_l'
							data-testid='ArticleDetails.Titles'
						/>
						<HStack gap='8' align='center'>
							<Icon Svg={EyeIcon} />
							<Text
								text={String(article?.views)}
								size='size_m'
								data-testid='ArticleDetails.Views'
							/>
						</HStack>
						<HStack gap='8' align='center'>
							<Icon Svg={CalendarIcon} />
							<Text
								text={article?.createdAt}
								size='size_m'
								data-testid='ArticleDetails.CreatedAt'
							/>
						</HStack>
					</VStack>
					{article?.blocks.map(renderArticleBlock)}
				</VStack>
			}
		/>
	);
});
