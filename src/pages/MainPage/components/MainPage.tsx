import { Avatar } from '@/shared/components/Avatar/Avatar';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage = memo(() => {
	const { t } = useTranslation();

	return (
		<div>
			{t('Главная страница')}
			<br />
			<Avatar
				justify='center'
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIs1e6RZnKzJM5rAbOfMrVc04P7dyP7748F99tRgXFy9gPC0chPh5OUT8yVZIgq576t7s&usqp=CAU'
			/>
		</div>
	);
});
