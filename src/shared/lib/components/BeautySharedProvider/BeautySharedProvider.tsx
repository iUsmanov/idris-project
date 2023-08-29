// import { ButtonBeautyProps } from '@/shared/components/Button/Beauty/Button';
// import {
// 	FC,
// 	LazyExoticComponent,
// 	ReactNode,
// 	createContext,
// 	memo,
// 	useContext,
// 	useEffect,
// 	useMemo,
// 	useRef,
// 	useState,
// } from 'react';

// type ButtonType = LazyExoticComponent<FC<ButtonBeautyProps>>;

// interface BeautySharedContextPayload {
// 	Button?: ButtonType;
// 	isLoaded?: boolean;
// }

// interface BeautySharedProvider {
// 	children: ReactNode;
// }

// const BeautySharedContext = createContext<BeautySharedContextPayload>({});

// const getAsyncBeautySharedModules = async () => {
// 	return Promise.all([import('@/shared/components/Button/Beauty/Button.async')]);
// };

// export const useBeautySharedComponents = () => {
// 	return useContext(BeautySharedContext) as Required<BeautySharedContextPayload>;
// };

// export const BeautySharedProvider = memo((props: BeautySharedProvider) => {
// 	const { children } = props;
// 	const ButtonRef = useRef<ButtonType>();
// 	const [isLoaded, setIsLoaded] = useState(false);

// 	useEffect(() => {
// 		getAsyncBeautySharedModules().then(([Button]) => {
// 			ButtonRef.current = Button.ButtonAsync;
// 			setIsLoaded(true);
// 		});
// 	}, []);

// 	const value = useMemo(
// 		() => ({
// 			Button: ButtonRef.current,
// 			isLoaded,
// 		}),
// 		[isLoaded]
// 	);

// 	return <BeautySharedContext.Provider value={value}>{children}</BeautySharedContext.Provider>;
// });

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
