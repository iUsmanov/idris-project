import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import popupsCls from '../../../styles/PopupsMatrix.module.scss';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from '@/shared/types/ui';
import { TestProps } from '@/shared/types/tests';

export interface PopoverMatrixProps extends TestProps {
	className?: string;
	trigger: ReactNode;
	direction?: DropdownDirection;
	children: ReactNode;
}

export const Popover = memo((props: PopoverMatrixProps) => {
	const {
		className,
		trigger,
		direction = 'bottomLeft',
		['data-testid']: dataTestId = 'Popover',
		children,
	} = props;
	const { t } = useTranslation();

	return (
		<HPopover
			as={'div'}
			className={classNames('', {}, [className, popupsCls.popup])}
			data-testid={dataTestId}
		>
			<HPopover.Button as='div' className={popupsCls.trigger} data-testid={dataTestId + '.Trigger'}>
				{trigger}
			</HPopover.Button>

			<HPopover.Panel className={classNames(cls.panel, {}, [popupsCls[direction]])}>
				{children}
			</HPopover.Panel>
		</HPopover>
	);
});

const PopoverAsync = (props: PopoverMatrixProps) => {
	const { isLoaded, Popover } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Popover {...props} />;
};

export const PopoverMatrix = (props: PopoverMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<PopoverAsync {...props} />
		</MatrixSharedProvider>
	);
};
