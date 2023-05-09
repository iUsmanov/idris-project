import { AppRouteObject, AppRoutes } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { createBrowserRouter } from 'react-router-dom';
import { getRouteAbout, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { RootLayout } from '@/app/RootLayout';

export const routeConfig: Record<AppRoutes, AppRouteObject> = {
	main: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	about: {
		path: getRouteAbout(),
		element: <AboutPage />,
	},
	profile: {
		path: getRouteProfile(':id'),
		element: <div>Profile</div>,
	},
	not_found: {
		path: '*',
		element: <div>Notfound</div>,
	},
};

const routes = Object.values(routeConfig);

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: routes,
	},
]);
