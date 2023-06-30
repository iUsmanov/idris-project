import { AppRouteObject, AppRoutes } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { createBrowserRouter } from 'react-router-dom';
import { getRouteAbout, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { RootLayout } from '@/app/RootLayout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RequireAuth } from '../components/RequireAuth';

export const routeConfig: Record<AppRoutes, AppRouteObject> = {
	main: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	about: {
		path: getRouteAbout(),
		element: <AboutPage />,
	},
	profiles: {
		// path: getRouteProfile('1'),
		// path: getRouteProfile(''),
		path: getRouteProfile(':id'),
		element: <ProfilePage />,
		authOnly: true,
	},
	not_found: {
		path: '*',
		element: <NotFoundPage />,
	},
};

const routes = Object.values(routeConfig).map((route) => {
	if (route.authOnly) {
		const routeElement = route.element;
		route.element = <RequireAuth>{routeElement as JSX.Element}</RequireAuth>;
	}

	return route;
});

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: routes,
	},
]);
