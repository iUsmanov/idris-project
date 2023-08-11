import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage = memo(() => {
	const { t } = useTranslation();

	return (
		<Page data-testid='MainPage'>
			{t('Главная страница')}
			<br />
			<RatingCard title={'Ваш фидбек'} feedbackTitle='Оставьте отзыв о статье' hasFeedback />
		</Page>
	);
});
