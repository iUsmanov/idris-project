import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { useSelector } from 'react-redux';
import { getProfileCanEdit } from '../../model/selectors/getProfileCanEdit/getProfileCanEdit';

export function useEditableProfileCardHeader() {
	const dispatch = useAppDispatch();
	const canEdit = useSelector(getProfileCanEdit);

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly());
	}, [dispatch]);

	const onEditSave = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(updateProfileData());
		}
	}, [dispatch]);

	return {
		canEdit,
		onCancelEdit,
		onEdit,
		onEditSave,
	};
}
