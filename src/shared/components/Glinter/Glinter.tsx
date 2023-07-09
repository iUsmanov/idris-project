import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Glinter.module.scss';

interface GlinterProps {
	className?: string;
	children?: JSX.Element | JSX.Element[];
}

// type AA = JSX.Element | JSX.Element[] | JSX.Element[]

// function rec(element) {
// 	if(Array.isArray(element)){

// 	}
// }

const dsa = [];

export const Glinter = memo((props: GlinterProps) => {
	const { className, children } = props;
	if (Array.isArray(children)) {
		const nodes = children.map((element: JSX.Element) => {
			console.log('TO DO');

			if (element.props['data-no']) {
				console.log('YES PROPS');

				return element;
			} else {
				console.log('NO PROPS');

				return (
					<div
						{...element.props}
						key={Math.random()}
						className={classNames(cls.skeleton, {}, [className])}
					></div>
				);
			}
		});
		console.log(nodes);

		return <div>{nodes}</div>;
	}
	if (children) {
		return <div>{children}</div>;
	}
	return <div className={classNames(cls.skeleton, {}, [className])}></div>;
});
