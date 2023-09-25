import { ReactNode, memo, useCallback, useEffect } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import {
	AnimationProvider,
	useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider/AnimationProvider';
import { toggleFeatures } from '@/shared/lib/featureFlags';

interface DrawerProps {
	className?: string;
	container?: HTMLElement;
	children: ReactNode;
	isOpened?: boolean;
	isMounted?: boolean;
	onDrawerClose?: () => void;
}

const height = window.innerHeight;

const DrawerComponent = memo((props: DrawerProps) => {
	const { className, children, container, isOpened = false, isMounted = false, onDrawerClose } = props;
	const { Spring, Gesture } = useAnimationLibs();

	const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

	const openDrawer = useCallback(() => {
		api.start({ y: 0, immediate: false });
	}, [api]);

	useEffect(() => {
		if (isOpened) {
			openDrawer();
		}
	}, [isOpened, openDrawer, api]);

	const closeDrawer = (velocity = 0) => {
		api.start({
			y: height,
			immediate: false,
			config: { ...Spring.config.stiff, velocity },
			onResolve: onDrawerClose,
		});
	};

	const bind = Gesture.useDrag(
		({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
			if (my < -70) cancel();

			if (last) {
				if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
					closeDrawer();
				} else {
					openDrawer();
				}
			} else api.start({ y: my, immediate: true });
		},
		{ from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
	);

	const display = y.to((py) => (py < height ? 'block' : 'none'));

	const onContentClick = useCallback((event: React.MouseEvent) => {
		event.stopPropagation();
	}, []);

	const mods: Mods = {
		[cls.opened]: isOpened,
	};

	return (
		<Portal container={container} isMounted={isMounted}>
			<div
				className={classNames(cls.modal, mods, [
					className,
					toggleFeatures({
						name: 'isBeautyDesign',
						on: () => cls.modalBeauty,
						off: () => cls.modalMatrix,
					}),
				])}
			>
				<Overlay onClick={() => closeDrawer()}>
					<Spring.a.div
						onClick={onContentClick}
						style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
						className={classNames(cls.drawerContent, {}, [cls.sheet])}
						{...bind()}
					>
						{children}
					</Spring.a.div>
				</Overlay>
			</div>
		</Portal>
	);
});

const DrawerAsync = (props: DrawerProps) => {
	const { isLoaded } = useAnimationLibs();

	if (!isLoaded) return null;

	return <DrawerComponent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
	return (
		<AnimationProvider>
			<DrawerAsync {...props} />
		</AnimationProvider>
	);
};
