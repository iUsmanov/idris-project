import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { Fragment, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import { Menu } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '@/shared/components/AppLink';
import popupsCls from '../../../styles/PopupsMatrix.module.scss';

export interface DropdownMatrixProps {
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

export const Dropdown = memo((props: DropdownMatrixProps) => {
	const { className, items, trigger, direction = 'bottomRight' } = props;

	return (
		<Menu as={'div'} className={classNames('', {}, [className, popupsCls.popup])}>
			<Menu.Button as='div' className={popupsCls.trigger}>
				{trigger}
			</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, [popupsCls[direction]])}>
				{items.map((item, index) => {
					let itemInner;
					if (item.onClick) {
						itemInner = ({ active }: { active: boolean }) => (
							<button
								disabled={item.disabled}
								type='button'
								className={classNames(cls.item, { [popupsCls.active]: active }, [])}
								onClick={item.onClick}
							>
								{item.content}
							</button>
						);
					}

					if (item.href) {
						itemInner = ({ active }: { active: boolean }) => (
							<AppLink
								className={classNames(cls.item, { [popupsCls.active]: active }, [])}
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

const DropdownAsync = (props: DropdownMatrixProps) => {
	const { isLoaded, Dropdown } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Dropdown {...props} />;
};

export const DropdownMatrix = (props: DropdownMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<DropdownAsync {...props} />
		</MatrixSharedProvider>
	);
};
