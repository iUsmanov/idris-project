import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
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

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/shared/components/Skeleton';
import { AppImage } from '@/shared/components/AppImage';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleBlock } from '../../model/types/article';

interface ArticleDetailsProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const article = useSelector(getArticleDetailsData);
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);
	const { id } = useParams<{ id: string }>();

	useDynamicModule({ reducers });

	useInitialEffect(() => {
		if (!id) return;
		dispatch(fetchArticleById(id));
	});

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case 'TEXT':
				return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
			case 'IMAGE':
				return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />;
			case 'CODE':
				return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />;
			default:
				return null;
		}
	}, []);

	if (!id) {
		return <div className={classNames('', {}, [])}>{t('Статья не найдена')}</div>;
	}

	if (isLoading) {
		return (
			<VStack max gap='16' justify={'center'} className={classNames('', {}, [className])}>
				<Flex max justify='center' align='center'>
					<Skeleton width={200} height={200} borderRadius='50%' />
				</Flex>
				<Skeleton width={300} height={32} />
				<Skeleton width={600} height={24} />
				<Skeleton width={'100%'} height={200} />
				<Skeleton width={'100%'} height={200} />
			</VStack>
		);
	}

	if (error) {
		return (
			<Text
				align='center'
				variant='error'
				title={t('Произошла ошибка при загрузке статьи')}
				size='size_l'
			/>
		);
	}

	return (
		<VStack max gap='16' className={classNames(cls.articleDetails, {}, [className])}>
			<AppImage src={article?.img} className={cls.preview} />
			<VStack max gap='8'>
				<Text title={article?.title} text={article?.subtitle} size='size_l' />
				<HStack gap='8' align='center'>
					<Icon Svg={EyeIcon} />
					<Text text={String(article?.views)} size='size_m' />
				</HStack>
				<HStack gap='8' align='center'>
					<Icon Svg={CalendarIcon} />
					<Text text={article?.createdAt} size='size_m' />
				</HStack>
			</VStack>
			{article?.blocks.map(renderBlock)}
		</VStack>
	);
});
