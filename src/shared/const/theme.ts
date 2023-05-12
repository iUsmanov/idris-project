import { Theme } from '../types/theme';
import { LOCAL_STORAGE_THEME_KEY } from './localStorage';

export const defaultTheme =
	(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || 'app_dark_theme';
