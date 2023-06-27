import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import { useSelector } from 'react-redux';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text/Text';
import { Button } from '@/shared/components/Button/Button';
import { Input } from '@/shared/components/Input/Input';

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const { className } = props;
	const { t } = useTranslation('profile');
	const data = useSelector(getProfileData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);

	return (
		<div className={classNames(cls.profileCard, {}, [className])}>
			<HStack max justify='between' align='center'>
				<Text title={t('Профиль')} size='size_l' />
				<Button variant='outline'>{t('Редактировать')}</Button>
			</HStack>
			<VStack gap={'16'}>
				<Input value={data?.first} placeholder={t('Ваше имя')} />
				<Input value={data?.lastname} placeholder={t('Ваша фамилия')} />
			</VStack>
		</div>
	);
});
