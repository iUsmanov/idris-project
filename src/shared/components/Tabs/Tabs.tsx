import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { TabsBeautyProps, TabsBeauty } from './Beauty/Tabs';
import { TabsMatrixProps, TabsMatrix, typedMemo } from './Matrix/Tabs';

export type TabsProps<T extends string> = TabsMatrixProps<T> | TabsBeautyProps;
export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<TabsBeauty {...(props as TabsBeautyProps)} />}
			off={<TabsMatrix {...(props as TabsMatrixProps<T>)} />}
		/>
	);
});
