import { FC } from 'react';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
interface AppProps {}

export const App: FC<AppProps> = (props) => {
	return (
		<div className={'app'}>
			<Navbar />
			<div className='content-part'>
				<Sidebar />
				<AppRouter />
			</div>
		</div>
	);
};
