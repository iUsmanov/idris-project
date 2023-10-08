import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select } from '@/shared/components/Select';
import { HStack } from '@/shared/components/Stack';
import { ArticlesSortField } from '../model/types/articlesSort';
import { useSelector } from 'react-redux';
import { getArticlesSortField, getArticlesSortOrder } from '../model/selectors/articlesSortSelectors';
import { useArticlesSort } from '../lib/hooks/useArticlesSort';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticlesSortBeauty } from './Beauty/ArticlesSort.async';

interface ArticlesSortProps {
	className?: string;
	onChangeOrder: () => void;
	onChangeSort: () => void;
}

export const ArticlesSort = memo((props: ArticlesSortProps) => {
	const { className, onChangeOrder, onChangeSort } = props;
	const { t } = useTranslation('articles');
	const sort = useSelector(getArticlesSortField);
	const order = useSelector(getArticlesSortOrder);

	const { changeOrderHandler, changeSortHandler, orderFieldOptions, orderOptions } = useArticlesSort(
		onChangeSort,
		onChangeOrder
	);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticlesSortBeauty {...props} />}
			off={
				<HStack gap='8' className={classNames('', {}, [className])}>
					<Select<ArticlesSortField>
						value={sort}
						onChange={changeSortHandler}
						options={orderFieldOptions}
						label={t('Сортировать по')}
					/>
					<Select
						value={order}
						onChange={changeOrderHandler}
						options={orderOptions}
						label={t('По')}
					/>
				</HStack>
			}
		/>
	);
});
