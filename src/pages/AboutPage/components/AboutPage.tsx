import { PageMainContent } from '@/widgets/PageMainContent';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const AboutPage = memo(() => {
	const { t } = useTranslation('about');

	return <PageMainContent data-testid='AboutPage'>{t('О сайте')}</PageMainContent>;
});
