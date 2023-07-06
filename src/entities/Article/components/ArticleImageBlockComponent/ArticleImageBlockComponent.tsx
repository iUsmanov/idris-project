import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { Text } from '@/shared/components/Text/Text';

interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
	const { className, block } = props;

	return (
		<div className={classNames(cls.articleImageBlockComponent, {}, [className])}>
			<img src={block.src} />
			<Text title={block.title} align='center' />
		</div>
	);
});
