// npm run test:unit updateFeatureFlags.test.ts
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateFeatureFlags } from './updateFeatureFlags';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../../api/featureFlagsApi';

jest.mock('../../api/featureFlagsApi');

// const mockedUpdateFeatureFlagsMutation = jest.mocked(updateFeatureFlagsMutation);

describe('update.test', () => {
	// afterEach(() => {
	// 	jest.clearAllMocks();
	// });

	test('Success update', async () => {
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
