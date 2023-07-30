import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const ForbiddenPage = memo(() => {
	const { t } = useTranslation();

	return <Page>FORBIDDENPAGE</Page>;
});
