export function toggleMainFile(componentName: string) {
	return `import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ${componentName}BeautyProps, ${componentName}Beauty } from './Beauty/${componentName}';
import { ${componentName}MatrixProps, ${componentName}Matrix } from './Matrix/${componentName}';

export type ${componentName}Props = ${componentName}MatrixProps | ${componentName}BeautyProps;
export const ${componentName} = memo((props: ${componentName}Props) => {

	return (
		<ToggleFeatures 
			name='isBeautyDesign'
			on={<${componentName}Beauty {...props as ${componentName}BeautyProps} />}
			off={<${componentName}Matrix {...props as ${componentName}MatrixProps} />}
		/>
	);
});`;
}
