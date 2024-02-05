import { PageMainContent } from '@/widgets/PageMainContent';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export const ArticleEditPage = memo(() => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const isEdit = Boolean(id);

	return (
		<PageMainContent data-testid='ArticleEditPage'>
			{isEdit ? t('Редактирование статьи с ID = ') + id : t('Создание новой статьи')}
		</PageMainContent>
	);
});
