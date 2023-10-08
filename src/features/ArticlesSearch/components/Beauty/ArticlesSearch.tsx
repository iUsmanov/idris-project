import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/components/Input';
import { useSelector } from 'react-redux';
import { getArticlesSearch } from '../../model/selectors/getArticlesSearch';
import { useArticlesSearch } from '../../lib/hooks/useArticlesSearch';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/components/Icon';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ArticlesSearchProps {
	className?: string;
	onChangeSearch: () => void;
}

export const ArticlesSearch = memo((props: ArticlesSearchProps) => {
	const { className, onChangeSearch } = props;
	const { t } = useTranslation('articles');
	const search = useSelector(getArticlesSearch);
	const { changeSearchHandler } = useArticlesSearch(onChangeSearch);

	return (
		<Input
			className={classNames('', {}, [className])}
			addonLeft={<Icon Svg={SearchIcon} />}
			placeholder={t('Поиск')}
			value={search}
			onChange={changeSearchHandler}
			size={'s'}
		/>
	);
});
