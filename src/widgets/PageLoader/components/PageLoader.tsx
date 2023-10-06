import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';
import { Loader } from '@/shared/components/Loader';
import { HStack } from '@/shared/components/Stack';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { PageLoaderBeauty } from './Beauty/PageLoader.async';
import { PageLoaderBeautyProps } from './Beauty/PageLoader';

export const PageLoader = memo((props: PageLoaderBeautyProps) => {
	const { t } = useTranslation();

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<PageLoaderBeauty {...props} />}
			off={
				<HStack justify='center' align='center' className={classNames(cls.pageLoader, {}, [])}>
					<Loader size='max' />
				</HStack>
			}
		/>
	);
});
