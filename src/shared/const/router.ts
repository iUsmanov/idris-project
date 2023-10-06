import { AppRoutes } from '../types/router';

export const getRouteMain = () => `/`;
export const getRouteAbout = () => `/about`;
export const getRouteProfile = (id: string) => `/profiles/${id}`;
export const getRouteArticles = () => `/articles`;
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => `/articles/create`;
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => `/admin`;
export const getRouteSettings = () => `/settings`;
export const getRouteForbidden = () => `/forbidden`;
export const getRouteNotFound = () => `/*`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
	[getRouteMain()]: 'main',
	[getRouteAbout()]: 'about',
	[getRouteProfile(':id')]: 'profiles',
	[getRouteArticles()]: 'articles',
	[getRouteArticleDetails(':id')]: 'article_details',
	[getRouteArticleCreate()]: 'article_create',
	[getRouteArticleEdit(':id')]: 'article_edit',
	[getRouteAdminPanel()]: 'admin_panel',
	[getRouteSettings()]: 'settings',
	[getRouteForbidden()]: 'forbidden',
};
