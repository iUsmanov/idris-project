import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';
import { Icon } from '@/shared/components/Icon';
import { Card } from '@/shared/components/Card';

export interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

interface ViewType {
	view: ArticleView;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const viewTypes: ViewType[] = [
	{
		view: 'LIST',
		Icon: ListIcon,
	},
	{
		view: 'TILE',
		Icon: TileIcon,
	},
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, onViewClick, view } = props;
	const { t } = useTranslation();

	const onClick = useCallback(
		(view: ArticleView) => () => {
			onViewClick?.(view);
		},
		[onViewClick]
	);

	return (
		<Card
			flex
			border='round'
			gap='8'
			className={classNames('', {}, [className])}
			data-testid='ArticleViewSelector'
		>
			{viewTypes.map((viewType) => (
				<Icon
					key={viewType.view}
					clickable
					onClick={onClick(viewType.view)}
					width={24}
					height={24}
					Svg={viewType.Icon}
					className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
				/>
			))}
		</Card>
	);
});
