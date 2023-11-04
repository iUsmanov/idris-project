// #featureFlags
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFeatureFlagsMutation } from '../../api/featureFlagsApi';
import { getAllFeatureFlags } from '../../lib/setGetFeatures';

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

			return response;

			// setFeatureFlags({
			// 	...getAllFeatureFlags(),
			// 	...newFeaturesFlags,
			// });

			// window.location.reload();
		} catch (e) {
			return rejectWithValue('error');
		}
	}
);
