import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../../ArticleListItem/ArticleListItem.module.scss';
import { ArticleView } from '../../../model/types/article';
import { Card } from '@/shared/components/Card';
import { HStack } from '@/shared/components/Stack';
import { Skeleton } from '@/shared/components/Skeleton';
import { ToggleFeatures } from '@/shared/lib/featureFlags';

export interface ArticleListItemSkeletonMatrixProps {
	className?: string;
	view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonMatrixProps) => {
	const { className, view } = props;

	if (view === 'LIST') {
		return (
			<Card
				className={classNames(cls.articleListItem, {}, [className, cls[view]])}
				data-testid='ArticleListItemSkeleton.LIST'
			>
				<HStack max justify='between' align='center' className={cls.header}>
					<HStack gap='8' align='center'>
						<Skeleton width={30} height={30} borderRadius='50%' />
						<Skeleton width={150} height={16} />
					</HStack>
					<Skeleton width={150} height={16} />
				</HStack>
				<Skeleton width={250} height={24} />
				<div className={cls.image}>
					<Skeleton width='100%' height={200} className={cls.img} />
				</div>
				<Skeleton width={200} height={36} />
			</Card>
		);
	}

	return (
		<Card
			className={classNames(cls.articleListItem, {}, [className, cls[view]])}
			data-testid='ArticleListItemSkeleton.TILE'
		>
			<div className={cls.image}>
				<ToggleFeatures
					name='isBeautyDesign'
					on={<Skeleton width={240} height={140} className={cls.img} />}
					off={<Skeleton width={200} height={200} className={cls.img} />}
				/>
			</div>
			<Skeleton width={130} height={16} style={{ marginBottom: 8 }} />
			<Skeleton width={150} height={16} className={cls.title} />
		</Card>
	);
});
