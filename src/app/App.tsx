import { FC } from 'react';
import { Counter } from '../Counter/Counter';
import { Link } from 'react-router-dom';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppRouter } from './providers/router';
interface AppProps {}

export const App: FC<AppProps> = (props) => {
	const { changeTheme } = useTheme();

	return (
		<div className={'app'}>
			<button onClick={changeTheme}>ChanheTheme</button>
			<Counter />
			<Link to={'/'}>MainPage</Link>
			<Link to={'/about'}>AboutPage</Link>
			<AppRouter />
		</div>
	);
};
