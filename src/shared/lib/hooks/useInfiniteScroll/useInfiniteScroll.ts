import { useEffect } from 'react';

export interface UseInfiniteScroll {
	callback?: () => void;
	trigger: HTMLElement;
	parent?: HTMLElement;
}

export function useInfiniteScroll(props: UseInfiniteScroll) {
	const { callback, trigger, parent } = props;
	// useEffect(() => {
	// 	const s = setInterval(() => {
	// 		console.log(trigger);
	// 	}, 500);

	// 	return () => {
	// 		clearTimeout(s);
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	useEffect(() => {
		console.log(trigger);
		if (!trigger) return;
		let observer: IntersectionObserver | null = null;
		console.log(trigger);
		if (callback) {
			const options = {
				root: parent,
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

			observer.observe(trigger);
		}

		return () => {
			if (observer && trigger) {
				observer.unobserve(trigger);
			}
		};
	}, [callback, parent, trigger]);
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
