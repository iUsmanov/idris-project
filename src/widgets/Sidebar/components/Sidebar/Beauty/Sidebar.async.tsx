import { FC, lazy } from 'react';
import { SidebarProps } from './Sidebar';

const SidebarAsync = lazy<FC<SidebarProps>>(() =>
	import('./Sidebar').then((module) => ({ default: module.Sidebar }))
);

export { SidebarAsync as SidebarBeauty };
