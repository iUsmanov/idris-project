import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { MutableRefObject, useRef } from 'react';
// import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { getScrollByPath } from '../../model/selectors/getScrollSave';
// import { StateSchema } from '@/app/providers/StoreProvider';
// import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
// import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
// import { uiActions } from '../../model/slice/UISlice';

export function useInfiniteList(
	triggerRef: MutableRefObject<HTMLDivElement>,
	wrapperElement: HTMLDivElement,
	onScrollEnd?: VoidFunction,
	listName?: string
) {
	const wrapperRef = useRef(wrapperElement) as MutableRefObject<HTMLDivElement>;
	// const dispatch = useAppDispatch();
	// const { pathname } = useLocation();
	// const listPath = useRef<string>(listName ? `${pathname}.${listName}` : pathname);
	// const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

	// useInitialEffect(() => {
	// 	if (wrapperElement) {
	// 		wrapperRef.current.scrollTop = scrollPosition;
	// 	}
	// });

	// const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
	// 	if (wrapperElement) {
	// 		dispatch(
	// 			uiActions.setScrollPosition({ path: listPath.current, position: e.currentTarget.scrollTop })
	// 		);
	// 	}
	// }, 500);

	// if (wrapperElement) {
	// 	wrapperElement.onscroll = onScroll;
	// }

	useInfiniteScroll({
		trigger: triggerRef.current,
		parent: undefined,
		callback: onScrollEnd,
	});
}
