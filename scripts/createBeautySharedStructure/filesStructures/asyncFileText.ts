export function asyncFileText(componentName: string, state: string) {
	return `import { FC, lazy } from 'react';
import { ${componentName + state}Props } from './${componentName}';

export const ${componentName}Async = lazy<FC<${componentName + state}Props>>(() =>
	import('./${componentName}').then((module) => ({ default: module.${componentName} }))
);`;
}
