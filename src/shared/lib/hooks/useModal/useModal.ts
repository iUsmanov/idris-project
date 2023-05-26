import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';

interface UseModalProps {}

interface UseModalReturn {
	onModalToggle: VoidFunction;
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
}

export const useModal = (): UseModalReturn => {
	// const {} = props;
	const [state, setState] = useState<boolean>(false);

	const onModalToggle = useCallback(() => {
		setState((prev) => !prev);
	}, []);

	return { state, setState, onModalToggle };
};
