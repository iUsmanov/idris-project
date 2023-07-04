import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const [FTName] = memo(() => {
	const { t } = useTranslation();

	return <div>[FTName | uppercase]</div>;
});
