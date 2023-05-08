import { FC } from 'react';
import { App } from './App';
import { ThemeProvider } from './app/providers/ThemeProvider';
interface RootLayoutProps {}

export const RootLayout: FC<RootLayoutProps> = (props) => {
	return (
		<ThemeProvider>
			<App />
		</ThemeProvider>
	);
};
