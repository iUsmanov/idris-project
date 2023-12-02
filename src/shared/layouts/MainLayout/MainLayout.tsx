import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';
import { TestProps } from '@/shared/types/tests';

interface MainLayoutProps extends TestProps {
	className?: string;
	header: ReactElement;
	sidebar: ReactElement;
	content: ReactElement;
	toolbar?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
	const {
		className,
		content,
		header,
		sidebar,
		['data-testid']: dataTestId = 'MainLayout',
		toolbar,
	} = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.mainLayout, {}, [className])} data-testid={dataTestId}>
			<div className={cls.sidebar}>{sidebar}</div>
			<div className={cls.content}>{content}</div>
			<div className={cls.rightbar}>
				<div className={cls.header}>{header}</div>
				<div className={cls.toolbar}>{toolbar}</div>
			</div>
		</div>
	);
};
