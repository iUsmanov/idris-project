import { FC } from 'react';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { HStack } from '@/shared/components/Stack';
interface AppProps {}

export const App: FC<AppProps> = (props) => {
	return (
		<div className={'app'}>
			<Navbar />
			<HStack>
				<Sidebar />
				<AppRouter />
			</HStack>
		</div>
	);
};
