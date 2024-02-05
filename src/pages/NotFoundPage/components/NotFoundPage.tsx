import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';
import { HStack } from '@/shared/components/Stack';
import { PageMainContent } from '@/widgets/PageMainContent';

export const NotFoundPage = memo(() => {
	const { t } = useTranslation();
	return (
		<PageMainContent data-testid='NotFoundPage'>
			<HStack justify='center' align='center' className={cls.notFoundPage}>
				{t('Страница не найдена')}
			</HStack>
		</PageMainContent>
	);
});
