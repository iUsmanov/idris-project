import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { ProfileCard, fetchProfileData, profileReducer } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ProfilePageProps {
	className?: string;
}

const initialReducers: ReducersList = {
	profile: profileReducer,
};

export const ProfilePage = memo((props: ProfilePageProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	useDynamicModule({ reducers: initialReducers });
	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

	return (
		<div className={classNames('', {}, [className])}>
			<ProfileCard />
		</div>
	);
});
