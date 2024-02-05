import { PageMainContent } from '@/widgets/PageMainContent';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const ForbiddenPage = memo(() => {
	const { t } = useTranslation();

	return <PageMainContent data-testid='ForbiddenPage'>FORBIDDENPAGE</PageMainContent>;
});
