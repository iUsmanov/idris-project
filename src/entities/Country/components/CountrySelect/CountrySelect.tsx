import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select } from '@/shared/components/Select/Select';
import { Country } from '../../model/types/country';
import { ListBox } from '@/shared/components/ListBox/ListBox';

interface CountrySelectProps {
	className?: string;
	value?: string;
	onChange?: (value: Country) => void;
	disabled?: boolean;
}

const options = Object.entries(Country).map((arr) => ({ value: arr[0], content: arr[1] }));

export const CountrySelect = memo((props: CountrySelectProps) => {
	const { className, disabled, onChange, value } = props;
	const { t } = useTranslation();

	const changeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Country);
		},
		[onChange]
	);

	return (
		<ListBox
			className={classNames('', {}, [className])}
			value={value}
			onChange={changeHandler}
			disabled={disabled}
			options={options}
			label={t('Укажите страну')}
			direction='top'
		/>
	);
});
