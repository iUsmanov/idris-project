// #router
import { AppRouteObject, AppRoutes } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { createBrowserRouter } from 'react-router-dom';
import {
	getRouteAbout,
	getRouteAdminPanel,
	getRouteArticleCreate,
	getRouteArticleDetails,
	getRouteArticleEdit,
	getRouteArticles,
	getRouteForbidden,
	getRouteMain,
	getRouteNotFound,
	getRouteProfile,
	getRouteSettings,
} from '@/shared/const/router';
// eslint-disable-next-line fsd-paths-guard/hierarchy-imports-between-layers
import { RootLayout } from '@/app/components/RootLayout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RequireAuth } from '../components/RequireAuth';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { RequireRoles } from '../components/RequireRoles';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { SettingsPage } from '@/pages/settingsPage';

const routeConfig: Record<AppRoutes, AppRouteObject> = {
	main: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	about: {
		path: getRouteAbout(),
		element: <AboutPage />,
	},
	profiles: {
		path: getRouteProfile(':id'),
		element: <ProfilePage />,
		authOnly: true,
	},
	articles: {
		path: getRouteArticles(),
		element: <ArticlesPage />,
		authOnly: true,
	},
	article_details: {
		path: getRouteArticleDetails(':id'),
		element: <ArticleDetailsPage />,
		authOnly: true,
	},
	article_create: {
		path: getRouteArticleCreate(),
		element: <ArticleEditPage />,
		authOnly: true,
	},
	article_edit: {
		path: getRouteArticleEdit(':id'),
		element: <ArticleEditPage />,
		authOnly: true,
	},
	admin_panel: {
		path: getRouteAdminPanel(),
		element: <AdminPanelPage />,
		authOnly: true,
		roles: ['ADMIN', 'MANAGER'],
	},
	settings: {
		path: getRouteSettings(),
		element: <SettingsPage />,
		authOnly: true,
		roles: ['ADMIN', 'MANAGER'],
	},
	forbidden: {
		path: getRouteForbidden(),
		element: <ForbiddenPage />,
	},
	not_found: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
};

export const routes = Object.values(routeConfig).map((route) => {
	if (route.authOnly) {
		const routeElement = route.element;
		route.element = <RequireAuth>{routeElement as JSX.Element}</RequireAuth>;
	}

	if (route.roles) {
		const routeElement = route.element;
		route.element = <RequireRoles roles={route.roles}>{routeElement as JSX.Element}</RequireRoles>;
	}

	return route;
});

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: routes,
	},
]);
