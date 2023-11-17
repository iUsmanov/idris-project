import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { Fragment, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import { Menu } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '@/shared/components/AppLink';
import popupsCls from '../../../styles/PopupsBeauty.module.scss';
import { TestProps } from '@/shared/types/tests';

export interface DropdownBeautyProps extends TestProps {
	className?: string;
	items: DropdownItem[];
	trigger: ReactNode;
	direction?: DropdownDirection;
	textNoWrap?: boolean;
}

export interface DropdownItem {
	disabled?: boolean;
	content: ReactNode;
	onClick?: VoidFunction;
	href?: string;
}

export const Dropdown = memo((props: DropdownBeautyProps) => {
	const {
		className,
		items,
		trigger,
		direction = 'bottomRight',
		['data-testid']: dataTestId = 'Dropdown',
		textNoWrap = false,
	} = props;

	return (
		<Menu
			as={'div'}
			className={classNames('', {}, [className, popupsCls.popup])}
			data-testid={dataTestId}
		>
			<Menu.Button as='div' className={popupsCls.trigger} data-testid={dataTestId + '.Trigger'}>
				{trigger}
			</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, [popupsCls[direction], popupsCls.items])}>
				{items.map((item, index) => {
					let itemInner;
					if (item.onClick) {
						itemInner = ({ active }: { active: boolean }) => (
							<button
								disabled={item.disabled}
								type='button'
								className={classNames(
									cls.item,
									{ [popupsCls.active]: active, [cls.textNoWrap]: textNoWrap },
									[]
								)}
								onClick={item.onClick}
							>
								{item.content}
							</button>
						);
					}

					if (item.href) {
						itemInner = ({ active }: { active: boolean }) => (
							<AppLink
								className={classNames(
									cls.item,
									{ [popupsCls.active]: active, [cls.textNoWrap]: textNoWrap },
									[]
								)}
								to={item.href as string}
							>
								{item.content}
							</AppLink>
						);
					}

					return (
						<Menu.Item key={index} as={Fragment} disabled={item.disabled}>
							{itemInner}
						</Menu.Item>
					);
				})}
			</Menu.Items>
		</Menu>
	);
});

const DropdownAsync = (props: DropdownBeautyProps) => {
	const { isLoaded, Dropdown } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Dropdown {...props} />;
};

export const DropdownBeauty = (props: DropdownBeautyProps) => {
	return (
		<BeautySharedProvider>
			<DropdownAsync {...props} />
		</BeautySharedProvider>
	);
};
