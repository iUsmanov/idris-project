import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { Button } from '@/shared/components/Button';
import { ValidateProfileError } from '../../../model/types/editableProfileCardSchema';
import { useEditableProfileCardHeader } from '../../../lib/hooks/useEditableProfileCardHeader';
import { Card } from '@/shared/components/Card';

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
		<>
			<Card
				border='high'
				padding='24'
				flex
				className={classNames('', {}, [className])}
				max
				justify='between'
				align='center'
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
									data-testid='EditableProfileCardHeader.CancelButton'
									color='error'
								>
									{t('Отменить')}
								</Button>
								<Button
									onClick={onEditSave}
									data-testid='EditableProfileCardHeader.SaveButton'
									color='success'
								>
									{t('Сохранить')}
								</Button>
							</HStack>
						)}
					</>
				)}
			</Card>
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
