import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'inverted';
export type TextAling = 'left' | 'center' | 'right';
export type TextSize = 'size_s' | 'size_m' | 'size_l';

export interface TextMatrixProps {
	className?: string;
	text?: string;
	title?: string;
	variant?: TextVariant;
	align?: TextAling;
	size?: TextSize;
	tags?: [keyof HTMLElementTagNameMap, keyof HTMLElementTagNameMap] | [keyof HTMLElementTagNameMap];
	'data-testid'?: string;
}

export const Text = memo((props: TextMatrixProps) => {
	const {
		className,
		text,
		title,
		variant = 'primary',
		align = 'left',
		size = 'size_s',
		tags = ['p', 'p'],
		'data-testid': dataTestId = 'Text',
	} = props;

	const TitleTag = tags[0];
	const TextTag = tags[1] ? tags[1] : 'p';

	return (
		<div className={classNames(cls.text, {}, [className, cls[variant], cls[align], cls[size]])}>
			{title && (
				<TitleTag className={cls.title} data-testid={`${dataTestId}.Title`}>
					{title}
				</TitleTag>
			)}
			{text && (
				<TextTag className={cls.text} data-testid={`${dataTestId}.Text`}>
					{text}
				</TextTag>
			)}
		</div>
	);
});

const TextAsync = (props: TextMatrixProps) => {
	const { isLoaded, Text } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Text {...props} />;
};

export const TextMatrix = (props: TextMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<TextAsync {...props} />
		</MatrixSharedProvider>
	);
};
