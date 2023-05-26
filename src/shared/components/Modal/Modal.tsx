import { ReactNode, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Flex } from '../Stack';
import { Portal } from '../Portal/Portal';

interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onToggle?: VoidFunction;
	container?: HTMLElement;
}

export const Modal = memo((props: ModalProps) => {
	const { className, children, isOpen, onToggle, container } = props;
	const { t } = useTranslation();

	const onContentClick = useCallback((event: React.MouseEvent) => {
		event.stopPropagation();
	}, []);

	// Может не нужно
	const closeHandler = useCallback(() => {
		onToggle?.();
	}, [onToggle]);

	const mods: Mods = {
		[cls.opened]: isOpen,
	};

	useEffect(() => {
		const onEscapeClose = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				console.log('ESCAPE');
				closeHandler();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', onEscapeClose);
		}

		return () => {
			document.removeEventListener('keydown', onEscapeClose);
		};
	}, [closeHandler, isOpen]);

	return (
		<Portal container={container}>
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
