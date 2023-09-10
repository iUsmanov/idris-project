import { FC, lazy } from 'react';
import { TabsBeautyProps } from './Tabs';

export const TabsAsync = lazy<FC<TabsBeautyProps>>(() =>
	import('./Tabs').then((module) => ({ default: module.Tabs }))
);
