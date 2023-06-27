import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { profileReducer } from '@/entities/Profile';

interface ProfilePageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	profile: profileReducer,
};

export const ProfilePage = memo((props: ProfilePageProps) => {
	const { className } = props;
	const { t } = useTranslation();
	useDynamicModule({ reducers: initialReducers });

	return <div className={classNames('', {}, [className])}>{t('Профиль')}</div>;
});
