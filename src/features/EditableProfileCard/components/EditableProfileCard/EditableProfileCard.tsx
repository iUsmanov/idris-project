import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileFormData } from '../../model/selectors/getProfileFormData/getProfileFormData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/components/Stack';
import { ProfileCard } from '@/entities/Profile';

interface EditableProfileCardProps {
	className?: string;
}

const initialReducers: ReducersList = {
	profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const { className } = props;
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();
	const formData = useSelector(getProfileFormData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
	const profileValidateErrors = useSelector(getProfileValidateErrors);
	const { id } = useParams<{ id: string }>();

	useDynamicModule({ reducers: initialReducers });

	// useInitialEffect(() => {
	// if (id) {
	// 	dispatch(fetchProfileData(id));
	// }
	// });

	useEffect(() => {
		if (__ENVIRON__ !== 'storybook') {
			if (id) {
				dispatch(fetchProfileData(id));
			}
		}
	}, [dispatch, id]);

	const onChangeFirstOrLastName = useCallback(
		(value: string, name?: string) => {
			switch (name) {
				case 'firstName':
					dispatch(profileActions.setFormData({ first: value }));
					break;
				case 'lastName':
					dispatch(profileActions.setFormData({ lastname: value }));
					break;
				default:
					return;
			}
		},
		[dispatch]
	);

	const onChangeAge = useCallback(
		(value: string) => {
			// const number = Number(value);
			// if (!Number.isNaN(number) && number >= 0 && number <= Number.MAX_SAFE_INTEGER) {
			// 	dispatch(profileActions.setFormData({ age: number }));
			// }

			dispatch(profileActions.setFormData({ age: Number(value?.replace(/\D/gi, '') || 0) }));
		},
		[dispatch]
	);

	const onChangeCity = useCallback(
		(value: string) => {
			dispatch(profileActions.setFormData({ city: value }));
		},
		[dispatch]
	);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(profileActions.setFormData({ username: value }));
		},
		[dispatch]
	);

	const onChangeAvatar = useCallback(
		(value: string) => {
			dispatch(profileActions.setFormData({ avatar: value }));
		},
		[dispatch]
	);

	const onChangeCurrency = useCallback(
		(value: Currency) => {
			dispatch(profileActions.setFormData({ currency: value }));
		},
		[dispatch]
	);

	const onChangeCountry = useCallback(
		(value: Country) => {
			dispatch(profileActions.setFormData({ country: value }));
		},
		[dispatch]
	);

	return (
		<VStack max gap='16' className={classNames('', {}, [className])}>
			<EditableProfileCardHeader readonly={readonly} profileValidateErrors={profileValidateErrors} />
			<ProfileCard
				data={formData}
				isLoading={isLoading}
				error={error}
				readonly={readonly}
				onChangeFirstOrLastName={onChangeFirstOrLastName}
				onChangeAge={onChangeAge}
				onChangeCity={onChangeCity}
				onChangeUsername={onChangeUsername}
				onChangeAvatar={onChangeAvatar}
				onChangeCurrency={onChangeCurrency}
				onChangeCountry={onChangeCountry}
			/>
		</VStack>
	);
});
