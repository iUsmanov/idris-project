import { useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {}

interface UseModalReturn {
	isOpened: boolean;
	isMounted: boolean;
	onUnmountAndClose: () => void;
	onMountAndOpen: VoidFunction;
}

export const useModal = (): UseModalReturn => {
	// const {} = props;
	const [isOpened, setOpened] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const openTimerRef = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);
	const closeTimerRef = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);
	const onMountToggle = useCallback((bool: boolean) => {
		setIsMounted(bool);
	}, []);

	const onOpenToggle = useCallback((bool: boolean) => {
		setOpened(bool);
	}, []);

	const onMountAndOpen = useCallback(() => {
		if (isMounted) return;
		onMountToggle(true);
		openTimerRef.current = setTimeout(() => {
			onOpenToggle(true);
		}, 0);
	}, [isMounted, onMountToggle, onOpenToggle]);

	const onUnmountAndClose = useCallback(() => {
		if (!isMounted) return;
		onOpenToggle?.(false);

		closeTimerRef.current = setTimeout(() => {
			onMountToggle?.(false);
		}, 300);
	}, [isMounted, onMountToggle, onOpenToggle]);

	useEffect(() => {
		return () => {
			clearTimeout(openTimerRef.current);
			clearTimeout(closeTimerRef.current);
		};
	}, []);

	return {
		isOpened,
		isMounted,
		onUnmountAndClose,
		onMountAndOpen,
	};
};
