import { ChangeEvent, ChangeEventHandler, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { Flex } from '../Stack';

interface SelectProps {
	className?: string;
	options: SelectOption[];
	label?: string;
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
}

export interface SelectOption {
	value: string;
	content: string;
}

export const Select = memo((props: SelectProps) => {
	const { className, options, label, onChange, value, disabled } = props;
	const { t } = useTranslation();

	const onChangeHandler = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onChange?.(event.target.value);
		},
		[onChange]
	);

	const optionsList = useMemo(() => {
		return options.map((opt) => (
			<option className={cls.option} key={opt.value} value={opt.value}>
				{opt.content}
			</option>
		));
	}, [options]);

	return (
		<Flex className={cls.wrapper}>
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
			>
				{optionsList}
			</select>
		</Flex>
	);
});
