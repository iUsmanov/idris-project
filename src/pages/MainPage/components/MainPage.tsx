import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage = memo(() => {
	const { t } = useTranslation('main');

	return <Page data-testid='MainPage'>{t('Главная страница')}</Page>;
});
