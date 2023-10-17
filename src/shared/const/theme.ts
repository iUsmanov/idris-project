// #theme
import { Theme } from '../types/theme';
import { LOCAL_STORAGE_THEME_KEY } from './localStorage';

export const fallbackTheme: Theme =
	(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || 'app-light-theme';
