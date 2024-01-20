## Работа с feature-flags

Перед тем, как идти дальше почитайте про _feature flags_.

Когда мы просто используем _feature flags_ в проекте, то возникает такая проблема, что
эти _feature flags_ прорастают в код слишком глубоко и после того, как мы окончательно решили
избавиться от старого или нового кода, то удаление ненужного кода занимает слишком много времени.
Поэтому, чтобы мы могли не нужный код удалить автоматически(запуском скрипта) мы будем использовать
специальные хелперы.

Так, разрешено использование _feature flags_ в коде только с помощью хелпера
[toggleFeatures](/src/shared/lib/featureFlags/lib/toggleFeatures.ts)
и компонента [ToggleFeatures](/src/shared/lib/featureFlags/components/ToggleFeatures/ToggleFeatures.tsx),
которые принимают следующие параметры:

1. `name`: название фича-флага,
2. `on`: функция, которая отработает если фича включена
3. `off`: функция, которая отработает если фича выключена

---

Например у нас есть такой код:

```typescript jsx
export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');

	const sum = toggleFeatures({
		name: 'isCounterEnabled',
		on: () => 1 + 1,
		off: () => 2 + 2,
	});

	toggleFeatures({
		name: 'isCounterEnabled',
		on: () => console.log('FEATURE isCounterEnabled is toggled ON'),
		off: () => console.log('FEATURE isCounterEnabled is toggled OFF'),
	});

	return (
		<>
			<ToggleFeatures
				name='isCounterEnabled'
				on={<Counter />}
				off={<Card max>{t('Счётчик скоро появится!')}</Card>}
			/>
			<ArticleRecommendations />
			<ArticleCommentsList />
		</>
	);
});
```

И вот так мы разрабатываем приложение, и в какой-то момент мы хотим вообще убрать старый код фичи `isCounterEnabled`,
то есть код, который заключен в свойство `off`. Тогда, для автоматического удаления старого кода,
у нас есть скрипт [remove-feature.ts](/scripts/refactoring/removeFeatureFlag/removeFeatureFlag.ts).

При запуске мы передаём первым аргументом - название фичи(в нашем случае - isCounterEnabled), а вторым - на какое
состояние мы переключаем данную фичу - `on` или `off` (в нашем случае, мы хотим удалить
старый код поэтому выбираем `on`).

Вот так можно запустить этот скрипт - `npm run remove-feature isCounterEnabled on`.

Теперь, вот что у нас останется:

```typescript jsx
export const ArticleDetailsPage = memo(() => {
	const { t } = useTranslation('article-details');

	const sum = 1 + 1;

	console.log('FEATURE isCounterEnabled is toggled ON');

	return (
		<>
			<Counter />
			<ArticleRecommendations />
			<ArticleCommentsList />
		</>
	);
});
```

После прогона, обязательно вручную через редактор кода ищем текст в файлах 'DELETE ME!'
и если такой текст найден, то удаляем его.

Теперь независимо от состояния фичи `isCounterEnabled` пользователя - `on` или `off` - для всех код будет одинаковым.
То есть, данные хелперы нужны исключительно для удобства. Нам не нужно руками убирать весь
старый или новый код.
