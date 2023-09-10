import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface CardBeautyProps {
	className?: string;
}

export const Card = memo((props: CardBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.card, {}, [className])}></div>;
});

const CardAsync = (props: CardBeautyProps) => {
	const { isLoaded, Card } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Card {...props} />;
};

export const CardBeauty = (props: CardBeautyProps) => {
	return (
		<BeautySharedProvider>
			<CardAsync {...props} />
		</BeautySharedProvider>
	);
};
