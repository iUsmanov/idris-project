import { FC, lazy } from 'react';
import { ThemeSwitcherProps } from './ThemeSwitcher';

const ThemeSwitcherAsync = lazy<FC<ThemeSwitcherProps>>(() =>
	import('./ThemeSwitcher').then((module) => ({ default: module.ThemeSwitcher }))
);

export { ThemeSwitcherAsync as ThemeSwitcherBeauty };
