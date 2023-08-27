import { FC, lazy } from 'react';
import { ProfileCardProps } from './ProfileCard';

const ProfileCardAsync = lazy<FC<ProfileCardProps>>(() =>
	import('./ProfileCard').then((module) => ({ default: module.ProfileCard }))
);

export { ProfileCardAsync as ProfileCardBeauty };
