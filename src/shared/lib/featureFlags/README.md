### Работа с feature-flag

Разрешено использование _feature flags_ только с помощью хелпера [toggleFeatures](/src/shared/lib/featureFlags/lib/toggleFeatures.ts)
и компонента [ToggleFeatures](/src/shared/lib/featureFlags/components/ToggleFeatures/ToggleFeatures.tsx),
которые принимают следующие параметры:

1. name: название фича-флага,
2. on: функция, которая отработает после Включения фичи
3. of: функция, которая отработает после Выключения фичи

Для автоматического удаления фичи использовать скрипт [remove-feature.ts](/scripts/refactoring/removeFeatureFlag/removeFeatureFlag.ts),
