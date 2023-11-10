import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { ReactNode, memo } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { TestProps } from '@/shared/types/tests';

export type AppLinkVariant = 'primary' | 'inverted' | 'red' | 'outline';

export interface AppLinkMatrixProps extends LinkProps, TestProps {
	className?: string;
	variant?: AppLinkVariant;
	children: ReactNode;
}

export const AppLink = memo((props: AppLinkMatrixProps) => {
	const {
		variant = 'primary',
		className,
		children,
		['data-testid']: dataTestId = 'AppLink',
		...otherProps
	} = props;

	return (
		<Link
			{...otherProps}
			className={classNames(cls.appLink, {}, [className, cls[variant]])}
			data-testid={dataTestId}
		>
			{children}
		</Link>
	);
});

const AppLinkAsync = (props: AppLinkMatrixProps) => {
	const { isLoaded, AppLink } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <AppLink {...props} />;
};

export const AppLinkMatrix = (props: AppLinkMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<AppLinkAsync {...props} />
		</MatrixSharedProvider>
	);
};
