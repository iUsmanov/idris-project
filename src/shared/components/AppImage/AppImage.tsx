import { ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	loadingFallback?: ReactElement;
	errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
	const { className, src, alt = 'image', errorFallback, loadingFallback, ...otherProps } = props;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);

	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			setIsLoading(false);
		};
		img.onerror = () => {
			setIsLoading(false);
			setHasError(true);
		};
	}, [src]);

	if (isLoading && loadingFallback) {
		return loadingFallback;
	}

	if (hasError && errorFallback) {
		return errorFallback;
	}

	return <img {...otherProps} src={src} alt={alt} className={classNames('', {}, [className])} />;
});
