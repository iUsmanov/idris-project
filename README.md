# Articles App

### Краткое описание

Данный проект представляет собой платформу, на которой можно искать, фильтровать, читать статьи.
Можно регистрироваться, ставить отзывы на статьи. Проект сделан согласно архитектурной методологии
_Feature-sliced-design_. Есть возможность авторизации, доступ по ролям.

Есть 2 варианта дизайна:

-  Matrix - старый
-  Beauty - новый

Есть 3 темы -

-  Чёрная
-  Белая
-  Дополнительная(Оранжевая)

Есть 2 языка:

-  Русский
-  Английский

Для авторизации от имени _админа_ используйте:

-  Логин: `admin`
-  Пароль: `123`

Для авторизации от имени _менеджера_ используйте:

-  Логин: `manager`
-  Пароль: `123`

Для авторизации от имени _пользователя_ используйте:

-  Логин: `user`
-  Пароль: `123`

---

---

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev:webpack или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

-  [Скрипты](/docs/scripts.md)
-  [Качество кода](/docs/codeQuality.md)
-  [Storybook](/config/storybook/storybook.md)
-  [Конфигурация проекта](/docs/config.md)
-  [Feature-flags](/src/shared/lib/featureFlags/README.md)
-  [Архитектура проекта](https://feature-sliced.design/docs/get-started/tutorial)
-  [Интернационализация](docs/i18n.md)
-  [Тесты](docs/tests.md)

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
