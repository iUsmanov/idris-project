import { ReactNode, memo, useCallback, useEffect } from 'react';
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
	onModalClose?: () => void;
}

export const Modal = memo((props: ModalProps) => {
	const {
		className,
		children,
		container,
		isOpened = false,
		isMounted = false,
		onModalClose
	} = props;

	const onContentClick = useCallback((event: React.MouseEvent) => {
		event.stopPropagation();
	}, []);

	useEffect(() => {
		const onEscapeClose = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onModalClose?.();
			}
		};

		if (isOpened) {
			document.addEventListener('keydown', onEscapeClose);
		}

		return () => {
			document.removeEventListener('keydown', onEscapeClose);
		};
	}, [onModalClose, isOpened]);

	const mods: Mods = {
		[cls.opened]: isOpened,
	};

	return (
		<Portal container={container} isMounted={isMounted}>
			<div className={classNames(cls.modal, mods, [className])}>
				<Flex justify='center' align='center' className={cls.overlay} onClick={onModalClose}>
					<div onClick={onContentClick} className={cls.content}>
						{children}
					</div>
				</Flex>
			</div>
		</Portal>
	);
});
