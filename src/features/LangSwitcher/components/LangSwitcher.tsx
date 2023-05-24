import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/components/Button/Button';

interface LangSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
	const { className, short } = props;
	const { t, i18n } = useTranslation();

	const langToggle = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button className={classNames('', {}, [className])} variant='clear' onClick={langToggle}>
			{short ? t('Короткий язык') : t('Язык')}
		</Button>
	);
});
