import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { Button } from '@/shared/components/Button';
import OrangeIcon from '@/shared/assets/icons/orange-sun.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveUserSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
	const { className } = props;
	const { changeTheme, theme } = useTheme();
	const dispatch = useAppDispatch();

	const onChangeTheme = useCallback(() => {
		changeTheme((newTheme) => {
			dispatch(saveUserSettings({ theme: newTheme }));
		});
	}, [changeTheme, dispatch]);

	return (
		<Button
			variant='clear'
			className={classNames(cls.themeSwitcher, {}, [className])}
			onClick={onChangeTheme}
		>
			{theme === 'app-light-theme' && <LightIcon />}
			{theme === 'app-dark-theme' && <OrangeIcon className={cls.icon} />}
			{theme === 'app-orange-theme' && <DarkIcon />}
		</Button>
	);
});
