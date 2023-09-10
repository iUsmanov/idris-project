import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface AppLinkBeautyProps {
	className?: string;
}

export const AppLink = memo((props: AppLinkBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.appLink, {}, [className])}></div>;
});

const AppLinkAsync = (props: AppLinkBeautyProps) => {
	const { isLoaded, AppLink } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <AppLink {...props} />;
};

export const AppLinkBeauty = (props: AppLinkBeautyProps) => {
	return (
		<BeautySharedProvider>
			<AppLinkAsync {...props} />
		</BeautySharedProvider>
	);
};
