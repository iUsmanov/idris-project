import { ReactNode, memo, useCallback, useEffect, useRef } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Flex } from '../Stack';
import { Portal } from '../Portal/Portal';

interface ModalProps {
	className?: string;
	container?: HTMLElement;
	children: ReactNode;
	isOpened?: boolean;
	isMounted?: boolean;
	onOpenToggle?: (bool: boolean) => void;
	onMountToggle?: (bool: boolean) => void;
}

export const Modal = memo((props: ModalProps) => {
	const {
		className,
		children,
		container,
		isOpened = false,
		isMounted = false,
		onOpenToggle,
		onMountToggle,
	} = props;
	const timerRef = useRef(null);

	const onContentClick = useCallback((event: React.MouseEvent) => {
		event.stopPropagation();
	}, []);

	const closeHandler = useCallback(() => {
		if (!isMounted) return;
		onOpenToggle?.(false);

		timerRef.current = setTimeout(() => {
			onMountToggle(false);
		}, 300);
	}, [isMounted, onMountToggle, onOpenToggle]);

	useEffect(() => {
		return () => {
			clearTimeout(timerRef.current);
		};
	}, []);

	useEffect(() => {
		const onEscapeClose = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				console.log('ESCAPE');
				closeHandler();
			}
		};

		if (isOpened) {
			document.addEventListener('keydown', onEscapeClose);
		}

		return () => {
			document.removeEventListener('keydown', onEscapeClose);
		};
	}, [closeHandler, isOpened]);

	const mods: Mods = {
		[cls.opened]: isOpened,
	};

	return (
		<Portal container={container} isMounted={isMounted}>
			<div className={classNames(cls.modal, mods, [className])}>
				<Flex justify='center' align='center' className={cls.overlay} onClick={closeHandler}>
					<div onClick={onContentClick} className={cls.content}>
						{children}
					</div>
				</Flex>
			</div>
		</Portal>
	);
});
