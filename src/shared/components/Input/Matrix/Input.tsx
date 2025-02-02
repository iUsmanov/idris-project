import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import {
	ChangeEvent,
	InputHTMLAttributes,
	SyntheticEvent,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { HStack } from '@/shared/components/Stack';
import { TestProps } from '@/shared/types/tests';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

export interface InputMatrixProps extends HTMLInputProps, TestProps {
	className?: string;
	placeholder?: string;
	type?: string;
	value?: string | number;
	onChange?: (value: string, name?: string) => void;
	autoFocus?: boolean;
	readOnly?: boolean;
	name?: string;
}

export const Input = memo((props: InputMatrixProps) => {
	const {
		className,
		placeholder,
		type = 'text',
		value = '',
		onChange,
		autoFocus,
		readOnly,
		name,
		['data-testid']: dataTestId = 'Input',
		...otherProps
	} = props;
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [caretPosition, setCaretPosition] = useState<number>(0);
	const ref = useRef<HTMLInputElement>(null);

	const isCaretVisible = isFocused && !readOnly;

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

	const onSelect = (event: SyntheticEvent<HTMLInputElement, Event>) => {
		setCaretPosition(event.currentTarget.selectionStart || 0);
	};

	useEffect(() => {
		if (autoFocus) {
			onFocus();
			setTimeout(() => {
				ref.current?.focus();
			}, 30);
		}
	}, [autoFocus]);

	return (
		<HStack
			className={classNames(cls.componentWrapper, { [cls.readonly]: readOnly }, [className])}
			data-testid={'componentWrapper'}
		>
			{placeholder && (
				<div className={cls.placeholder} data-testid={'placeholder'}>{`${placeholder}>`}</div>
			)}
			<div className={cls.caretAndInputWrapper}>
				<input
					{...otherProps}
					data-testid={dataTestId}
					ref={ref}
					type={type}
					className={cls.input}
					value={value}
					onChange={changeHandler}
					onSelect={onSelect}
					onFocus={onFocus}
					onBlur={onBlur}
					autoFocus={autoFocus}
					readOnly={readOnly}
				/>
				{isCaretVisible && (
					<span
						className={cls.caret}
						style={{ left: `${caretPosition * 9}px` }}
						data-testid={'caret'}
					/>
				)}
			</div>
		</HStack>
	);
});

const InputAsync = (props: InputMatrixProps) => {
	const { isLoaded, Input } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Input {...props} />;
};

export const InputMatrix = (props: InputMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<InputAsync {...props} />
		</MatrixSharedProvider>
	);
};
