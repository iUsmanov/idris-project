import { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageMainContent.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/featureFlags';
import { useScrolling } from '@/shared/lib/UI';

interface PageProps extends TestProps {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
}

export const PageMainContent = (props: PageProps) => {
	const { className, children, onScrollEnd, 'data-testid': dataTestId = 'PageMainContent' } = props;
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	const { onScroll } = useScrolling(wrapperRef.current);

	useInfiniteScroll({
		triggerRef,
		wrapperRef: toggleFeatures({
			name: 'isBeautyDesign',
			on: () => undefined,
			off: () => wrapperRef,
		}),
		callback: onScrollEnd,
	});

	return (
		<main
			data-testid={dataTestId}
			onScroll={onScroll}
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
			{onScrollEnd && <div data-testid={dataTestId + '.Trigger'} ref={triggerRef} />}
		</main>
	);
};

/* 


		toggleFeatures({
			name: 'isBeautyDesign',
			on: () => (document.body.scrollTop = scrollPosition),
			off: () => (wrapperRef.current.scrollTop = scrollPosition),
		});

			console.log(pathname);
	console.log(scrollPosition);
	console.log(wrapperRef.current);

*/
