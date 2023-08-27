import { FC, lazy } from 'react';
import { CountrySelectProps } from './CountrySelect';

const CountrySelectAsync = lazy<FC<CountrySelectProps>>(() =>
	import('./CountrySelect').then((module) => ({ default: module.CountrySelect }))
);

export { CountrySelectAsync as CountrySelectBeauty };
