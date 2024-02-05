import { MutableRefObject, useEffect, useRef } from 'react';
import { UIEvent } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uiActions } from '@/shared/lib/UI/model/slice/UISlice';
import { getScrollByPath } from '@/shared/lib/UI/model/selectors/getScrollSave';
import { useLocation } from 'react-router-dom';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

export function useScrolling(
	parent: HTMLElement | MutableRefObject<HTMLDivElement> = document.body,
	listName?: string
) {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const listPath = useRef<string>(listName ? `${pathname}.${listName}` : pathname);
	const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		if (parent === document.body) {
			// console.log('scrolliing body');
			dispatch(
				// scrollY почему-то не работает и всегда бывает равен 0
				uiActions.setScrollPosition({ path: listPath.current, position: window.pageYOffset })
			);
		} else {
			// console.log('scrolliing another');
			dispatch(
				uiActions.setScrollPosition({ path: listPath.current, position: e.currentTarget.scrollTop })
			);
		}
	}, 500);

	useEffect(() => {
		const s = setTimeout(() => {
			// if (parent) {
			if (parent === document.body) {
				// console.log('By mount parent is body');
				window.scrollY = scrollPosition;
				// @ts-ignore
			} else if (parent.current) {
				// console.log('By mount parent is main');
				// @ts-ignore
				parent.current.scrollTop = scrollPosition;
			}
			// }
		}, 0);

		return () => {
			clearTimeout(s);
		};
		// @ts-ignore
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parent, parent.current]);

	useEffect(() => {
		if (parent === document.body) {
			window.onscroll = onScroll;
			// console.log('OnScroll changed on body');
			// @ts-ignore
		} else if (parent.current) {
			// console.log('OnScroll changed on main');

			// @ts-ignore
			parent.current.onscroll = onScroll;
		}
		// @ts-ignore
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parent, parent.current]);
}
