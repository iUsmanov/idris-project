import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/components/Text';
import { Page } from '@/widgets/Page';

interface SettingsPageProps {
	className?: string;
}

export const SettingsPage = memo((props: SettingsPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Page className={classNames('', {}, [className])}>
			<Text size='size_l' title='Настройки пользователя' />
		</Page>
	);
});
