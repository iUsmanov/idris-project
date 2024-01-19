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

В папке `scripts` также находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.
