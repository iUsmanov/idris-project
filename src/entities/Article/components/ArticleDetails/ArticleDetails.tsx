import { memo, useEffect } from 'react';
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
} from '../../model/selectors/articleDetailsSelectors';
import { Text } from '@/shared/components/Text/Text';
import { Skeleton } from '@/shared/components/Skeleton/Skeleton';

interface ArticleDetailsProps {
	className?: string;
	id: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className, id } = props;
	const { t } = useTranslation('article-details');
	const dispatch = useAppDispatch();
	const article = useSelector(getArticleDetailsData);
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);

	useDynamicModule({ reducers });

	useEffect(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	if (isLoading) {
		return (
			<div>
				<Skeleton className={cls.preview} width={200} height={200} borderRadius='50%' />
				<Skeleton className={cls.title} width={300} height={32} />
				<Skeleton className={cls.skeleton} width={600} height={24} />
				<Skeleton className={cls.skeleton} width='100%' height={200} />
				<Skeleton className={cls.skeleton} width='100%' height={200} />
			</div>
		);
	}

	if (error) {
		return <Text align='center' title={t('Произошла ошибка при загрузке статьи')} />;
	}

	return <div className={classNames(cls.articleDetails, {}, [className])}></div>;
});
