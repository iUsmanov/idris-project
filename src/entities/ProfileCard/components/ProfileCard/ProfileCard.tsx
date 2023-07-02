import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import { Flex, HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text/Text';
import { Input } from '@/shared/components/Input/Input';
import { Profile } from '@/features/Profile';
import { Loader } from '@/shared/components/Loader/Loader';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstName?: (value: string) => void;
	onChangeLastName?: (value: string) => void;
	onChangeUsername?: (value: string) => void;
	onChangeAge?: (value: string) => void;
	onChangeCity?: (value: string) => void;
	onChangeAvatar?: (value: string) => void;
	onChangeCurrency?: (value: Currency) => void;
	onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const {
		className,
		isLoading,
		data,
		error,
		readonly,
		onChangeFirstName,
		onChangeLastName,
		onChangeAge,
		onChangeAvatar,
		onChangeCity,
		onChangeUsername,
		onChangeCountry,
		onChangeCurrency,
	} = props;
	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<HStack justify='center' className={classNames(cls.profileCard, {}, [className, cls.loading])}>
				<Loader size='max' />
			</HStack>
		);
	}

	if (error) {
		return (
			<Flex
				justify='center'
				align='center'
				className={classNames(cls.profileCard, {}, [className, cls.error])}
			>
				<Text
					variant='error'
					size='size_l'
					align='center'
					title={t('Произошла ошибка при загрузке')}
					text={t('Попробуйте обновить страницу')}
				/>
			</Flex>
		);
	}

	return (
		<div className={classNames(cls.profileCard, { [cls.editing]: !readonly }, [className])}>
			<Avatar src={data?.avatar} size={150} />
			<VStack gap={'16'}>
				<Input
					onChange={onChangeFirstName}
					readOnly={readonly}
					value={data?.first}
					placeholder={t('Ваше имя')}
				/>
				<Input
					onChange={onChangeLastName}
					readOnly={readonly}
					value={data?.lastname}
					placeholder={t('Ваша фамилия')}
				/>
				<Input
					onChange={onChangeAge}
					readOnly={readonly}
					value={data?.age}
					placeholder={t('Ваш возраст')}
				/>
				<Input
					onChange={onChangeCity}
					readOnly={readonly}
					value={data?.city}
					placeholder={t('Город')}
				/>
				<Input
					onChange={onChangeUsername}
					readOnly={readonly}
					value={data?.username}
					placeholder={t('Введите имя пользователя')}
				/>
				<Input
					onChange={onChangeAvatar}
					readOnly={readonly}
					value={data?.avatar}
					placeholder={t('Введите ссылку на аватар')}
				/>
				<CurrencySelect disabled={readonly} value={data?.currency} onChange={onChangeCurrency} />
				<CountrySelect disabled={readonly} value={data?.country} onChange={onChangeCountry} />
			</VStack>
		</div>
	);
});
