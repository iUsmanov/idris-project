import { FC, lazy } from 'react';
import { ListBoxMatrixProps } from './ListBox';

export const ListBoxAsync = lazy<FC<ListBoxMatrixProps>>(() =>
	import('./ListBox').then((module) => ({ default: module.ListBox }))
);
