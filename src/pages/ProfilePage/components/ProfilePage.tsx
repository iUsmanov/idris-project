import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { EditableProfileCard } from '@/features/Profile';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
	className?: string;
}

export const ProfilePage = memo((props: ProfilePageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Page className={classNames('', {}, [className])}>
			<EditableProfileCard />
		</Page>
	);
});
