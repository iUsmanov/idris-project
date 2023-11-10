import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import { Button } from '@/shared/components/Button';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import { TestProps } from '@/shared/types/tests';

export interface CodeMatrixProps extends TestProps {
	className?: string;
	text: string;
}

export const Code = memo((props: CodeMatrixProps) => {
	const { className, text, ['data-testid']: dataTestId = 'Code' } = props;

	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
	}, [text]);

	return (
		<div className={cls.code} data-testid={dataTestId}>
			<pre className={classNames(cls.pre, {}, [className])}>
				<Button className={cls.copyBtn} onClick={onCopy} variant='clear'>
					<CopyIcon />
				</Button>
				<code>{text}</code>
			</pre>
		</div>
	);
});

const CodeAsync = (props: CodeMatrixProps) => {
	const { isLoaded, Code } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Code {...props} />;
};

export const CodeMatrix = (props: CodeMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<CodeAsync {...props} />
		</MatrixSharedProvider>
	);
};
