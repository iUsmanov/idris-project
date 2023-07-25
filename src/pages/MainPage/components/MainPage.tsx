import { Button } from '@/shared/components/Button/Button';
import { Dropdown } from '@/shared/components/Dropdown/Dropdown';
import { ListBox } from '@/shared/components/ListBox/ListBox';
import { Page } from '@/widgets/Page';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const items = [
	{
		content: 'CONTENTCONTENT',
	},
	{
		content: 'CONTENTCONTENT',
	},
	{
		content: 'CONTENTCONTENT',
	},
];

const listBoxItems = [
	{
		content: 'CONTENTCONTENT',
		value: '12',
	},
	{
		content: 'CONTENTCONTENT',
		value: '123',
	},
	{
		content: 'CONTENTCONTENT',
		value: '124',
	},
];

export const MainPage = memo(() => {
	const { t } = useTranslation();

	return (
		<Page>
			{t('Главная страница')}
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<Dropdown direction='bottomRight' items={items} trigger={<Button>OPEN</Button>} />
			<ListBox options={listBoxItems} defaultValue='Selcte' onChange={() => console.log('h')} />
		</Page>
	);
});
