// #i18next
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/components/Button';

interface LangSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
	const { className, short } = props;
	const { t, i18n } = useTranslation();

	const langToggle = () => {
		switch (i18n.language) {
			case 'ru':
				i18n.changeLanguage('en');
				document.documentElement.setAttribute('lang', 'en');
				break;
			case 'en':
				i18n.changeLanguage('ru');
				document.documentElement.setAttribute('lang', 'ru');
				break;
			default:
				i18n.changeLanguage('ru');
				document.documentElement.setAttribute('lang', 'ru');
		}
	};

	return (
		<Button className={classNames('', {}, [className])} variant='clear' onClick={langToggle}>
			{short ? t('Короткий язык') : t('Язык')}
		</Button>
	);
});
