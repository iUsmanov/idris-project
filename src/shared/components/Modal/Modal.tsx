import { Dispatch, ReactNode, SetStateAction, memo, useCallback, useEffect, useRef } from 'react';
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
	keepMounted?: boolean;
	setKeepMounted?: Dispatch<SetStateAction<boolean>>;
}

export const Modal = memo((props: ModalProps) => {
	const { className, children, isOpen, onToggle, container, keepMounted, setKeepMounted } = props;
	const timerRef = useRef(null);

	const onContentClick = useCallback((event: React.MouseEvent) => {
		event.stopPropagation();
	}, []);

	const closeHandler = useCallback(() => {
		if (!keepMounted) return;
		setKeepMounted(true);
		onToggle?.();

		timerRef.current = setTimeout(() => {
			setKeepMounted(false);
		}, 300);
	}, [keepMounted, onToggle, setKeepMounted]);

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

		if (isOpen) {
			document.addEventListener('keydown', onEscapeClose);
		}

		return () => {
			document.removeEventListener('keydown', onEscapeClose);
		};
	}, [closeHandler, isOpen]);

	const mods: Mods = {
		[cls.opened]: isOpen,
	};

	return (
		<Portal container={container} keepMounted={keepMounted}>
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
