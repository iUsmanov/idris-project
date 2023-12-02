import { FC, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';
import { TestProps } from '@/shared/types/tests';

interface StickyContentLayoutProps extends TestProps {
	className?: string;
	left?: ReactElement;
	content: ReactElement;
	right?: ReactElement;
}

export const StickyContentLayout: FC<StickyContentLayoutProps> = (props) => {
	const { className, content, left, right, ['data-testid']: dataTestId } = props;

	return (
		<div
			className={classNames(cls.stickyContentLayout, {}, [className])}
			data-testid={dataTestId && dataTestId}
		>
			{left && <div className={cls.left}>{left}</div>}
			<div className={cls.content}>{content}</div>
			{right && <div className={cls.right}>{right}</div>}
		</div>
	);
};
