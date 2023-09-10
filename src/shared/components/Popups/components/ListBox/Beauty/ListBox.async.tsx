import { FC, lazy } from 'react';
import { ListBoxBeautyProps } from './ListBox';

export const ListBoxAsync = lazy<FC<ListBoxBeautyProps>>(() =>
	import('./ListBox').then((module) => ({ default: module.ListBox }))
);
