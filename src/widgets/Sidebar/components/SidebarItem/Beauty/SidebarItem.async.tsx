import { FC, lazy } from 'react';
import { SidebarItemProps } from './SidebarItem';

const SidebarItemAsync = lazy<FC<SidebarItemProps>>(() =>
	import('./SidebarItem').then((module) => ({ default: module.SidebarItem }))
);

export { SidebarItemAsync as SidebarItemBeauty };
