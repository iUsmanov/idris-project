import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export interface ButtonMatrixProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	variant?: ButtonVariant;
	square?: boolean;
	size?: ButtonSize;
	fullWidth?: boolean;
}

export type ButtonVariant =
	| 'primary'
	| 'outline'
	| 'outlineRed'
	| 'clear'
	| 'clearInverted'
	| 'background'
	| 'backgroundInverted';
export type ButtonSize = 'size_m' | 'size_l' | 'size_xl';

export const Button = memo((props: ButtonMatrixProps) => {
	const {
		className,
		children,
		variant = 'primary',
		square,
		size = 'size_m',
		fullWidth,
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls[size]]: size,
		[cls.fullWidth]: fullWidth,
	};
	return (
		<button
			{...otherProps}
			type='button'
			className={classNames(cls.button, mods, [className, cls[variant]])}
		>
			{children}
		</button>
	);
});

const ButtonAsync = (props: ButtonMatrixProps) => {
	const { isLoaded, Button } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Button {...props} />;
};

export const ButtonMatrix = (props: ButtonMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<ButtonAsync {...props} />
		</MatrixSharedProvider>
	);
};
