import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageMainContent } from '@/widgets/PageMainContent';
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
		<PageMainContent className={classNames('', {}, [className])} data-testid='ProfilePage'>
			<EditableProfileCard id={id} />
		</PageMainContent>
	);
});
