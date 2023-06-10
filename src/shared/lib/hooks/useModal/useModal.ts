import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {}

interface UseModalReturn {
	onModalToggle: VoidFunction;
	onMountToggle: VoidFunction;
	mountAndOpen: VoidFunction;
	visible: boolean;
	keepMounted: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	setKeepMounted: Dispatch<SetStateAction<boolean>>;
}

export const useModal = (): UseModalReturn => {
	// const {} = props;
	const [visible, setVisible] = useState<boolean>(false);
	const [keepMounted, setKeepMounted] = useState<boolean>(false);
	const timerRef = useRef(null);

	const onMountToggle = useCallback(() => {
		setKeepMounted((prev) => !prev);
	}, []);

	const onModalToggle = useCallback(() => {
		setVisible((prev) => !prev);
	}, []);

	const mountAndOpen = useCallback(() => {
		setKeepMounted(true);
		timerRef.current = setTimeout(() => {
			onModalToggle();
		}, 0);
	}, [onModalToggle]);

	useEffect(() => {
		return () => {
			clearTimeout(timerRef.current);
		};
	}, []);

	return {
		visible,
		setVisible,
		onModalToggle,
		mountAndOpen,
		onMountToggle,
		keepMounted,
		setKeepMounted,
	};
};
