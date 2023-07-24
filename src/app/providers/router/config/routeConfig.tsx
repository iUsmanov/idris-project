import { AppRouteObject, AppRoutes } from '@/shared/types/router';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { createBrowserRouter } from 'react-router-dom';
import {
	getRouteAbout,
	getRouteArticleCreate,
	getRouteArticleDetails,
	getRouteArticleEdit,
	getRouteArticles,
	getRouteMain,
	getRouteProfile,
} from '@/shared/const/router';
import { RootLayout } from '../../../RootLayout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RequireAuth } from '../components/RequireAuth';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';

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
