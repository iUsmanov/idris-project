import { FC } from 'react';
import { Counter } from '../Counter/Counter';
import { Link } from 'react-router-dom';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
interface AppProps {}

export const App: FC<AppProps> = (props) => {
	const { changeTheme } = useTheme();

	return (
		<div className={'app'}>
			<Navbar />
			<button onClick={changeTheme}>ChangeTheme</button>
			<Counter />
			<AppRouter />
		</div>
	);
};
