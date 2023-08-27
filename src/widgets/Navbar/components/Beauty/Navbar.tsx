import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { HStack } from '@/shared/components/Stack';
import { NotificationsPopup } from '@/features/notificationsPopup';
import { AvatarDropdown } from '@/features/avatarDropdown';

export interface NavbarProps {
	className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<HStack Tag='header' align='center' max className={classNames(cls.navbar, {}, [className])}>
			<NotificationsPopup />
			<AvatarDropdown />
		</HStack>
	);
});
