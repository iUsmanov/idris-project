import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageError.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { VStack } from '@/shared/components/Stack';

interface PageErrorProps {
	className?: string;
}

export const PageError = memo((props: PageErrorProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const reload = () => {
		window.location.reload();
	};

	return (
		<VStack justify='center' align='center' className={classNames(cls.pageError, {}, [className])}>
			<h1>{t('Произошла непредвиденная ошибка')}</h1>
			<Button onClick={reload}>{t('Обновить страницу')}</Button>
		</VStack>
	);
});
