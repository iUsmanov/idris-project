### TestAsyncThunk

TestAsyncThunk похож на componentRender, но служит для тестирования не React-компонента,
а АсинкСанков(`AsyncThunk`).

Первым аргументом туда передаётся `AsyncThunk`, а вторым моковый редакс-стейт.
Внутри себя он мокает `dispatch`, `getState`, `axios`. Метод `callThunk` класса `TestAsyncThunk` вызывает переданный
`AsyncThunk`. Этот вызов возвращает нам `AsyncThunkAction`. Затем мы вызываем и
этот `AsyncThunkAction`. И этот вызов возвращает нам `action`.

Теперь мы можем описать ожидания для полученного `action`.

Пример теста:

```typescript jsx
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateFeatureFlags } from './updateFeatureFlags';
import { FeatureFlags } from '@/shared/lib/featureFlags';
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
		const action = await thunk.callThunk({ userId: '1', newFeaturesFlags: { isBeautyDesign: true } });

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(updateFeatureFlagsMutation).toHaveBeenCalled();
		expect(action.payload).toEqual(undefined);
		expect(action.meta.requestStatus).toEqual('fulfilled');
	});
});
```
