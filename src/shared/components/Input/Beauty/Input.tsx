import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { ChangeEvent, InputHTMLAttributes, ReactNode, memo, useEffect, useRef, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack } from '@/shared/components/Stack';
import { Text } from '../../Text';
import { TestProps } from '@/shared/types/tests';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'>;
type InputSize = 's' | 'm' | 'l';

export interface InputBeautyProps extends HTMLInputProps, TestProps {
	className?: string;
	placeholder?: string;
	type?: string;
	value?: string | number;
	onChange?: (value: string, name?: string) => void;
	autoFocus?: boolean;
	readOnly?: boolean;
	name?: string;
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
	label?: string;
	size?: InputSize;
}

export const Input = memo((props: InputBeautyProps) => {
	const {
		className,
		placeholder,
		type = 'text',
		value = '',
		onChange,
		autoFocus,
		readOnly,
		name,
		addonLeft,
		addonRight,
		label,
		['data-testid']: dataTestId = 'Input',
		size = 'm',
		...otherProps
	} = props;
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const ref = useRef<HTMLInputElement>(null);

	const onFocus = () => {
		setIsFocused(true);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (name) {
			onChange?.(event.target.value, name);
		} else {
			onChange?.(event.target.value);
		}
	};

	useEffect(() => {
		if (autoFocus) {
			onFocus();
			setTimeout(() => {
				ref.current?.focus();
			}, 30);
		}
	}, [autoFocus]);

	const input = (
		<HStack
			align='center'
			className={classNames(
				cls.componentWrapper,
				{
					[cls.focused]: isFocused,
					[cls.withAddonLeft]: Boolean(addonLeft),
					[cls.withAddonRight]: Boolean(addonRight),
				},
				[className, cls['size_' + size]]
			)}
		>
			{addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
			<input
				{...otherProps}
				ref={ref}
				data-testid={dataTestId}
				type={type}
				className={cls.input}
				value={value}
				onChange={changeHandler}
				onFocus={onFocus}
				onBlur={onBlur}
				autoFocus={autoFocus}
				readOnly={readOnly}
				placeholder={placeholder}
			/>
			{addonRight && <div className={cls.addonRight}>{addonRight}</div>}
		</HStack>
	);

	if (label) {
		return (
			<HStack
				gap='8'
				max
				align='center'
				className={classNames(
					'',
					{
						[cls.readonly]: readOnly,
					},
					[className, cls['size_' + size]]
				)}
			>
				<Text text={label} size='size_m' />
				{input}
			</HStack>
		);
	}

	return input;
});

const InputAsync = (props: InputBeautyProps) => {
	const { isLoaded, Input } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Input {...props} />;
};

export const InputBeauty = (props: InputBeautyProps) => {
	return (
		<BeautySharedProvider>
			<InputAsync {...props} />
		</BeautySharedProvider>
	);
};
