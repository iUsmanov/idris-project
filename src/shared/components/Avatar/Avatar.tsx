import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { Flex } from '../Stack';

interface AvatarProps {
	className?: string;
	alt?: string;
	src: string;
	size?: number;
	justify?: AvatarAlign;
}

type AvatarAlign = 'left' | 'center' | 'right';

export const Avatar = memo((props: AvatarProps) => {
	const { className, src, alt, size = 100, justify = 'left' } = props;

	const styles = useMemo<CSSProperties>(() => ({ width: size, height: size }), [size]);

	return (
		<Flex justify={justify} className={classNames(cls.avatar, {}, [className])}>
			<div className={cls.wrapper} style={styles}>
				<img className={cls.img} src={src} alt={alt} />
			</div>
		</Flex>
	);
});
