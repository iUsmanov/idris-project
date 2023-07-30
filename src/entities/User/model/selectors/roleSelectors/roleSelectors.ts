import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;
export const getIsAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes('ADMIN')));
export const getIsManager = createSelector(getUserRoles, (roles) =>
	Boolean(roles?.includes('MANAGER'))
);
export const getIsAdminOrManager = createSelector(
	getIsAdmin,
	getIsManager,
	(isAdmin, isManager) => isAdmin || isManager
);

// This selector is unused
// export const isUserHaveRole = createSelector([getUserRoles,
// 	(_, role : UserRole) => role,
// 	], (roles, role) => Boolean(roles?.includes(role)));
