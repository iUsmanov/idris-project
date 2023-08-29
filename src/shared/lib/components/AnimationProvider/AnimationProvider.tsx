import {
	ReactNode,
	createContext,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
	Spring?: SpringType;
	Gesture?: GestureType;
	isLoaded?: boolean;
}

interface AnimationProvider {
	children: ReactNode;
}

const AnimationContext = createContext<AnimationContextPayload>({});

const getAsyncAnimationModules = async () => {
	return Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);
};

export const useAnimationLibs = () => {
	return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = memo((props: AnimationProvider) => {
	const { children } = props;
	const SpringRef = useRef<SpringType>();
	const GestureRef = useRef<GestureType>();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		getAsyncAnimationModules().then(([Spring, Gesture]) => {
			SpringRef.current = Spring;
			GestureRef.current = Gesture;
			setIsLoaded(true);
		});
	}, []);

	const value = useMemo(
		() => ({
			Spring: SpringRef.current,
			Gesture: GestureRef.current,
			isLoaded,
		}),
		[isLoaded]
	);

	return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
});
