import { FC } from 'react';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
interface AppProps {}

export const App: FC<AppProps> = (props) => {
	return (
		<div className={'app'}>
			<Navbar />
			<AppRouter />
		</div>
	);
};
