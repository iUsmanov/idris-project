import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface IconBeautyProps {
	className?: string;
}

export const Icon = memo((props: IconBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.icon, {}, [className])}></div>;
});

const IconAsync = (props: IconBeautyProps) => {
	const { isLoaded, Icon } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Icon {...props} />;
};

export const IconBeauty = (props: IconBeautyProps) => {
	return (
		<BeautySharedProvider>
			<IconAsync {...props} />
		</BeautySharedProvider>
	);
};
