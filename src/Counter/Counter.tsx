import { FC, useState } from 'react';
import cls from './Counter.module.scss';

interface CounterProps {
	className?: string;
	prop1?: string;
	prop2?: string;
	prop3?: string;
	prop4?: string;
	prop5?: string;
	prop6?: string;
}

export const Counter: FC<CounterProps> = (props) => {
	const { className, prop1, prop2, prop3, prop4 } = props;
	const [count, setCount] = useState(0);

	return (
		<div>
			<h1 className={cls.title}>This is a counter</h1>
			<h2>{count}</h2>
			<button type='button' onClick={() => setCount((prev) => prev + 1)}>
				incrementor
			</button>
			<button type='button' onClick={() => setCount((prev) => prev - 1)}>
				decrementor
			</button>
		</div>
	);
};
