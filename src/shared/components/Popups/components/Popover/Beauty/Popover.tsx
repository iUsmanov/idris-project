import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface PopoverBeautyProps {
	className?: string;
}

export const Popover = memo((props: PopoverBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.popover, {}, [className])}></div>;
});

const PopoverAsync = (props: PopoverBeautyProps) => {
	const { isLoaded, Popover } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Popover {...props} />;
};

export const PopoverBeauty = (props: PopoverBeautyProps) => {
	return (
		<BeautySharedProvider>
			<PopoverAsync {...props} />
		</BeautySharedProvider>
	);
};
