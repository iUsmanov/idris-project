import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TileIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { HStack } from '@/shared/components/Stack';
import { Button } from '@/shared/components/Button';
import { Icon } from '@/shared/components/Icon';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticleViewSelectorBeauty } from './Beauty/ArticleViewSelector.async';

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

	const onClick = useCallback(
		(view: ArticleView) => () => {
			onViewClick?.(view);
		},
		[onViewClick]
	);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticleViewSelectorBeauty {...props} />}
			off={
				<HStack className={classNames('', {}, [className])} data-testid='ArticleViewSelector'>
					{viewTypes.map((viewType) => (
						<Button key={viewType.view} variant='clear' onClick={onClick(viewType.view)}>
							<Icon
								width={24}
								height={24}
								Svg={viewType.Icon}
								className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
							/>
						</Button>
					))}
				</HStack>
			}
		/>
	);
});
