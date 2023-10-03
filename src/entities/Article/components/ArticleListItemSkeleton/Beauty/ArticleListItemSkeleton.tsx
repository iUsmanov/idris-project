import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../../ArticleListItem/Beauty/ArticleListItem.module.scss';
import { ArticleView } from '../../../model/types/article';
import { Card } from '@/shared/components/Card';
import { HStack, VStack } from '@/shared/components/Stack';
import { Skeleton } from '@/shared/components/Skeleton';

export interface ArticleListItemSkeletonBeautyProps {
	className?: string;
	view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonBeautyProps) => {
	const { className, view } = props;

	if (view === 'LIST') {
		return (
			<Card className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
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
			flex
			direction='column'
			gap='8'
			border='high'
			padding='0'
			className={classNames(cls.articleListItem, {}, [className, cls[view]])}
		>
			<div className={cls.image}>
				<Skeleton width={240} height={140} className={cls.img} />
			</div>
			<VStack gap='4' className={cls.info} max>
				<Skeleton width={200} height={24} className={cls.title} />
				<VStack justify='right' max gap='4' className={cls.footer}>
					<HStack justify='between' align='center' max>
						<Skeleton width={100} height={18} />
						<Skeleton width={100} height={18} />
					</HStack>
					<HStack gap='8' align='center'>
						<Skeleton width={32} height={32} borderRadius='50%' />
						<Skeleton width={100} height={16} />
					</HStack>
				</VStack>
			</VStack>
		</Card>
	);
});
