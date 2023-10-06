import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { Flex } from '@/shared/components/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

interface ScrollToolbarProps {
	className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Flex
			justify='center'
			align='center'
			max
			className={classNames(cls.scrollToolbar, {}, [className])}
		>
			<ScrollToTopButton />
		</Flex>
	);
});
