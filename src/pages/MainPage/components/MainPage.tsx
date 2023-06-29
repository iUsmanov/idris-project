import { SelectOption, Select } from '@/shared/components/Select/Select';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const MainPage = memo(() => {
	const { t } = useTranslation();

	const dsa = useMemo<SelectOption[]>(
		() => [
			{ value: 'lala1', content: 'nelala1' },
			{ value: 'lala2', content: 'nelala2' },
			{ value: 'lala3', content: 'nelala3' },
			{ value: 'lala4', content: 'nelala4' },
		],
		[]
	);

	return (
		<div>
			{t('Главная страница')}
			<br />
			<Select options={dsa} label='Выберите' />
		</div>
	);
});
