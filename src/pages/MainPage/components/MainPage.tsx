import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage = memo(() => {
	const { t } = useTranslation();

	return (
		<div>
			{t('Главная страница')}
			<br />
		</div>
	);
});
