import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface ButtonBeautyProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	variant?: ButtonVariant;
	square?: boolean;
	size?: ButtonSize;
	fullWidth?: boolean;
}

export type ButtonVariant = 'outline' | 'clear';

export type ButtonSize = 'size_m' | 'size_l' | 'size_xl';

export const Button = memo((props: ButtonBeautyProps) => {
	const {
		className,
		children,
		variant = 'outline',
		square,
		size = 'size_m',
		fullWidth,
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls.fullWidth]: fullWidth,
	};
	return (
		<button
			{...otherProps}
			type='button'
			className={classNames(cls.button, mods, [className, cls[variant], cls[size]])}
		>
			{children}
		</button>
	);
});

const ButtonAsync = (props: ButtonBeautyProps) => {
	const { isLoaded, Button } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Button {...props} />;
};

export const ButtonBeauty = (props: ButtonBeautyProps) => {
	return (
		<BeautySharedProvider>
			<ButtonAsync {...props} />
		</BeautySharedProvider>
	);
};
