import { firstCharLowerCase } from '../helpers';

export function mainFileText(componentName: string) {
	return `import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './${componentName}.module.scss';

export interface ${componentName}Props {
	className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.${firstCharLowerCase(componentName)}, {}, [className])}>

		</div>
	);
});`;
}
