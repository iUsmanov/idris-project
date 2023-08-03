import { useState } from 'react';

type UseDeviceReturn = [boolean, number];

export function useDevice(): UseDeviceReturn {
	const [viewportWidth] = useState<number>(document.documentElement.clientWidth);

	const isMobile = window.matchMedia('(pointer:coarse)');

	return [isMobile.matches, viewportWidth];
}
