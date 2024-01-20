// npm run test:unit updateFeatureFlags.test.ts
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateFeatureFlags } from './updateFeatureFlags';
import { FeatureFlags } from '../../model/types/featureFlags';
import { updateFeatureFlagsMutation } from '../../api/featureFlagsApi';

jest.mock('../../api/featureFlagsApi');

describe('update.test', () => {
	test('Success update', async () => {
		// This Async-thunk returns undefined
		const data: FeatureFlags = {};
		const thunk = new TestAsyncThunk(updateFeatureFlags, {
			user: {
				authData: {
					features: data,
				},
			},
		});
		// mockedUpdateFeatureFlagsMutation.mockResolvedValue({ data: data });
		const action = await thunk.callThunk({ userId: '1', newFeaturesFlags: { isBeautyDesign: true } });

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(updateFeatureFlagsMutation).toHaveBeenCalled();
		// expect(action.payload).toEqual(data);
		expect(action.payload).toEqual(undefined);
		expect(action.meta.requestStatus).toEqual('fulfilled');
	});
	// Случай с ошибкой не может быть протестирован, так как ошибки быть не может
});
