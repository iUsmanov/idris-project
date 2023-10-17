// #router
import { AppRouteByPathPattern } from '@/shared/const/router';
import { AppRoutes } from '@/shared/types/router';
import { useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

export function useRouteChange() {
	const location = useLocation();
	const [appRoute, setAppRoute] = useState<AppRoutes>('main');

	useEffect(() => {
		Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
			if (matchPath(pattern, location.pathname)) {
				setAppRoute(route);
			}
		});
	}, [location.pathname]);

	return appRoute;
}
