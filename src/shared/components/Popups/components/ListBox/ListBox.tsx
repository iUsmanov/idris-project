import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ListBoxBeautyProps, ListBoxBeauty } from './Beauty/ListBox';
import { ListBoxMatrixProps, ListBoxMatrix } from './Matrix/ListBox';

export type ListBoxProps = ListBoxMatrixProps | ListBoxBeautyProps;
export const ListBox = memo((props: ListBoxProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ListBoxBeauty {...(props as ListBoxBeautyProps)} />}
			off={<ListBoxMatrix {...(props as ListBoxMatrixProps)} />}
		/>
	);
});
