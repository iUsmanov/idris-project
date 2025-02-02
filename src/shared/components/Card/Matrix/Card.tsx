import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { HTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';
import { TestProps } from '@/shared/types/tests';

export type CardVariant = 'primary' | 'outline';

export interface CardMatrixProps extends HTMLAttributes<HTMLDivElement>, TestProps {
	className?: string;
	children: ReactNode;
	variant?: CardVariant;
	max?: boolean;
}

export const Card = memo((props: CardMatrixProps) => {
	const {
		className,
		children,
		max,
		variant = 'primary',
		['data-testid']: dataTestId = 'Card',
		...otherProps
	} = props;

	return (
		<div
			{...otherProps}
			className={classNames(cls.card, { [cls.max]: max }, [className, cls[variant]])}
			data-testid={dataTestId}
		>
			{children}
		</div>
	);
});

const CardAsync = (props: CardMatrixProps) => {
	const { isLoaded, Card } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Card {...props} />;
};

export const CardMatrix = (props: CardMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<CardAsync {...props} />
		</MatrixSharedProvider>
	);
};
