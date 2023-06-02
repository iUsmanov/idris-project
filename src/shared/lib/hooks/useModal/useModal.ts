import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {}

interface UseModalReturn {
	onModalToggle: VoidFunction;
	onMountToggle: VoidFunction;
	mountAndOpen: VoidFunction;
	state: boolean;
	keepMounted: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	setKeepMounted: Dispatch<SetStateAction<boolean>>;
}

export const useModal = (): UseModalReturn => {
	// const {} = props;
	const [state, setState] = useState<boolean>(false);
	const [keepMounted, setKeepMounted] = useState<boolean>(false);
	const timerRef = useRef(null);

	const onMountToggle = useCallback(() => {
		setKeepMounted((prev) => !prev);
	}, []);

	const onModalToggle = useCallback(() => {
		setState((prev) => !prev);
	}, []);

	const mountAndOpen = useCallback(() => {
		setKeepMounted(true);
		timerRef.current = setTimeout(() => {
			onModalToggle();
		}, 300);
	}, [onModalToggle]);

	useEffect(() => {
		return () => {
			clearTimeout(timerRef.current);
		};
	}, []);

	return { state, setState, onModalToggle, mountAndOpen, onMountToggle, keepMounted, setKeepMounted };
};
