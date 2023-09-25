// eslint-disable-next-line fsd-paths-guard/hierarchy-imports-between-layers
import { UserRole } from '@/entities/User';
import { RouteObject } from 'react-router-dom';

export type AppRoutes =
	| 'main'
	| 'about'
	| 'profiles'
	| 'articles'
	| 'article_details'
	| 'article_create'
	| 'article_edit'
	| 'admin_panel'
	| 'settings'
	| 'forbidden'
	// last
	| 'not_found';

export type AppRouteObject = RouteObject & {
	authOnly?: boolean;
	roles?: UserRole[];
};
