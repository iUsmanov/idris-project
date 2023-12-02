import { toggleFeatures } from '@/shared/lib/featureFlags';
import MainIconMatrix from '@/shared/assets/icons/main-20-20.svg';
import MainIconBeauty from '@/shared/assets/icons/home.svg';
import { getRouteMain } from '@/shared/const/router';

export const mockSidebarItem = {
	path: getRouteMain(),
	Icon: toggleFeatures({
		name: 'isBeautyDesign',
		on: () => MainIconBeauty,
		off: () => MainIconMatrix,
	}),
	text: 'Главная',
};
