import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import { Icon } from '../../Icon';
import { TestProps } from '@/shared/types/tests';

export interface CodeBeautyProps extends TestProps {
	className?: string;
	text: string;
}

export const Code = memo((props: CodeBeautyProps) => {
	const { className, ['data-testid']: dataTestId = 'Code', text } = props;

	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
	}, [text]);

	return (
		<div className={cls.code} data-testid={dataTestId}>
			<pre className={classNames(cls.pre, {}, [className])}>
				<Icon Svg={CopyIcon} clickable className={cls.icon} onClick={onCopy} />
				<code>{text}</code>
			</pre>
		</div>
	);
});

const CodeAsync = (props: CodeBeautyProps) => {
	const { isLoaded, Code } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Code {...props} />;
};

export const CodeBeauty = (props: CodeBeautyProps) => {
	return (
		<BeautySharedProvider>
			<CodeAsync {...props} />
		</BeautySharedProvider>
	);
};
