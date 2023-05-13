import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutPageProps {}

export const AboutPage: FC<AboutPageProps> = (props) => {
	const { t } = useTranslation();

	return <div>{t('О сайте')}</div>;
};
