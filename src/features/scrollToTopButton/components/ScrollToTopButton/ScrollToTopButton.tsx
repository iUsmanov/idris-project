import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToTopButton.module.scss';
import { Icon } from '@/shared/components/Icon';
import ToTopIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
	className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
	const { className } = props;

	const onClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<Icon
			width={32}
			height={32}
			clickable
			onClick={onClick}
			Svg={ToTopIcon}
			className={classNames(cls.scrollToTopButton, {}, [className])}
		/>
	);
});
