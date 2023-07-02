import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text/Text';
import { Button } from '@/shared/components/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import cls from './EditableProfileCardHeader.module.scss';

interface EditableProfileCardHeaderProps {
	className?: string;
	readonly?: boolean;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
	const { className, readonly } = props;
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly());
	}, [dispatch]);

	const onEditSave = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch]);

	return (
		<HStack
			className={classNames(cls.editableProfileCardHeader, {}, [className])}
			max
			justify='between'
			align='center'
		>
			<Text title={t('Профиль')} size='size_l' />
			{readonly ? (
				<Button onClick={onEdit} variant={'outline'}>
					{t('Редактировать')}
				</Button>
			) : (
				<HStack gap='8'>
					<Button onClick={onCancelEdit} variant={'outlineRed'}>
						{t('Отменить')}
					</Button>
					<Button onClick={onEditSave} variant={'outline'}>
						{t('Сохранить')}
					</Button>
				</HStack>
			)}
		</HStack>
	);
});
