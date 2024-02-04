import { useEffect, useRef } from 'react';
import { UIEvent } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uiActions } from '@/shared/lib/UI/model/slice/UISlice';
import { getScrollByPath } from '@/shared/lib/UI/model/selectors/getScrollSave';
import { useLocation } from 'react-router-dom';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

export function useScrolling(parent: HTMLElement, listName?: string) {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const listPath = useRef<string>(listName ? `${pathname}.${listName}` : pathname);
	const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

	useEffect(() => {
		const s = setTimeout(() => {
			if (parent) {
				parent.scrollTop = scrollPosition;
			}
		}, 0);

		return () => {
			clearTimeout(s);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(
			uiActions.setScrollPosition({ path: listPath.current, position: e.currentTarget.scrollTop })
		);
	}, 500);

	return {
		onScroll,
	};
}
