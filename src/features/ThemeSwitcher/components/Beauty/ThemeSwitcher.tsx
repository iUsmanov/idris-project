import { memo, useCallback } from 'react';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveUserSettings } from '@/entities/User';
import { Icon } from '@/shared/components/Icon';

export interface ThemeSwitcherProps {
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

	return <Icon Svg={ThemeIcon} clickable onClick={onChangeTheme} />;
});
