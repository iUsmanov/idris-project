import { Input } from '@/shared/components/Input/Input';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = (props) => {
	const { t } = useTranslation();
	const [value, setValue] = useState<string>('');

	const onChange = (value: string) => {
		setValue(value);
	};

	return (
		<div>
			{t('Главная страница')}
			<Input placeholder='Введите текст' value={value} onChange={onChange} autoFocus />
			<Input placeholder='Введите текст' value={value} onChange={onChange} />
		</div>
	);
};
