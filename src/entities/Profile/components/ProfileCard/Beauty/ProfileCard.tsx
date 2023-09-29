import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Flex, HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { Input } from '@/shared/components/Input';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { Profile } from '../../../model/types/profile';
import { Card } from '@/shared/components/Card';
import { Avatar } from '@/shared/components/Avatar';
import { Skeleton } from '@/shared/components/Skeleton';

export interface ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstOrLastName?: (value: string, name?: string) => void;
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
		onChangeAge,
		onChangeAvatar,
		onChangeCity,
		onChangeUsername,
		onChangeCountry,
		onChangeCurrency,
		onChangeFirstOrLastName,
	} = props;
	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<Card
				flex
				direction='column'
				gap='32'
				padding='24'
				max
				className={classNames('', {}, [className])}
			>
				<Flex max justify='center'>
					<Skeleton width={128} height={128} borderRadius='50%' />
				</Flex>
				<HStack max gap='24'>
					<VStack gap='16' max>
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
					</VStack>
					<VStack gap='16' max>
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
						<Skeleton width={'100%'} height={38} />
					</VStack>
				</HStack>
			</Card>
		);
	}

	if (error) {
		return (
			<Flex justify='center' align='center' max className={classNames('', {}, [className])}>
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
		<Card
			flex
			direction='column'
			gap='32'
			padding='24'
			max
			className={classNames('', {}, [className])}
		>
			<Avatar max justify='center' src={data?.avatar} size={128} data-testid='ProfileCard.Avatar' />
			<HStack max gap='24'>
				<VStack gap='16' max>
					<Input
						onChange={onChangeFirstOrLastName}
						readOnly={readonly}
						value={data?.first}
						label={t('Имя')}
						name='firstName'
						data-testid='ProfileCard.InputFirstName'
					/>
					<Input
						onChange={onChangeFirstOrLastName}
						readOnly={readonly}
						value={data?.lastname}
						label={t('Фамилия')}
						name='lastName'
						data-testid='ProfileCard.InputLastName'
					/>
					<Input
						onChange={onChangeAge}
						readOnly={readonly}
						value={data?.age}
						label={t('Возраст')}
						data-testid='ProfileCard.InputAge'
					/>
					<Input
						onChange={onChangeCity}
						readOnly={readonly}
						value={data?.city}
						label={t('Город')}
						data-testid='ProfileCard.InputCity'
					/>
				</VStack>
				<VStack gap='16' max>
					<Input
						onChange={onChangeUsername}
						readOnly={readonly}
						value={data?.username}
						label={t('Имя пользователя')}
						data-testid='ProfileCard.InputUsername'
					/>
					<Input
						onChange={onChangeAvatar}
						readOnly={readonly}
						value={data?.avatar}
						label={t('Ссылка на аватар')}
						data-testid='ProfileCard.InputAvatar'
					/>
					<CurrencySelect
						disabled={readonly}
						value={data?.currency}
						onChange={onChangeCurrency}
						data-testid='ProfileCard.CurrencySelect'
					/>
					<CountrySelect
						disabled={readonly}
						value={data?.country}
						onChange={onChangeCountry}
						data-testid='ProfileCard.CountrySelect'
					/>
				</VStack>
			</HStack>
		</Card>
	);
});
