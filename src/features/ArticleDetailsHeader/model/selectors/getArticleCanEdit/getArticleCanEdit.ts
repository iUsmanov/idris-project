import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';

export const getArticleCanEdit = createSelector(
	getUserAuthData,
	getArticleDetailsData,
	(userData, articleData) => {
		if (!userData || !articleData) return;
		if (userData.id === articleData.userId) {
			return true;
		} else {
			return false;
		}
	}
);
