import { firstCharLowerCase } from '../helpers';

export function scssFileText(componentName: string) {
	return `.${firstCharLowerCase(componentName)} {
	// =
}`;
}
