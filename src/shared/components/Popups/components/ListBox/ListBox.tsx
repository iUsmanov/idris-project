import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ListBoxBeautyProps, ListBoxBeauty } from './Beauty/ListBox';
import { ListBoxMatrixProps, ListBoxMatrix } from './Matrix/ListBox';
import { typedMemo } from '@/shared/lib/helpers/typedMemo/typedMemo';

export type ListBoxProps<T extends string> = ListBoxMatrixProps | ListBoxBeautyProps<T>;
export const ListBox = typedMemo(<T extends string>(props: ListBoxProps<T>) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ListBoxBeauty {...(props as ListBoxBeautyProps<T>)} />}
			off={<ListBoxMatrix {...(props as ListBoxMatrixProps)} />}
		/>
	);
});
