import { Fragment, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import { Menu } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

interface DropdownProps {
	className?: string;
	items: DropdownItem[];
	trigger: ReactNode;
	direction?: DropdownDirection;
}

export interface DropdownItem {
	disabled?: boolean;
	content: ReactNode;
	onClick?: VoidFunction;
	href?: string;
}

export const Dropdown = memo((props: DropdownProps) => {
	const { className, items, trigger, direction = 'bottomRight' } = props;

	return (
		<Menu as={'div'} className={classNames(cls.dropdown, {}, [className])}>
			<Menu.Button as='div' className={cls.btn}>
				{trigger}
			</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, [cls[direction]])}>
				{items.map((item, index) => {
					if (item.href) {
						return (
							<Menu.Item key={index} as={Fragment} disabled={item.disabled}>
								<AppLink to={item.href}>{item.content}</AppLink>
							</Menu.Item>
						);
					}

					return (
						<Menu.Item key={index} as={Fragment} disabled={item.disabled}>
							{({ active }: { active: boolean }) => (
								<button
									disabled={item.disabled}
									type='button'
									className={classNames(cls.item, { [cls.active]: active }, [])}
									onClick={item.onClick}
								>
									{item.content}
								</button>
							)}
						</Menu.Item>
					);
				})}
			</Menu.Items>
		</Menu>
	);
});
