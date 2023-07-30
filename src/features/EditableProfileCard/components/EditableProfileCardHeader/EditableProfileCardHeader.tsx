import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text/Text';
import { Button } from '@/shared/components/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { useSelector } from 'react-redux';
import { getProfileCanEdit } from '../../model/selectors/getProfileCanEdit/getProfileCanEdit';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';

interface EditableProfileCardHeaderProps {
	className?: string;
	readonly?: boolean;
	profileValidateErrors?: ValidateProfileError[];
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
	const { className, readonly, profileValidateErrors } = props;
	const { t } = useTranslation('profile');
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

	return (
		<>
			<HStack className={classNames('', {}, [className])} max justify='between' align='center'>
				<Text title={t('Профиль')} size='size_l' />
				{canEdit && (
					<>
						{readonly ? (
							<Button
								onClick={onEdit}
								variant={'outline'}
								data-testid='EditableProfileCardHeader.EditButton'
							>
								{t('Редактировать')}
							</Button>
						) : (
							<HStack gap='8'>
								<Button
									onClick={onCancelEdit}
									variant={'outlineRed'}
									data-testid='EditableProfileCardHeader.CancelButton'
								>
									{t('Отменить')}
								</Button>
								<Button
									onClick={onEditSave}
									variant={'outline'}
									data-testid='EditableProfileCardHeader.SaveButton'
								>
									{t('Сохранить')}
								</Button>
							</HStack>
						)}
					</>
				)}
			</HStack>
			<div>
				{profileValidateErrors?.length &&
					profileValidateErrors?.map((err) => (
						<Text
							size='size_l'
							key={err}
							variant='error'
							text={t(err)}
							data-testid='EditableProfileCardHeader.ErrorText'
						/>
					))}
			</div>
		</>
	);
});
