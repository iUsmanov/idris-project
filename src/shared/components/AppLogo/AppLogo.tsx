import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { Flex } from '../Stack';

interface AppLogoProps {
	className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<Flex justify='center' max className={classNames(cls.appLogoWrapper, {}, [className])}>
			<div className={cls.gradientBig}></div>
			<div className={cls.gradientSmall}></div>
			<AppSvg className={cls.appLogo} />
		</Flex>
	);
});
