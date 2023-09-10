import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface TabsBeautyProps {
	className?: string;
}

export const Tabs = memo((props: TabsBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.tabs, {}, [className])}></div>;
});

const TabsAsync = (props: TabsBeautyProps) => {
	const { isLoaded, Tabs } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Tabs {...props} />;
};

export const TabsBeauty = (props: TabsBeautyProps) => {
	return (
		<BeautySharedProvider>
			<TabsAsync {...props} />
		</BeautySharedProvider>
	);
};
