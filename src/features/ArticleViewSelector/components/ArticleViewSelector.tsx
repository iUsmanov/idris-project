import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TileIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { HStack } from '@/shared/components/Stack';
import { Button } from '@/shared/components/Button';
import { Icon } from '@/shared/components/Icon';

interface ArticleViewSelectorProps {
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
		<HStack className={classNames(cls.articleViewSelector, {}, [className])}>
			{viewTypes.map((viewType) => (
				<Button key={viewType.view} variant='clear' onClick={onClick(viewType.view)}>
					<Icon
						Svg={viewType.Icon}
						className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
					/>
				</Button>
			))}
		</HStack>
	);
});
