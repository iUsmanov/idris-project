import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
	className?: string;
	size: LoaderSize;
}

export type LoaderSize = 'max' | 'min';

export const Loader = memo((props: LoaderProps) => {
	const { className, size = 'min' } = props;

	return (
		<div data-testid='Loader' className={classNames(cls.loader, {}, [className, cls[size]])}></div>
	);
});
