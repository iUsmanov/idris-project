import { firstCharLowerCase } from '../helpers';

export function asyncFileText(componentName: string) {
	return `import { FC, lazy } from 'react';
import { ${componentName}Props } from './${componentName}';

const ${componentName}Async = lazy<FC<${componentName}Props>>(() =>
	import('./${componentName}').then((module) => ({ default: module.${componentName} }))
);

export { ${componentName}Async as ${componentName}Beauty };`;
}
