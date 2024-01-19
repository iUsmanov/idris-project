### Внимание! Документация не написана полностью.

---

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev:webpack или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

### Сборка

-  `npm run start` - Запуск frontend проекта на webpack dev server
-  `npm run start:vite` - Запуск frontend проекта на vite
-  `npm run start:dev:webpack` - Запуск frontend проекта на webpack dev server + backend
-  `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
-  `npm run start:server` - Запуск backend сервера
-  `npm run build:prod` - Сборка в prod режиме
-  `npm run build:dev` - Сборка в dev режиме (не минимизирован)
-  `npm run build:prod:analyze` - Сборка в prod режиме c bundle-analyzer
-  `npm run build:dev:analyze` - Сборка в dev режиме (не минимизирован) c bundle-analyzer

### Форматирование кода

-  `npm run lint:ts` - Проверка ts файлов линтером
-  `npm run lint:ts:fix` - Исправление ts файлов линтером
-  `npm run lint:style` - Проверка scss файлов style линтером
-  `npm run lint:style:fix` - Исправление scss файлов style линтером
-  `npm run pret` - Проверка файлов преттиером
-  `npm run pret:fix` - Исправление файлов преттиером

### Тесты

-  `npm run test:unit` - Запуск unit тестов с jest
-  `npm run test:ui` - Запуск скриншотных тестов с loki
-  `npm run test:ui:ci` - Запуск скриншотных тестов в CI
-  `npm run test:ui:ok` - Подтверждение новых скриншотов
-  `npm run test:ui:update` - Используется при первом прогоне ui-тестов
-  `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
-  `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
-  `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
-  `npm run test:e2e` - !Запуск E2E-тестов, однако e2e-тесты не реализованы

### Сторибук

-  `npm run storybook` - запуск Storybook
-  `npm run storybook:build` - Сборка storybook билда

### Другое

-  `npm run generate:slice` - Скрипт для генерации FSD слайсов
-  `npm run remove-feature` - Удалить фичу по фича-флагу
-  `npm run prepare` - Ручной прогон прекоммит хуков
-  `npm run postinstall` - Удаление кеша после установки npm-пакета

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`
4. e2e тестирование с Cypress `npm run test:e2e` - E2E пока не работает!!!

---

## Линтинг

В проекте используются следующие технологии для слежения за качеством кода:

`Eslint` – анализ и исправление кода

`Prettier` - форматирование ts-кода

`Stylelint` - форматирование css(scss)-кода

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin `fsd-paths-guard`, который содержит 3 правила:

1. `relative-path-checker` - запрещает использовать абсолютные импорты в рамках одного модуля
2. `hierarchy-imports-between-layers` - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3. `public-api-imports` - разрешает импорт из других модулей только из public api. Имеет auto fix

Ссылка на репозиторий плагина - https://github.com/iUsmanov/eslint-plugin

---

## Storybook

Подробнее о [Storybook](/config/storybook/storybook.md)

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - [./config/webpack](./config/webpack/)
2. Vite - [vite.config.ts](/vite.config.ts)

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

-  [/config/babel](/config/babel) - babel
-  [/config/webpack](./config/webpack/)- конфигурация webpack
-  [/config/jest](/config/jest) - конфигурация тестовой среды
-  [/config/storybook](/config/storybook) - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в [/.github/workflows](/.github/workflows).
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в [./.husky](./.husky)

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts), а также [Axios](/src/shared/api/api.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется хук
[useDynamicModule](/src/shared/lib/hooks/useDynamicModule/useDynamicModule.ts)

---

### Работа с feature-flag

Разрешено использование _feature flags_ только с помощью хелпера [toggleFeatures](/src/shared/lib/featureFlags/lib/toggleFeatures.ts)
и компонента [ToggleFeatures](/src/shared/lib/featureFlags/components/ToggleFeatures/ToggleFeatures.tsx),
которые принимают следующие параметры:

1. name: название фича-флага,
2. on: функция, которая отработает после Включения фичи
3. of: функция, которая отработает после Выключения фичи

Для автоматического удаления фичи использовать скрипт `remove-feature.ts`,
который принимает 2 аргумента

1. Название удаляемого фича-флага
2. Состояние (on\off)

---

## Страницы (pages)

-  [AboutPage](/src/pages/AboutPage)
-  [AdminPanelPage](/src/pages/AdminPanelPage)
-  [AdminPanelPage](/src/pages/AdminPanelPage)
-  [ArticleDetailsPage](/src/pages/ArticleDetailsPage)
-  [ArticleEditPage](/src/pages/ArticleEditPage)
-  [ArticlesPage](/src/pages/ArticlesPage)
-  [ForbiddenPage](/src/pages/ForbiddenPage)
-  [MainPage](/src/pages/MainPage)
-  [NotFoundPage](/src/pages/NotFoundPage)
-  [ProfilePage](/src/pages/ProfilePage)
-  [settingsPage](/src/pages/settingsPage)

## Виджеты (widgets)

-  [articlesInfiniteList](/src/pages/articlesInfiniteList)
-  [Navbar](/src/pages/Navbar)
-  [Page](/src/pages/Page)
-  [PageError](/src/pages/PageError)
-  [PageLoader](/src/pages/PageLoader)
-  [scrollToolbar](/src/pages/scrollToolbar)
-  [Sidebar](/src/pages/Sidebar)

## Фичи (features)

-  [ArticleCommentsList](/src/features/ArticleCommentsList)
-  [ArticleDetailsHeader](/src/features/ArticleDetailsHeader)
-  [articleRating](/src/features/articleRating)
-  [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
-  [articlesPageGreeting](/src/features/articlesPageGreeting)
-  [ArticlesSearch](/src/features/ArticlesSearch)
-  [ArticlesSort](/src/features/ArticlesSort)
-  [ArticlesSort](/src/features/ArticlesSort)
-  [ArticleTypeTabs](/src/features/ArticleTypeTabs)
-  [ArticleViewSelector](/src/features/ArticleViewSelector)
-  [AuthByUsername](/src/features/AuthByUsername)
-  [avatarDropdown](/src/features/avatarDropdown)
-  [EditableProfileCard](/src/features/EditableProfileCard)
-  [LangSwitcher](/src/features/LangSwitcher)
-  [notificationsPopup](/src/features/notificationsPopup)
-  [scrollToTopButton](/src/features/scrollToTopButton)
-  [ThemeSwitcher](/src/features/ThemeSwitcher)
-  [UIDesignSwitcher](/src/features/UIDesignSwitcher)

## Сущности (entities)

-  [AddNewComment](/src/entities/AddNewComment)
-  [Article](/src/entities/Article)
-  [Comment](/src/entities/Comment)
-  [Counter](/src/entities/Counter)
-  [Country](/src/entities/Country)
-  [Currency](/src/entities/Currency)
-  [Notification](/src/entities/Notification)
-  [Profile](/src/entities/Profile)
-  [Rating](/src/entities/Rating)
-  [User](/src/entities/User)
