import { AppRouteObject, AppRoutes } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { createBrowserRouter } from 'react-router-dom';
import { getRouteAbout, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { RootLayout } from '@/app/RootLayout';
import i18next from '@/shared/config/i18n/i18n';
import { NotFoundPage } from '@/pages/NotFoundPage';

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
		element: <div>{i18next.t('Профиль')}</div>,
	},
	not_found: {
		path: '*',
		element: <NotFoundPage />,
	},
};

const routes = Object.values(routeConfig);

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: routes,
	},
]);
