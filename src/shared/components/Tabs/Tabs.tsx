import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { TabsBeautyProps, TabsBeauty } from './Beauty/Tabs';
import { TabsMatrixProps, TabsMatrix } from './Matrix/Tabs';
import { typedMemo } from '@/shared/lib/helpers/typedMemo/typedMemo';

export type TabsProps<T extends string> = TabsMatrixProps<T> | TabsBeautyProps<T>;
export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<TabsBeauty {...(props as TabsBeautyProps<T>)} />}
			off={<TabsMatrix {...(props as TabsMatrixProps<T>)} />}
		/>
	);
});
