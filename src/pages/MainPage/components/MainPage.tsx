import { RatingCard } from '@/entities/Rating';
import { StarRating } from '@/shared/components/StarRating/StarRating';
import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage = memo(() => {
	const { t } = useTranslation();

	return (
		<Page>
			{t('Главная страница')}
			<br />
			<RatingCard title={'Ваш фидбек'} feedbackTitle='Оставьте отзыв о статье' hasFeedback />
		</Page>
	);
});
