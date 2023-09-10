import { lazy } from 'react';
import { TypeOfIcon } from './Icon';

export const IconAsync = lazy<TypeOfIcon>(() =>
	import('./Icon').then((module) => ({ default: module.Icon }))
);
