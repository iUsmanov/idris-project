import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { Flex } from '../Stack';
import { FlexProps } from '../Stack/Flex/Flex';

type ExProps = Omit<FlexProps, 'direction' | 'children' | 'wrap' | 'gap'>;

export interface AvatarProps extends ExProps {
	alt?: string;
	src?: string;
	size?: number;
}

export const Avatar = memo((props: AvatarProps) => {
	const { src, alt, size = 100, ...otherProps } = props;

	const styles = useMemo<CSSProperties>(() => ({ width: size, height: size }), [size]);

	return (
		<Flex {...otherProps} className={classNames(cls.avatar, {}, [])}>
			<div className={cls.wrapper} style={styles}>
				<img className={cls.img} src={src} alt={alt} />
			</div>
		</Flex>
	);
});
