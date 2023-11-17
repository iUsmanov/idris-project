import { ChangeEvent, ChangeEventHandler, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { Flex } from '../Stack';
import { typedMemo } from '@/shared/lib/helpers/typedMemo/typedMemo';
import { TestProps } from '@/shared/types/tests';

interface SelectProps<T extends string> extends TestProps {
	className?: string;
	options: SelectOption<T>[];
	label?: string;
	value?: T;
	onChange?: (value: T) => void;
	disabled?: boolean;
}

export interface SelectOption<T extends string> {
	value: T;
	content: string;
}

/* 

Там еще надо поддержку аргумента compare также сделать:

const typedMemo: <Component extends React.FC<any>>(
component: Component,
compare?: (
prevProps: React.ComponentPropsWithoutRef<Component>,
newProps: React.ComponentPropsWithoutRef<Component>
) => boolean
) => Component = memo;

*/

export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
	const {
		className,
		options,
		label,
		onChange,
		value,
		['data-testid']: dataTestId = 'Select',
		disabled,
	} = props;
	const { t } = useTranslation();

	const onChangeHandler = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChange?.(event.target.value as T);
		},
		[onChange]
	);

	const optionsList = useMemo(() => {
		return options.map((opt) => (
			<option
				className={cls.option}
				key={opt.value}
				value={opt.value}
				data-testid={dataTestId + '.Item'}
			>
				{opt.content}
			</option>
		));
	}, [dataTestId, options]);

	return (
		<Flex className={cls.wrapper} data-testid={dataTestId}>
			{label && (
				<span
					className={classNames(cls.label, { [cls.disabled]: disabled }, [])}
				>{`${label}>`}</span>
			)}
			<select
				className={classNames(cls.select, {}, [className])}
				value={value}
				onChange={onChangeHandler}
				disabled={disabled}
				data-testid={dataTestId + '.Select'}
			>
				{optionsList}
			</select>
		</Flex>
	);
});
