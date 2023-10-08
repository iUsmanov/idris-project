import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const AboutPage = memo(() => {
	const { t } = useTranslation('about');

	return <Page data-testid='AboutPage'>{t('О сайте')}</Page>;
});
