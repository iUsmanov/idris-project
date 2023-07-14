import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScroll {
	callback?: () => void;
	triggerRef: MutableRefObject<HTMLElement>;
	wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll(props: UseInfiniteScroll) {
	const { callback, triggerRef, wrapperRef } = props;

	useEffect(() => {
		const wrapperElement = wrapperRef.current;
		const triggerElement = triggerRef.current;
		let observer: IntersectionObserver | null = null;
		if (callback) {
			const options = {
				root: wrapperElement,
				rootMargin: '0px',
				threshold: 1.0,
			};

			const rootCallback: IntersectionObserverCallback = ([entry]) => {
				if (entry.isIntersecting) {
					callback();
					let flag = false;
					if (flag) return;
					if (wrapperElement.scrollHeight <= wrapperElement.offsetHeight + 300) {
						const repeatedCallback = () => {
							if (wrapperElement.scrollHeight <= wrapperElement.offsetHeight + 300) {
								setTimeout(() => {
									callback();
									repeatedCallback();
								}, 10);
							}
						};

						repeatedCallback();
					} else {
						flag = true;
					}
				}
			};

			observer = new IntersectionObserver(rootCallback, options);

			observer.observe(triggerElement);
		}

		return () => {
			if (observer && triggerElement) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(triggerElement);
			}
		};
	}, [callback, triggerRef, wrapperRef]);
}
