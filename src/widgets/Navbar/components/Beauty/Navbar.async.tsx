import { FC, lazy } from 'react';
import { NavbarProps } from './Navbar';

const NavbarAsync = lazy<FC<NavbarProps>>(() =>
	import('./Navbar').then((module) => ({ default: module.Navbar }))
);

export { NavbarAsync as NavbarBeauty };
