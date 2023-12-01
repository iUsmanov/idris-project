import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tabs } from '@/shared/components/Tabs';
import { useSelector } from 'react-redux';
import { getArticlesType } from '../model/selectors/getArticlesType';
import { useArticleTypeTabs } from '../lib/hooks/useArticleTypeTabs';

interface ArticleTypeTabsProps {
	className?: string;
	onChangeType: () => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const { className, onChangeType } = props;
	const type = useSelector(getArticlesType);
	const { changeTypeHandler, typeTabs } = useArticleTypeTabs(onChangeType);

	return (
		<Tabs
			className={classNames('', {}, [className])}
			onTabClick={changeTypeHandler}
			tabs={typeTabs}
			value={type}
			direction='column'
			data-testid='ArticleTypeTabs'
		/>
	);
});
