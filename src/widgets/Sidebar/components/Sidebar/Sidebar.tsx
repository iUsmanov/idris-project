import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Flex, HStack, VStack } from '@/shared/components/Stack';
import { LangSwitcher } from '@/features/LangSwitcher';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { getRouteAbout, getRouteMain } from '@/shared/const/router';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const [collapsed, setCollapsed] = useState<boolean>(false);

	return (
		<div
			data-testid={'sidebar'}
			className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<VStack gap='16' className={cls.items}>
				<AppLink variant='inverted' className={cls.item} to={getRouteMain()}>
					<HStack align='center'>
						<MainIcon className={cls.icon} />
						<span className={cls.link}>{t('Главная')}</span>
					</HStack>
				</AppLink>
				<AppLink variant='inverted' className={cls.item} to={getRouteAbout()}>
					<HStack align='center'>
						<AboutIcon className={cls.icon} />
						<span className={cls.link}>{t('О сайте')}</span>
					</HStack>
				</AppLink>
			</VStack>
			<Button
				variant='backgroundInverted'
				className={cls.collapseButton}
				data-testid={'collapseButton'}
				onClick={() => setCollapsed((prev) => !prev)}
			>
				{collapsed ? '>' : '<'}
			</Button>
			<Flex
				direction={collapsed ? 'column' : 'row'}
				justify='center'
				align='center'
				max
				className={cls.switchers}
			>
				<ThemeSwitcher />
				<LangSwitcher className={cls.langSwitcher} short={collapsed} />
			</Flex>
		</div>
	);
});
