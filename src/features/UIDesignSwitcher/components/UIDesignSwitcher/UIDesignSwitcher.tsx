// #featureFlags
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox, ListBoxOption } from '@/shared/components/Popups';
import { getFeatureFlag, toggleFeatures, updateFeatureFlags } from '@/shared/lib/featureFlags';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { Skeleton } from '@/shared/components/Skeleton';

interface UIDesignSwitcherProps {
	className?: string;
}

export const UIDesignSwitcher = memo((props: UIDesignSwitcherProps) => {
	const { className } = props;
	const { t } = useTranslation('settings');
	const dispatch = useAppDispatch();
	const authData = useSelector(getUserAuthData);
	const isBeautyDesign = getFeatureFlag('isBeautyDesign');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const options = useMemo<ListBoxOption[]>(
		() => [
			{
				content: t('Матрица'),
				value: 'matrix-design',
			},
			{
				content: t('Красота'),
				value: 'beauty-design',
			},
		],
		[t]
	);

	const onChange = useCallback(
		async (value: string) => {
			if (!authData) return;
			setIsLoading(true);
			await dispatch(
				updateFeatureFlags({
					newFeaturesFlags: {
						isBeautyDesign: value === 'beauty-design',
					},
					userId: authData.id,
				})
			).unwrap();
			setIsLoading(false);
		},
		[authData, dispatch]
	);

	return (
		<HStack gap='16' align='center' data-testid='UIDesignSwitcher'>
			<Text
				title={
					t('Выберите дизайн') +
					toggleFeatures({
						name: 'isBeautyDesign',
						on: () => '',
						off: () => '>',
					})
				}
			/>
			{isLoading ? (
				<Skeleton width={100} height={40} />
			) : (
				<ListBox
					onChange={onChange}
					options={options}
					value={isBeautyDesign ? 'beauty-design' : 'matrix-design'}
					className={classNames('', {}, [className])}
				/>
			)}
		</HStack>
	);
});
