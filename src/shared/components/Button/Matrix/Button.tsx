import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { TestProps } from '@/shared/types/tests';

export interface ButtonMatrixProps extends ButtonHTMLAttributes<HTMLButtonElement>, TestProps {
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
		['data-testid']: dataTestId = 'Button',
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
			data-testid={dataTestId}
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
