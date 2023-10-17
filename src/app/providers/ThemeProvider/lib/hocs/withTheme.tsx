// #theme
import { useUserSettings } from '@/entities/User';
import { ThemeProvider } from '../../components/ThemeProvider';

export const withTheme = (Component: React.ComponentType) => {
	return () => {
		const { theme } = useUserSettings();
		return (
			<ThemeProvider initialTheme={theme}>
				<Component />
			</ThemeProvider>
		);
	};
};
