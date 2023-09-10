import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface DropdownBeautyProps {
	className?: string;
}

export const Dropdown = memo((props: DropdownBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.dropdown, {}, [className])}></div>;
});

const DropdownAsync = (props: DropdownBeautyProps) => {
	const { isLoaded, Dropdown } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Dropdown {...props} />;
};

export const DropdownBeauty = (props: DropdownBeautyProps) => {
	return (
		<BeautySharedProvider>
			<DropdownAsync {...props} />
		</BeautySharedProvider>
	);
};
