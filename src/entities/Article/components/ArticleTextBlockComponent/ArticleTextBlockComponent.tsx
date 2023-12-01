import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { Text } from '@/shared/components/Text';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
	const { className, block } = props;

	return (
		<div
			className={classNames(cls.articleTextBlockComponent, {}, [className])}
			data-testid='ArticleTextBlock'
		>
			{block.title && (
				<Text
					className={cls.title}
					title={block.title}
					size='size_m'
					data-testid='ArticleTextBlock.Description'
				/>
			)}
			{block.paragraphs.map((paragraph) => {
				return (
					<Text
						text={paragraph}
						className={cls.paragraph}
						size='size_m'
						key={paragraph}
						data-testid='ArticleTextBlock.Paragraph'
					/>
				);
			})}
		</div>
	);
});
