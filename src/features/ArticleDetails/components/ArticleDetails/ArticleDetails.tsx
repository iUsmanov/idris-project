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
import { Text } from '@/shared/components/Text/Text';
import { Shimmer, ShimmerType } from '@/shared/components/Shimmer/Shimmer';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { HStack, VStack } from '@/shared/components/Stack';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from '@/shared/components/Icon/Icon';

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
	ArticleBlock,
	ArticleCodeBlockComponent,
	ArticleImageBlockComponent,
	ArticleTextBlockComponent,
} from '@/entities/Article';
import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';
import { useParams } from 'react-router-dom';

interface ArticleDetailsProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

const skeletons: ShimmerType = {
	ver: [
		{ width: 200, height: 200, borderRadius: '50%', margin: '0 auto' },
		{ width: 300, height: 32, marginTop: 20 },
		{ width: 600, height: 24, marginTop: 15 },
		{ width: '100%', height: 200, marginTop: 15 },
		{ width: '100%', height: 200, marginTop: 15 },
	],
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
		return <Shimmer skeletons={skeletons} />;
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
			<ArticleDetailsHeader />
			<Avatar justify='center' max src={article?.img} size={200} />
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
