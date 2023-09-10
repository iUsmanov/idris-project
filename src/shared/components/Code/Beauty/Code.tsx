import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface CodeBeautyProps {
	className?: string;
}

export const Code = memo((props: CodeBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.code, {}, [className])}></div>;
});

const CodeAsync = (props: CodeBeautyProps) => {
	const { isLoaded, Code } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Code {...props} />;
};

export const CodeBeauty = (props: CodeBeautyProps) => {
	return (
		<BeautySharedProvider>
			<CodeAsync {...props} />
		</BeautySharedProvider>
	);
};
