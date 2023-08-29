// import { ButtonMatrixProps } from '@/shared/components/Button/Matrix/Button';
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

// type ButtonType = LazyExoticComponent<FC<ButtonMatrixProps>>;

// interface MatrixSharedContextPayload {
// 	Button?: ButtonType;
// 	isLoaded?: boolean;
// }

// interface MatrixSharedProvider {
// 	children: ReactNode;
// }

// const MatrixSharedContext = createContext<MatrixSharedContextPayload>({});

// const getAsyncMatrixSharedModules = async () => {
// 	return Promise.all([import('@/shared/components/Button/Matrix/Button.async')]);
// };

// export const useMatrixSharedComponents = () => {
// 	return useContext(MatrixSharedContext) as Required<MatrixSharedContextPayload>;
// };

// export const MatrixSharedProvider = memo((props: MatrixSharedProvider) => {
// 	const { children } = props;
// 	const ButtonRef = useRef<ButtonType>();
// 	const [isLoaded, setIsLoaded] = useState(false);

// 	useEffect(() => {
// 		getAsyncMatrixSharedModules().then(([Button]) => {
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

// 	return <MatrixSharedContext.Provider value={value}>{children}</MatrixSharedContext.Provider>;
// });
