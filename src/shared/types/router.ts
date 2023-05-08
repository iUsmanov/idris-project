import { RouteObject } from 'react-router-dom';

export type AppRoutes =
	| 'main'
	| 'about'
	| 'profile'
	// | 'articles'
	// | 'article_details'
	// | 'article_create'
	// | 'article_edit'
	// | 'admin_panel'
	// | 'forbidden'
	// last
	| 'not_found';

export type AppRouteObject = RouteObject & {
	authOnly?: boolean;
};
