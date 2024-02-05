import { PageMainContent } from '@/widgets/PageMainContent';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage = memo(() => {
	const { t } = useTranslation('main');

	return <PageMainContent data-testid='MainPage'>{t('Главная страница')}</PageMainContent>;
});
