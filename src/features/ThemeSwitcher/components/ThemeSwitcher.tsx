import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { Button } from '@/shared/components/Button';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveUserSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon } from '@/shared/components/Icon';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ThemeSwitcherBeauty } from './Beauty/ThemeSwitcher.async';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
	const { className } = props;
	const { changeTheme } = useTheme();
	const dispatch = useAppDispatch();

	const onChangeTheme = useCallback(() => {
		changeTheme((newTheme) => {
			dispatch(saveUserSettings({ theme: newTheme }));
		});
	}, [changeTheme, dispatch]);

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ThemeSwitcherBeauty {...props} />}
			off={
				<Button
					variant='clear'
					className={classNames(cls.themeSwitcher, {}, [className])}
					onClick={onChangeTheme}
				>
					<Icon Svg={ThemeIcon} width={40} height={40} variant='inverted' />
				</Button>
			}
		/>
	);
});
