import { FC } from 'react';
import { Counter } from './Counter/Counter';

interface AppProps {
	className?: string;
}

export const App: FC<AppProps> = (props) => {
	const { className } = props;

	return (
		<div className='app'>
			<Counter
				className='class'
				prop1='fdsfggf'
				prop2='fdsfdsfsdfdsfdsdfssdffsdfd'
				prop3='fefwfewfwf'
				prop4='gregregreg'
			/>
		</div>
	);
};
