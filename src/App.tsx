import { FC } from 'react';
import { Counter } from './Counter/Counter';

interface AppProps {
	className?: string;
}

export const App: FC<AppProps> = (props) => {
	const { className } = props;

	return (
		<div className='app'>
			<Counter />
		</div>
 );
}