import { FC, lazy } from 'react';
import { AvatarDropdownProps } from './AvatarDropdown';

const AvatarDropdownAsync = lazy<FC<AvatarDropdownProps>>(() =>
	import('./AvatarDropdown').then((module) => ({ default: module.AvatarDropdown }))
);

export { AvatarDropdownAsync as AvatarDropdownBeauty };
