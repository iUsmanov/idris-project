import { lazy } from 'react';
import { TypeOfTabs } from './Tabs';

export const TabsAsync = lazy<TypeOfTabs>(() =>
	import('./Tabs').then((module) => ({ default: module.Tabs }))
);
