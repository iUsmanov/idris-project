import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = (props) => {
	const { t } = useTranslation();
	return <div>{t('Главная страница')}</div>;
};
