# Articles App

## Краткое описание

Данный проект представляет собой платформу, на которой можно искать, фильтровать, читать статьи.
Можно регистрироваться, ставить отзывы на статьи. Проект сделан согласно архитектурной методологии
_Feature-sliced-design_. Есть возможность авторизации, доступ по ролям.
Есть, естественно, UI-кит и есть многое другое.

#### Только авторизовавшись вы можете полноценно посмотреть проект.

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

---

Готовый билд проекта - https://imaginative-twilight-6d058f.netlify.app/. Однако из запросов на сервер тут работать будут только
GET-запросы, остальные запросы будут выдавать ошибку. Поэтому, например, изменить профиль у вас не получится.
Так что лучше проект установить и запустить локально.

---

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev:webpack или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Ключевые разделы

-  [Как войти?](/docs/authentication.md)
-  [Скрипты](/docs/scripts.md)
-  [Качество кода](/docs/codeQuality.md)
-  [Storybook](/config/storybook/storybook.md)
-  [Конфигурация проекта](/docs/config.md)
-  [Feature-flags](/src/shared/lib/featureFlags/README.md)
-  [Архитектура проекта](https://feature-sliced.design/docs/get-started/tutorial)
-  [Интернационализация](docs/i18n.md)
-  [Тесты](docs/tests.md)
-  [Стейт-менеджмент](/src/app/providers/StoreProvider/README.md)
-  [CI/CD](/docs/cicd.md)

---

---

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

-  [articlesInfiniteList](/src/widgets/articlesInfiniteList)
-  [Navbar](/src/widgets/Navbar)
-  [PageMainContent](/src/widgets/PageMainContent)
-  [PageError](/src/widgets/PageError)
-  [PageLoader](/src/widgets/PageLoader)
-  [scrollToolbar](/src/widgets/scrollToolbar)
-  [Sidebar](/src/widgets/Sidebar)

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
