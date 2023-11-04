import { getUserInited, initAuthData } from '@/entities/User';
import { toggleFeatures } from '@/shared/lib/featureFlags';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppDesign } from '@/shared/types/design';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function useApp() {
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	const addClassName = (className: AppDesign) => {
		const notClassName: AppDesign = className === 'beauty-design' ? 'matrix-design' : 'beauty-design';
		if (!document.body.classList.contains(className)) {
			document.body.classList.add(className);
		}

		if (document.body.classList.contains(notClassName)) {
			document.body.classList.remove(notClassName);
		}
	};

	useEffect(() => {
		if (!inited) {
			dispatch(initAuthData());
		}
	}, [dispatch, inited]);

	useEffect(() => {
		toggleFeatures({
			name: 'isBeautyDesign',
			on: () => addClassName('beauty-design'),
			off: () => addClassName('matrix-design'),
		});
	}, []);
}
