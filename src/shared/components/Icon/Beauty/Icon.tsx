import { memo, Ref } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { TestProps } from '@/shared/types/tests';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBeautyBaseProps extends SvgProps {
	className?: string;
	Svg: React.FC<React.SVGProps<SVGSVGElement>>;
	ref?: Ref<SVGSVGElement>;
}

interface NonClickableIconBeautyProps extends IconBeautyBaseProps {
	clickable?: false;
}

interface ClickableIconBeautyProps extends IconBeautyBaseProps, TestProps {
	clickable: true;
	onClick: () => void;
}

export type IconBeautyProps = NonClickableIconBeautyProps | ClickableIconBeautyProps;

export const Icon = memo((props: IconBeautyProps) => {
	const { className, Svg, ref, width = 32, height = 32, clickable, ...otherProps } = props;

	const icon = (
		<Svg
			ref={ref}
			{...otherProps}
			width={width}
			height={height}
			className={classNames(cls.icon, {}, [className])}
			onClick={undefined}
		/>
	);

	if (clickable) {
		return (
			<button
				type='button'
				className={cls.button}
				onClick={props.onClick}
				style={{ width, height }}
				data-testid={props['data-testid']}
			>
				{icon}
			</button>
		);
	}

	return icon;
});

// export type TypeOfIcon = typeof Icon;

const IconAsync = (props: IconBeautyProps) => {
	const { isLoaded, Icon } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Icon {...props} />;
};

export const IconBeauty = (props: IconBeautyProps) => {
	return (
		<BeautySharedProvider>
			<IconAsync {...props} />
		</BeautySharedProvider>
	);
};
