import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import UserAvatarIcon from '@/shared/assets/icons/user-32-32.png';
import { Flex } from '../Stack';
import { FlexProps } from '../Stack/Flex/Flex';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

type ExProps = Omit<FlexProps, 'direction' | 'children' | 'wrap' | 'gap'>;

interface AvatarProps extends ExProps {
	alt?: string;
	src?: string;
	size?: number;
	fallbackInverted?: boolean;
}

export const Avatar = memo((props: AvatarProps) => {
	const { src, alt, size = 100, fallbackInverted, ...otherProps } = props;

	const styles = useMemo<CSSProperties>(() => ({ width: size, height: size }), [size]);

	const errorFallback = (
		<Icon
			Svg={UserAvatarIcon}
			variant={fallbackInverted ? 'inverted' : 'primary'}
			width={size}
			height={size}
		/>
	);

	const loadingFallback = <Skeleton width={size} height={size} borderRadius='50%' />;

	return (
		<Flex {...otherProps} className={classNames(cls.avatar, {}, [])}>
			<div className={cls.wrapper} style={styles}>
				<AppImage
					loadingFallback={loadingFallback}
					errorFallback={errorFallback}
					className={cls.img}
					src={src}
					alt={alt}
				/>
			</div>
		</Flex>
	);
});
