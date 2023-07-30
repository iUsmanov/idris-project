import { useEffect } from 'react';

export function useInitialEffect(callback: VoidFunction) {
	useEffect(() => {
		if (__ENVIRON__ !== 'storybook' && __ENVIRON__ !== 'jest') {
			callback();
		}
		// eslint-disable-next-line
	}, []);
}
