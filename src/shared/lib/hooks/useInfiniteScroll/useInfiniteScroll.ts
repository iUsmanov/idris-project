import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScroll {
	callback?: () => void;
	triggerRef: MutableRefObject<HTMLDivElement>;
	parentRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll(props: UseInfiniteScroll) {
	const { callback, triggerRef, parentRef } = props;

	useEffect(() => {
		const triggerElement = triggerRef.current;
		const parentElement = parentRef?.current;

		if (!triggerElement) return;

		let observer: IntersectionObserver | null = null;

		if (callback) {
			const options = {
				root: parentElement,
				rootMargin: '10px',
				threshold: 1.0,
			};

			const rootCallback: IntersectionObserverCallback = ([entry]) => {
				if (entry.isIntersecting) {
					callback();
					// Here
				}
			};

			observer = new IntersectionObserver(rootCallback, options);

			observer.observe(triggerElement);
		}

		return () => {
			if (observer && triggerElement) {
				observer.unobserve(triggerElement);
			}
		};
	}, [callback, parentRef, triggerRef]);
}
/* 
// After callback called
let flag = false;
if (flag) return;
if (wrapperElement.scrollHeight <= wrapperElement.offsetHeight + 300) {
	const repeatedCallback = () => {
		if (wrapperElement.scrollHeight <= wrapperElement.offsetHeight + 300) {
			setTimeout(() => {
				console.log(wrapperElement.scrollHeight, wrapperElement.offsetHeight);
				console.log(5464654);
				callback();
				repeatedCallback();
			}, 10);
		}
	};
	repeatedCallback();
} else {
	flag = true;
}

*/
