import { FC } from 'react';
import { Counter } from './Counter/Counter';
import { Link } from 'react-router-dom';
import { AppRouter } from './app/providers/router/components/AppRouter';
interface AppProps {}

export const App: FC<AppProps> = (props) => {
	return (
		<div className='app'>
			<Counter />
			<Link to={'/'}>MainPage</Link>
			<Link to={'/about'}>AboutPage</Link>
			<AppRouter />
		</div>
	);
};
