import { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageMainContent.module.scss';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/featureFlags';
import { useScrolling } from '@/shared/lib/UI';

interface PageProps extends TestProps {
	className?: string;
	children: ReactNode;
}

export const PageMainContent = (props: PageProps) => {
	const { className, children, 'data-testid': dataTestId = 'PageMainContent' } = props;
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	// const [node, setNode] = useState(wrapperRef.current)
	useScrolling(
		toggleFeatures({
			name: 'isBeautyDesign',
			on: () => undefined,
			off: () => wrapperRef,
		})
	);

	// console.log(wrapperRef.current);

	// useEffect(() => {
	// 	const s = setInterval(() => {
	// 		console.log(wrapperRef.current);
	// 	}, 500);

	// 	return () => {
	// 		clearTimeout(s);
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<main
			data-testid={dataTestId}
			className={classNames(
				toggleFeatures({
					name: 'isBeautyDesign',
					on: () => cls.pageBeauty,
					off: () => cls.page,
				}),
				{},
				[className]
			)}
			ref={toggleFeatures({
				name: 'isBeautyDesign',
				on: () => undefined,
				off: () => wrapperRef,
			})}
		>
			{children}
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
