import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';
import MainIconMatrix from '@/shared/assets/icons/main-20-20.svg';
import AboutIconMatrix from '@/shared/assets/icons/about-20-20.svg';
import ProfileIconMatrix from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconMatrix from '@/shared/assets/icons/article-20-20.svg';
import MainIconBeauty from '@/shared/assets/icons/home.svg';
import AboutIconBeauty from '@/shared/assets/icons/Info.svg';
import ProfileIconBeauty from '@/shared/assets/icons/avatar.svg';
import ArticleIconBeauty from '@/shared/assets/icons/article.svg';
import { getUserAuthData } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/lib/featureFlags';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
	const sidebarItemsList: SidebarItemType[] = [
		{
			path: getRouteMain(),
			Icon: toggleFeatures({
				name: 'isBeautyDesign',
				on: () => MainIconBeauty,
				off: () => MainIconMatrix,
			}),
			text: 'Главная',
		},
		{
			path: getRouteAbout(),
			Icon: toggleFeatures({
				name: 'isBeautyDesign',
				on: () => AboutIconBeauty,
				off: () => AboutIconMatrix,
			}),
			text: 'О сайте',
		},
	];

	if (userData) {
		sidebarItemsList.push(
			{
				path: getRouteProfile(userData.id),
				Icon: toggleFeatures({
					name: 'isBeautyDesign',
					on: () => ProfileIconBeauty,
					off: () => ProfileIconMatrix,
				}),
				text: 'Профиль',
				authOnly: true,
			},
			{
				path: getRouteArticles(),
				Icon: toggleFeatures({
					name: 'isBeautyDesign',
					on: () => ArticleIconBeauty,
					off: () => ArticleIconMatrix,
				}),
				text: 'Статьи',
				authOnly: true,
			}
		);
	}

	return sidebarItemsList;
});
