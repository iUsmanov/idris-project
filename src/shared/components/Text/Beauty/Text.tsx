import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface TextBeautyProps {
	className?: string;
}

export const Text = memo((props: TextBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.text, {}, [className])}></div>;
});

const TextAsync = (props: TextBeautyProps) => {
	const { isLoaded, Text } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Text {...props} />;
};

export const TextBeauty = (props: TextBeautyProps) => {
	return (
		<BeautySharedProvider>
			<TextAsync {...props} />
		</BeautySharedProvider>
	);
};
