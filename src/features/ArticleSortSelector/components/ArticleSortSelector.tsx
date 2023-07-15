import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { Select, SelectOption } from '@/shared/components/Select/Select';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';
import { HStack } from '@/shared/components/Stack';

interface ArticleSortSelectorProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
	const { className, onChangeOrder, onChangeSort, order, sort } = props;
	const { t } = useTranslation();

	const orderOptions = useMemo<SelectOption<SortOrder>[]>(
		() => [
			{
				value: 'asc',
				content: t('возрастанию'),
			},
			{
				value: 'desc',
				content: t('убыванию'),
			},
		],
		[t]
	);

	const orderFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
		() => [
			{
				value: 'createdAt',
				content: t('дате создания'),
			},
			{
				value: 'title',
				content: t('названию'),
			},
			{
				value: 'views',
				content: t('просмотрам'),
			},
		],
		[t]
	);

	return (
		<HStack gap='8' className={classNames(cls.articleSortSelector, {}, [className])}>
			<Select<ArticleSortField>
				value={sort}
				onChange={onChangeSort}
				options={orderFieldOptions}
				label={t('Сортировать ПО')}
			/>
			<Select value={order} onChange={onChangeOrder} options={orderOptions} label={t('по')} />
		</HStack>
	);
});
