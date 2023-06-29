import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const AboutPage = memo(() => {
	const { t } = useTranslation();

	return <div>{t('О сайте')}</div>;
});
