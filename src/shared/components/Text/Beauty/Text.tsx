import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';
export type TextAling = 'left' | 'center' | 'right';
export type TextSize = 'size_s' | 'size_m' | 'size_l';

export interface TextBeautyProps {
	className?: string;
	text?: string;
	title?: string;
	variant?: TextVariant;
	align?: TextAling;
	size?: TextSize;
	bold?: boolean;
	tags?: [keyof HTMLElementTagNameMap, keyof HTMLElementTagNameMap] | [keyof HTMLElementTagNameMap];
	'data-testid'?: string;
}

export const Text = memo((props: TextBeautyProps) => {
	const {
		className,
		text,
		title,
		variant = 'primary',
		align = 'left',
		size = 'size_s',
		tags = ['p', 'p'],
		bold,
		'data-testid': dataTestId = 'Text',
	} = props;

	const TitleTag = tags[0];
	const TextTag = tags[1] ? tags[1] : 'p';

	return (
		<div
			className={classNames(cls.text, { [cls.bold]: bold }, [
				className,
				cls[variant],
				cls[align],
				cls[size],
			])}
			data-testid={dataTestId}
		>
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

const TextAsync = (props: TextBeautyProps) => {
	const { isLoaded, Text } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Text {...props} />;
};

export const TextBeauty = (props: TextBeautyProps) => {
	return (
		<BeautySharedProvider>
			<TextAsync {...props} />
		</BeautySharedProvider>
	);
};
