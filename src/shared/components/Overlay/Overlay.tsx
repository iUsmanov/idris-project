import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';
import { Flex } from '../Stack';

interface OverlayProps {
	className?: string;
	centering?: boolean;
	children: ReactNode;
	onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
	const { className, centering = false, children, onClick, ...otherProps } = props;

	if (centering) {
		return (
			<Flex
				{...otherProps}
				justify='center'
				align='center'
				className={classNames(cls.overlay, {}, [className])}
				onClick={onClick}
			>
				{children}
			</Flex>
		);
	}

	return (
		<div {...otherProps} className={classNames(cls.overlay, {}, [className])} onClick={onClick}>
			{children}
		</div>
	);
});
