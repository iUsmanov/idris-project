import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const AdminPanelPage = memo(() => {
	const { t } = useTranslation();

	return <Page>ADMINPANELPAGE</Page>;
});
