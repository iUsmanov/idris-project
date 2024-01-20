## CI/CD и pre commit хуки

`CI` реализован с помощью _github actions_, а `CD` с помощью _[netlify](https://www.netlify.com/)_.

Конфигурация github actions находится в [/.github/workflows](/.github/workflows).
В ci прогоняются все виды тестов, происходит сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, преттиером, конфиг в [./.husky](/.husky)
