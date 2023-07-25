import { Fragment, ReactNode, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { Listbox as HListbox } from '@headlessui/react';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';
import { DropdownDirection } from '@/shared/types/ui';

interface ListBoxProps {
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

export const ListBox = memo((props: ListBoxProps) => {
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

	return (
		<HStack align='center' gap='4'>
			{label && <span>{`${label}>`}</span>}
			<HListbox
				as={'div'}
				className={classNames(cls.listBox, { [cls.disabled]: disabled }, [className])}
				value={value}
				onChange={onChange}
				disabled={disabled}
			>
				<HListbox.Button className={cls.trigger}>
					<Button disabled={disabled} variant='outline'>
						{value ?? defaultValue}
					</Button>
				</HListbox.Button>
				<HListbox.Options className={classNames(cls.options, {}, [cls[direction]])}>
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
											[cls.active]: active,
											[cls.selected]: selected,
											[cls.disabled]: option.disabled,
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
