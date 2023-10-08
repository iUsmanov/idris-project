import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { Fragment, ReactNode, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import popupsCls from '../../../styles/PopupsMatrix.module.scss';
import { Listbox as HListbox } from '@headlessui/react';
import { Button } from '@/shared/components/Button';
import { HStack } from '@/shared/components/Stack';
import { DropdownDirection } from '@/shared/types/ui';

export interface ListBoxMatrixProps {
	className?: string;
	options: ListBoxOption[];
	label?: string;
	value?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	defaultValue?: string;
	direction?: DropdownDirection;
	compact?: boolean;
}

export interface ListBoxOption {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

export const ListBox = memo((props: ListBoxMatrixProps) => {
	const {
		className,
		options,
		label,
		onChange,
		value,
		disabled,
		defaultValue,
		direction = 'bottomRight',
		compact,
	} = props;

	const listBoxOptions = useMemo(
		() => (compact ? [{ value: `"_label"`, content: label, disabled: true }, ...options] : options),
		[compact, options, label]
	);

	const selectedItem = useMemo(() => {
		return options.find((option) => option.value === value);
	}, [options, value]);

	return (
		<HStack
			align='center'
			gap='4'
			className={classNames('', { [popupsCls.disabled]: disabled }, [className])}
		>
			{label && <span>{`${label}>`}</span>}
			<HListbox
				as={'div'}
				className={classNames('', {}, [popupsCls.popup])}
				value={value}
				onChange={onChange}
				disabled={disabled}
			>
				<HListbox.Button as={'div'} className={popupsCls.trigger}>
					<Button disabled={disabled} variant='outline'>
						{selectedItem?.content ?? defaultValue}
					</Button>
				</HListbox.Button>
				<HListbox.Options className={classNames(cls.options, {}, [popupsCls[direction]])}>
					{listBoxOptions.map((option) => (
						<HListbox.Option
							key={option.value}
							value={option.value}
							disabled={option.disabled}
							as={Fragment}
						>
							{({ active, selected }) => (
								<li
									className={classNames(
										cls.option,
										{
											[popupsCls.active]: active,
											[cls.selected]: selected,
											[popupsCls.disabled]: option.disabled,
										},
										[]
									)}
								>
									{option.content}
								</li>
							)}
						</HListbox.Option>
					))}
				</HListbox.Options>
			</HListbox>
		</HStack>
	);
});

const ListBoxAsync = (props: ListBoxMatrixProps) => {
	const { isLoaded, ListBox } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <ListBox {...props} />;
};

export const ListBoxMatrix = (props: ListBoxMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<ListBoxAsync {...props} />
		</MatrixSharedProvider>
	);
};
