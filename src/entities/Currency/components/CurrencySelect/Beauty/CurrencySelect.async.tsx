import { FC, lazy } from 'react';
import { CurrencySelectProps } from './CurrencySelect';

const CurrencySelectAsync = lazy<FC<CurrencySelectProps>>(() =>
	import('./CurrencySelect').then((module) => ({ default: module.CurrencySelect }))
);

export { CurrencySelectAsync as CurrencySelectBeauty };
