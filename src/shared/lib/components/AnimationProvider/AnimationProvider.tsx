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

/* 

1) Сначало переносим шаред-компонент в папку депрекейтед
2) Создаём папку Beauty вместе с содержимым 
3) создаём главный компонент с заготовленной структурой
4) Надо сделать DeprecatedSharedProvider & BeautyShatredProvider
5) В главном Shared компоненте должна быть Просто тоггле-фича

Провайдеры должны использоваться прямо в отдельных компонентах

DeviceViews
Stack
Overlay
Drawer
Modal
Portal
AppImage
Avatar

Glinter
Shimmer

Select
Loader

AppLogo

 */
