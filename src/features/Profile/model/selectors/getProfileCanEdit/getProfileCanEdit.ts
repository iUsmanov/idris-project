import { getUserAuthData } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { getProfileData } from '../getProfileData/getProfileData';

export const getProfileCanEdit = createSelector(
	getUserAuthData,
	getProfileData,
	(userData, profileData) => {
		if (!userData || !profileData) return;
		if (userData?.id === profileData?.id) {
			return true;
		} else {
			return false;
		}
	}
);
