## CI/CD и pre commit хуки

В прекоммит хуках проверяем проект линтерами, преттиером, конфиг в [./.husky](/.husky)

`CI` реализован с помощью _github actions_, а `CD` с помощью _[netlify](https://www.netlify.com/)_.

Конфигурация github actions находится в [/.github/workflows](/.github/workflows).
В ci прогоняются все виды тестов(кроме e2e), происходит сборка проекта и сторибука, линтинг.

После прогонона CI у нас в Github Pages есть страница с отчётами, в которой можно
посмотреть почему те или иные тесты провалились. Вот эта страница - https://iusmanov.github.io/idris-project/
