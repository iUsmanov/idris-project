import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {}

interface UseModalReturn {
	isOpened: boolean;
	isMounted: boolean;
	onOpenToggle: (bool: boolean) => void;
	onMountToggle: (bool: boolean) => void;
	onMountAndOpen: VoidFunction;
}

export const useModal = (): UseModalReturn => {
	// const {} = props;
	const [isOpened, setOpened] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const timerRef = useRef(null);

	const onMountToggle = useCallback((bool: boolean) => {
		setIsMounted(bool);
	}, []);

	const onOpenToggle = useCallback((bool: boolean) => {
		setOpened(bool);
	}, []);

	const onMountAndOpen = useCallback(() => {
		if (isMounted) return;
		onMountToggle(true);
		timerRef.current = setTimeout(() => {
			onOpenToggle(true);
		}, 0);
	}, [isMounted, onMountToggle, onOpenToggle]);

	useEffect(() => {
		return () => {
			clearTimeout(timerRef.current);
		};
	}, []);

	return {
		isOpened,
		onOpenToggle,
		isMounted,
		onMountToggle,
		onMountAndOpen,
	};
};
