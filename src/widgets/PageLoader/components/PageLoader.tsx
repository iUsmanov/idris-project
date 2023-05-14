import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';
import { Loader } from '@/shared/components/Loader/Loader';
import { HStack } from '@/shared/components/Stack';

interface PageLoaderProps {
	className?: string;
}

export const PageLoader = memo((props: PageLoaderProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<HStack justify='center' align='center' className={classNames(cls.pageLoader, {}, [className])}>
			<Loader size='max' />
		</HStack>
	);
});
