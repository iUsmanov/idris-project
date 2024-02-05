import { useEffect, useRef } from 'react';
import { UIEvent } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uiActions } from '@/shared/lib/UI/model/slice/UISlice';
import { getScrollByPath } from '@/shared/lib/UI/model/selectors/getScrollSave';
import { useLocation } from 'react-router-dom';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

export function useScrolling(parent: HTMLElement = document.body, listName?: string) {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const listPath = useRef<string>(listName ? `${pathname}.${listName}` : pathname);
	const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		if (parent === document.body) {
			dispatch(uiActions.setScrollPosition({ path: listPath.current, position: window.screenY }));
		} else {
			dispatch(
				uiActions.setScrollPosition({ path: listPath.current, position: e.currentTarget.scrollTop })
			);
		}
	}, 500);

	useEffect(() => {
		const s = setTimeout(() => {
			if (parent) {
				if (parent === document.body) {
					console.log('By mount parent is body');
					window.screenY = scrollPosition;
				} else {
					console.log('By mount parent is main');
					parent.scrollTop = scrollPosition;
				}
			}
		}, 0);

		return () => {
			clearTimeout(s);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parent]);

	useEffect(() => {
		if (parent === document.body) {
			window.onscroll = onScroll;
			console.log('OnScroll changed on body');
		} else {
			if (parent) {
				console.log('OnScroll changed on main');

				parent.onscroll = onScroll;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parent]);

	// useEffect(() => {
	// 	const s = setInterval(() => {
	// 		console.log(window.screenY);
	// 	}, 500);

	// 	return () => {
	// 		clearTimeout(s);
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
}
