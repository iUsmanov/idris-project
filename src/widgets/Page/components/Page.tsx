import { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { UIEvent } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uiActions } from '../UI/model/slice/UISlice';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { getScrollByPath } from '../UI/model/selectors/getScrollSave';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/featureFlags';

interface PageProps extends TestProps {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
	const { className, children, onScrollEnd, 'data-testid': dataTestId } = props;
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

	useInfiniteScroll({
		triggerRef,
		wrapperRef,
		callback: onScrollEnd,
	});

	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition;
	});

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(uiActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
	}, 500);

	return (
		<main
			data-testid={dataTestId ?? 'Page'}
			onScroll={onScrollEnd && onScroll}
			ref={wrapperRef}
			className={classNames(
				toggleFeatures({
					name: 'isBeautyDesign',
					on: () => cls.pageBeauty,
					off: () => cls.page,
				}),
				{},
				[className]
			)}
		>
			{children}
			{onScrollEnd && <div ref={triggerRef} />}
		</main>
	);
};
