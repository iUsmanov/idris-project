import { getRouteAbout, getRouteMain, getRouteProfile } from '@/shared/const/router';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';

export interface SidebarItemType {
	path: string;
	text: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
	{
		path: getRouteMain(),
		text: 'Главная',
		Icon: MainIcon,
	},
	{
		path: getRouteAbout(),
		text: 'О сайте',
		Icon: AboutIcon,
	},
	{
		path: getRouteProfile(''),
		text: 'О сайте',
		Icon: ProfileIcon,
	},
];
