import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Shimmer.module.scss';
import { HStack, VStack } from '../Stack';

export interface ShimmerType {
	ver?: (CSSProperties | ShimmerType)[];
	hor?: (CSSProperties | ShimmerType)[];
}

type ShimmerKey = keyof ShimmerType;
type ShimmerValue = (CSSProperties | ShimmerType)[];

interface ShimmerProps {
	skeletons: ShimmerType;
}

function createTupple(skeletons: CSSProperties | ShimmerType): [ShimmerKey, ShimmerValue] {
	const [tupple] = Object.entries(skeletons);
	return tupple as [ShimmerKey, ShimmerValue];
}

function createStack(name: ShimmerKey, array: ShimmerValue) {
	const nodes = array.map((obj: CSSProperties | ShimmerType, index: number) => {
		if ('hor' in obj || 'ver' in obj) {
			const [name, array] = createTupple(obj);
			return createStack(name, array);
		}

		return <div style={obj as CSSProperties} className={cls.skeleton} key={index}></div>;
	});

	const key = Math.random();

	if (name === 'hor') {
		return <HStack key={key}>{nodes}</HStack>;
	}

	if (name === 'ver') {
		return <VStack key={key}>{nodes}</VStack>;
	}
}

export const Shimmer = memo((props: ShimmerProps) => {
	const { skeletons } = props;

	const [name, array] = createTupple(skeletons);
	const nodes = createStack(name, array);

	return <div className={classNames(cls.shimmer, {}, [])}>{nodes}</div>;
});
