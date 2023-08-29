import { firstCharLowerCase } from '../../createBeautyStructure/helpers';

export function mainFileText(componentName: string, state: string) {
	return `import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './${componentName}.module.scss';
import {
	${state}SharedProvider,
	use${state}SharedComponents,
} from '@/shared/lib/components/${state}SharedProvider/${state}SharedProvider';

export interface ${componentName + state}Props {
	className?: string;
}

export const ${componentName} = memo((props: ${componentName + state}Props) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.${firstCharLowerCase(componentName)}, {}, [className])}>

		</div>
	);
});

const ${componentName}Async = (props: ${componentName + state}Props) => {
	const { isLoaded, ${componentName} } = use${state}SharedComponents();

	if (!isLoaded) return null;

	return <${componentName} {...props} />;
};

export const ${componentName + state} = (props: ${componentName + state}Props) => {
	return (
		<${state}SharedProvider>
			<${componentName}Async {...props} />
		</${state}SharedProvider>
	);
};`;
}

export function mainMatrixFileEnd(componentName: string, text: string) {
	return `import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
${text}

const ${componentName}Async = (props: ${componentName}Props) => {
	const { isLoaded, ${componentName} } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <${componentName} {...props} />;
};

export const ${componentName}Matrix = (props: ${componentName}Props) => {
	return (
		<MatrixSharedProvider>
			<${componentName}Async {...props} />
		</MatrixSharedProvider>
	);
};`;
}
