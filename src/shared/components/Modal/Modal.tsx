import { ReactNode, memo, useCallback, useEffect } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
	className?: string;
	container?: HTMLElement;
	children: ReactNode;
	isOpened?: boolean;
	isMounted?: boolean;
	onModalClose?: () => void;
	isDrawer?: boolean;
}

export const Modal = memo((props: ModalProps) => {
	const {
		className,
		children,
		container,
		isOpened = false,
		isMounted = false,
		onModalClose,
		isDrawer,
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

	if (isDrawer) {
		return (
			<Portal container={container} isMounted={isMounted}>
				<div className={classNames(cls.modal, mods, [className])}>
					<Overlay onClick={onModalClose}>
						<div
							onClick={onContentClick}
							className={classNames(cls.drawerContent, {}, [cls.content])}
						>
							{children}
						</div>
					</Overlay>
				</div>
			</Portal>
		);
	}

	return (
		<Portal container={container} isMounted={isMounted}>
			<div className={classNames(cls.modal, mods, [className])}>
				<Overlay onClick={onModalClose} centering>
					<div
						onClick={onContentClick}
						className={classNames(cls.modalContent, {}, [cls.content])}
					>
						{children}
					</div>
				</Overlay>
			</div>
		</Portal>
	);
});
