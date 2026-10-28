# PCFORGE

Учебный сайт-конфигуратор компьютера. Стек: React, TypeScript, Vite, Tailwind CSS, Firebase Authentication и Cloud Firestore.

## Возможности

- каталог комплектующих с поиском и фильтрацией по категориям;
- добавление комплектующих в конфигурацию и подсчёт стоимости;
- готовые варианты сборок;
- регистрация, вход и выход через Firebase Authentication;
- сохранение сборок пользователя в Cloud Firestore;
- адаптивная тёмная тема с красными акцентами.

## Запуск на компьютере

Требуется Node.js 22 или новее.

```bash
npm install
npm run dev
```

Открой URL, который появится в терминале (обычно `http://localhost:5173`).

## Проверки

```bash
npm run lint
npm run build
npm run preview
```

## Docker

Требуется Docker Desktop.

```bash
docker compose up --build
```

Сайт будет доступен на `http://localhost:8080`. Остановить контейнер: `docker compose down`.

## Firebase

Клиентская конфигурация находится в `src/firebase.ts`. Включи Email/Password в Firebase Console → Authentication → Sign-in method. Firestore rules в `firestore.rules` разрешают пользователю работать только со своей коллекцией `users/{userId}/builds`. Примени эти правила в Firebase Console перед публикацией.

Конфигурация Firebase для веб-приложения не является административным ключом. Не добавляй в репозиторий service-account JSON, приватные ключи или другие серверные секреты. Безопасность данных обеспечивают Authentication и Firestore Security Rules.

## GitHub Actions

Workflow `.github/workflows/ci.yml` запускается при push и Pull Request в `main`. Он устанавливает зависимости, выполняет ESLint, собирает приложение и проверяет сборку Docker-образа.

## SEO по методичке

- у документа задан язык `ru`, viewport, title, description, robots и Open Graph метаданные;
- title и description меняются при переключении раздела;
- используется семантическая структура `header`, `nav`, `main`, `section`, `article`, `footer` и заголовки;
- у изображений есть `alt`, для карточек используется lazy loading;
- добавлены `public/robots.txt` и `public/sitemap.xml`;
- Nginx включает кэширование статических ресурсов и SPA fallback.

**Перед публикацией:** замени `https://example.com` в `public/robots.txt` и `public/sitemap.xml` на фактический адрес сайта. Сейчас разделы приложения переключаются внутри SPA и не имеют отдельных URL. Метаданные обновляются на клиенте, но для более полной индексации отдельных страниц стоит добавить маршрутизацию с отдельными URL и предварительный рендеринг/SSR. SEO-настройки не гарантируют позиции в поиске сами по себе.

## Структура

```text
public/
  images/                 изображения комплектующих
  robots.txt
  sitemap.xml
src/
  components/ProductGrid.tsx
  data/parts.ts
  types/part.ts
  App.tsx                  состояние и основные экраны
  firebase.ts              подключение Firebase
  main.tsx                 точка входа
  styles.css
eslint.config.js
.github/workflows/ci.yml
Dockerfile
compose.yaml
nginx.conf
firestore.rules
```
