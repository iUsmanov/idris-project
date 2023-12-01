import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { useEditableProfileCardHeader } from '../../lib/hooks/useEditableProfileCardHeader';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { EditableProfileCardHeaderBeauty } from './Beauty/EditableProfileCardHeader.async';

interface EditableProfileCardHeaderProps {
	className?: string;
	readonly?: boolean;
	profileValidateErrors?: ValidateProfileError[];
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
	const { className, readonly, profileValidateErrors } = props;
	const { t } = useTranslation('profile');
	const { canEdit, onCancelEdit, onEdit, onEditSave } = useEditableProfileCardHeader();

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<EditableProfileCardHeaderBeauty {...props} />}
			off={
				<>
					<HStack
						className={classNames('', {}, [className])}
						max
						justify='between'
						align='center'
						data-testid='EditableProfileCardHeader'
					>
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
			}
		/>
	);
});
