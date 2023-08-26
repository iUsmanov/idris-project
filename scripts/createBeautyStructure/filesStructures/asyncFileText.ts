import { firstCharLowerCase } from '../helpers';

export function asyncFileText(componentName: string) {
	return `import { lazy } from 'react';

export const ${componentName}Async = lazy(() =>
	import('./${componentName}').then((module) => ({ default: module.${componentName} }))
);	`;
}
