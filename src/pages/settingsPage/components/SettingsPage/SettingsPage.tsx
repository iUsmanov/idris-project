import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/components/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/components/Stack';
import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';

interface SettingsPageProps {
	className?: string;
}

export const SettingsPage = memo((props: SettingsPageProps) => {
	const { className } = props;
	const { t } = useTranslation('settings');

	return (
		<Page className={classNames('', {}, [className])}>
			<VStack gap='16'>
				<Text size='size_l' title={t('Настройки пользователя')} />
				<UIDesignSwitcher />
			</VStack>
		</Page>
	);
});
