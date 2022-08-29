# О проекте
Это проект - очередной ToDo App, чтобы поработать с TypeScript и Redux Toolkit.

## О сборке
"Чистая" и "минимальная" сборка Webpack + TypeScript + React, основные инструменты:
- [TypeScript](https://www.typescriptlang.org/docs/),
- [Webpack](https://webpack.js.org/guides/getting-started/),
- [Babel](https://babeljs.io/setup),
- [React](https://ru.react.js.org/docs/getting-started.html),
- [Axios](https://axios-http.com/docs/intro),
- [Jest](https://jestjs.io/docs/getting-started),
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

Для соблюдения чистоты кода используются ESLint и Prettier.

Переменные окружения берутся из файла .ENV (использован dotenv-webpack).

## Основные скрипты (yarn или npm ...)
- build - production сборка в dist
- build-n - production сборка с предварительным созданием файла .env на Netlify
- lint - eslint, только ошибки
- fix - eslint, исправление ошибок
- start - запуск дев-сервера, порт 3000
- test - запуск тестов (Jest + RTL)
- test-c - запуск тестов + coverage + summary

## Деплой
### Netlify
Для деплоя на сервисе создан файл редиректов (для роутера, если он будет) и скрипт, собирающий переменные окружения в файл.
