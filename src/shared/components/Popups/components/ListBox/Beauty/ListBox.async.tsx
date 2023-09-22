import { lazy } from 'react';
import { TypeOfListBox } from './ListBox';

export const ListBoxAsync = lazy<TypeOfListBox>(() =>
	import('./ListBox').then((module) => ({ default: module.ListBox }))
);
