import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface ButtonBeautyProps {
	className?: string;
}

export const Button = memo((props: ButtonBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.button, {}, [className])}></div>;
});

const ButtonAsync = (props: ButtonBeautyProps) => {
	const { isLoaded, Button } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Button {...props} />;
};

export const ButtonBeauty = (props: ButtonBeautyProps) => {
	return (
		<BeautySharedProvider>
			<ButtonAsync {...props} />
		</BeautySharedProvider>
	);
};
