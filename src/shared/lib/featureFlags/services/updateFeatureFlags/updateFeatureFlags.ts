// #featureFlags
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '../../model/types/featureFlags';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFeatureFlagsMutation } from '../../api/featureFlagsApi';
import { getAllFeatureFlags } from '../../lib/setGetFeatures';
import { LOCAL_STORAGE_APP_DESIGN_KEY } from '@/shared/const/localStorage';

interface UpdateFeatureFlagsOptions {
	userId: string;
	newFeaturesFlags: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<any, UpdateFeatureFlagsOptions, ThunkConfig<string>>(
	'features/updateFeatureFlags',
	async (args, thunkApi) => {
		const { newFeaturesFlags, userId } = args;
		const { rejectWithValue, dispatch } = thunkApi;

		try {
			const response = await dispatch(
				updateFeatureFlagsMutation({
					userId,
					features: {
						...getAllFeatureFlags(),
						...newFeaturesFlags,
					},
				})
			);

			localStorage.setItem(
				LOCAL_STORAGE_APP_DESIGN_KEY,
				newFeaturesFlags.isBeautyDesign ? 'beauty-design' : 'matrix-design'
			);

			window.location.reload();

			return response;

			// setFeatureFlags({
			// 	...getAllFeatureFlags(),
			// 	...newFeaturesFlags,
			// });
		} catch (e) {
			return rejectWithValue('error');
		}
	}
);
