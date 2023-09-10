import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface ListBoxBeautyProps {
	className?: string;
}

export const ListBox = memo((props: ListBoxBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.listBox, {}, [className])}></div>;
});

const ListBoxAsync = (props: ListBoxBeautyProps) => {
	const { isLoaded, ListBox } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <ListBox {...props} />;
};

export const ListBoxBeauty = (props: ListBoxBeautyProps) => {
	return (
		<BeautySharedProvider>
			<ListBoxAsync {...props} />
		</BeautySharedProvider>
	);
};
