## Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest
2. Тесты на компоненты с React testing library
3. Скриншотное тестирование с loki
4. e2e тестирование с Cypress - E2E пока не работает!!!

О том, как запускать те или иные тесты смотрите в разделе [Скрипты](docs/scripts.md)

Для тестирования используются следующие технологии:

-  Jest - юнит-тестирование и интеграционное тестирование
-  Loki - снимает скриншоты со стори-кейсов (Loki нуждается также в `Storybook`)
-  Cypress - E2E-тесты. E2E пока не работает!!!

### Jest

C использование `jest` написаны тесты на React-компоненты, роутинг, всякие хелперы и т.д.

-  Конфигурация Jest вот [здесь](/config/jest/jest.config.ts)
-  Вспомогательный файл - [setupTests.ts](/config/jest/setupTests.ts)
-  React-компонент, которым будут заменяться SVG-изображения в тестах -
   [setupTests.ts](/config/jest/jestEmptyComponent.tsx)

Двумя важными хелперами для тестирования являются [componentRender.tsx](/src/shared/lib/tests/componentRender/componentRender.tsx)
и [TestAsyncThunk.ts](/src/shared/lib/tests/TestAsyncThunk/TestAsyncThunk.ts)

#### componentRender

componentRender - это обёртка над тестируемым компонентом.
Она оборачивает компонент в:

-  StoreProvider. Так мы мокаем redux-состояние, редюсеры.
-  I18nextProvider, куда мы передаём наш заготовленный конфиг.
-  Роутер. Обеспечивает маршрутизацию. Компонент рендерится
   не в каком-то воображаемом месте, а на определённой странице.
-  act(async () => {}), если передана соответствующий параметр - `wrapInAct`.

#### TestAsyncThunk

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

---

---

### Скриншотное тестирование

С использование Loki происходит скриншотное тестирование.

Мы можем запустить скриншотное тестирование либо в dev-режиме, либо в prod-режиме.

В dev-режиме скриншотное тестирование обычно запускается локально.
При запуске скриншотного тестирования в dev-режиме делаем следующее:

1. Запускаем сторибук в dev-режиме - скрипт `npm run storybook`.
2. Запускаем Loki - скрипт `npm run test:ui`

---

В prod-режиме скриншотное тестирование обычно запускается удалённо.
При запуске скриншотного тестирования в prod-режиме делаем следующее:

1. Запускаем сторибук в prod-режиме - скрипт `npm run storybook:build`.
2. Запускаем Loki - скрипт `npm run test:ui:ci`

Затем тестирование закончится. Если тестирование не выявило несовпадений между предыдущим
запуском UI-тестов и нынешним, то всё ок.

Если же есть разница, то мы запускаем [скрипт](/scripts/generate-visual-json-report.js)
командой `npm run test:ui:report`. Затем у нас сгенерируется репорт в [этой](/reports/) или в [этой](/.loki) папке.
Открываем репорт и смотрим на разницу. Если нас не устраивают изменения - то тогда смотрим, где мы
напортачили, исправляем и снова запускаем тестирование. Если же нас всё устраивает, то тогда
применяем изменения запуском скрипта - `npm run test:ui:ok`.

Скрипт `npm run test:ui:update` используется после самого первого прогона ui-тестов.
Также напоминаю, что все скрипты описаны [здесь](/docs/scripts.md).
