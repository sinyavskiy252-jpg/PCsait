# PCFORGE

Учебный сайт-конфигуратор персонального компьютера. Стек приложения: React, TypeScript, Vite, Tailwind CSS, Firebase Authentication и Cloud Firestore.

## Что входит в проект

- каталог комплектующих с поиском и фильтрами;
- выбор деталей и расчёт стоимости сборки;
- готовые конфигурации;
- регистрация и вход через Firebase Authentication;
- сохранение сборок в Firestore;
- адаптивный интерфейс;
- Docker / Docker Compose;
- GitHub Actions для проверки при push и Pull Request;
- базовые SEO-настройки: метатеги, `robots.txt`, `sitemap.xml`.

## Запуск локально

Требуется Node.js 22+.

```bash
npm install
npm run dev
```

## Проверка перед Pull Request

```bash
npm run lint
npm run build
docker compose up --build
```

После запуска Docker сайт будет доступен по адресу http://localhost:8080.

## Git workflow

1. Не коммить напрямую в `main`.
2. Создавай отдельную ветку для задачи, например `feature/seo-improvements`.
3. Перед PR запускай lint и build локально.
4. Открой Pull Request в `main` и дождись GitHub Actions.
5. Просмотри diff и результаты проверок, затем выполняй merge.

## GitHub Actions

Workflow находится в `.github/workflows/ci.yml`. При наличии исходников приложения он выполняет установку зависимостей, ESLint, production build и сборку Docker-образа. Пока `package.json` не добавлен в репозиторий, workflow явно отмечает, что сборка пропущена: это временная проверка инфраструктурного PR, а не подтверждение сборки приложения.

## Docker

```bash
docker compose up --build
docker compose down
```

## Firebase и безопасность

Firebase Web SDK config предназначен для клиентского приложения. Безопасность данных обеспечивается Authentication и Firestore Security Rules. Не добавляй в GitHub service-account JSON, приватные ключи, пароли или локальный файл `.env`. Пример переменных хранится в `.env.example`.

## SEO перед публикацией

Перед публикацией замени домен-заглушку в `public/robots.txt` и `public/sitemap.xml` на фактический адрес сайта. Не указывай localhost или выдуманный домен в sitemap/canonical. Для полноценной индексации отдельных экранов React SPA могут понадобиться отдельные URL и предварительный рендеринг.

## Важно

Этот PR настраивает GitHub, Docker и CI. Чтобы CI проверял приложение, необходимо добавить в репозиторий исходный проект из подготовленного ZIP-архива, включая `package.json`, `src/` и `public/images/`. Не добавляй `node_modules/`, `dist/` или секретные файлы.
