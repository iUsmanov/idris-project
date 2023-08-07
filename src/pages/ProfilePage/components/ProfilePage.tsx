import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { Text } from '@/shared/components/Text';

interface ProfilePageProps {
	className?: string;
}

export const ProfilePage = memo((props: ProfilePageProps) => {
	const { className } = props;
	const { t } = useTranslation('profile');
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Text size='size_l' align='center' variant='error' title={t('Профиль не найден')} />;
	}

	return (
		<Page className={classNames('', {}, [className])}>
			<EditableProfileCard id={id} />
		</Page>
	);
});
