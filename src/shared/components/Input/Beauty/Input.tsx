import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface InputBeautyProps {
	className?: string;
}

export const Input = memo((props: InputBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.input, {}, [className])}></div>;
});

const InputAsync = (props: InputBeautyProps) => {
	const { isLoaded, Input } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Input {...props} />;
};

export const InputBeauty = (props: InputBeautyProps) => {
	return (
		<BeautySharedProvider>
			<InputAsync {...props} />
		</BeautySharedProvider>
	);
};
