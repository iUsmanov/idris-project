import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import popupsCls from '../../../styles/PopupsBeauty.module.scss';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';

export interface PopoverBeautyProps {
	className?: string;
	trigger: ReactNode;
	direction?: DropdownDirection;
	children: ReactNode;
}

export const Popover = memo((props: PopoverBeautyProps) => {
	const { className, trigger, direction = 'bottomLeft', children } = props;
	const { t } = useTranslation();

	return (
		<HPopover as={'div'} className={classNames('', {}, [className, popupsCls.popup])}>
			<HPopover.Button as='div' className={popupsCls.trigger}>
				{trigger}
			</HPopover.Button>

			<HPopover.Panel className={classNames(cls.panel, {}, [popupsCls[direction], popupsCls.items])}>
				{children}
			</HPopover.Panel>
		</HPopover>
	);
});

const PopoverAsync = (props: PopoverBeautyProps) => {
	const { isLoaded, Popover } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Popover {...props} />;
};

export const PopoverBeauty = (props: PopoverBeautyProps) => {
	return (
		<BeautySharedProvider>
			<PopoverAsync {...props} />
		</BeautySharedProvider>
	);
};
