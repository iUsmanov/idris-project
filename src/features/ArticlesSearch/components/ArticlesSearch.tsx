import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';
import { useSelector } from 'react-redux';
import { getArticlesSearch } from '../model/selectors/getArticlesSearch';
import { useArticlesSearch } from '../lib/hooks/useArticlesSearch';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticlesSearchBeauty } from './Beauty/ArticlesSearch.async';

interface ArticlesSearchProps {
	className?: string;
	onChangeSearch: () => void;
}

export const ArticlesSearch = memo((props: ArticlesSearchProps) => {
	const { className, onChangeSearch } = props;
	const { t } = useTranslation();
	const search = useSelector(getArticlesSearch);
	const { changeSearchHandler } = useArticlesSearch(onChangeSearch);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticlesSearchBeauty {...props} />}
			off={
				<Card className={classNames('', {}, [className])}>
					<Input placeholder={t('Поиск')} value={search} onChange={changeSearchHandler} />
				</Card>
			}
		/>
	);
});
