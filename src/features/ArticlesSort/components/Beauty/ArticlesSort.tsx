import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticlesSortField } from '../../model/types/articlesSort';
import { useSelector } from 'react-redux';
import {
	getArticlesSortField,
	getArticlesSortOrder,
} from '../../model/selectors/articlesSortSelectors';
import { useArticlesSort } from '../../lib/hooks/useArticlesSort';
import { ListBox } from '@/shared/components/Popups';
import { VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';

interface ArticlesSortProps {
	className?: string;
	onChangeOrder: () => void;
	onChangeSort: () => void;
}

export const ArticlesSort = memo((props: ArticlesSortProps) => {
	const { className, onChangeOrder, onChangeSort } = props;
	const { t } = useTranslation();
	const sort = useSelector(getArticlesSortField);
	const order = useSelector(getArticlesSortOrder);

	const { changeOrderHandler, changeSortHandler, orderFieldOptions, orderOptions } = useArticlesSort(
		onChangeSort,
		onChangeOrder
	);

	return (
		<VStack gap='8' className={classNames('', {}, [className])}>
			<Text title={t('Сортировать по:')} />
			<ListBox<ArticlesSortField>
				value={sort}
				onChange={changeSortHandler}
				options={orderFieldOptions}
			/>
			<ListBox value={order} onChange={changeOrderHandler} options={orderOptions} />
		</VStack>
	);
});
