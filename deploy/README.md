# Развёртывание PCFORGE

Эта папка содержит документацию и подтверждающие скриншоты по развёртыванию проекта PCFORGE.

## Где находится конфигурация развёртывания

Файлы Docker и Nginx хранятся в отдельном репозитории:
- [PCFORGE-deploy](https://github.com/sinyavskiy252-jpg/PCFORGE-deploy)

В отдельном репозитории находятся Dockerfile, Docker Compose, конфигурация Nginx, проверка GitHub Actions и локальные TLS-сертификаты. Эта папка в основном репозитории нужна для документации и скриншотов — копировать сюда второй набор Docker-файлов не требуется.

## Структура

```text
PCsait/
├── src/                  # Исходный код React + TypeScript
├── public/               # Статические файлы сайта
├── .github/workflows/    # Проверки GitHub Actions
└── deploy/
    ├── screenshots/      # Скриншоты этапов развёртывания
    └── README.md         # Эта инструкция
```

## Используемые технологии
- React и TypeScript — интерфейс сайта.
- Tailwind CSS — стилизация интерфейса.
- Firebase Authentication — регистрация и авторизация.
- Cloud Firestore — хранение данных.
- Docker и Docker Compose — сборка и запуск контейнера.
- Nginx — раздача собранного сайта и HTTPS.
- GitHub Actions — автоматическая проверка проекта.

## Запуск

Команды выполняются из общей папки, в которой рядом находятся каталоги PCsait и PCFORGE-deploy.

1. Создать локальный файл окружения:
   ```powershell
   Copy-Item PCsait/.env.example PCsait/.env
   ```
2. Заполнить PCsait/.env параметрами Firebase. Не публиковать этот файл в Git.
3. Запустить Docker Compose:
   ```powershell
   docker compose --env-file PCsait/.env -f PCFORGE-deploy/compose.yaml up --build -d
   ```
4. Открыть сайт: https://localhost:8443
5. Проверить контейнер:
   ```powershell
   docker ps
   docker logs pcforge-site
   ```
6. Остановить проект:
   ```powershell
   docker compose -f PCFORGE-deploy/compose.yaml down
   ```

Браузер может предупредить о самоподписанном сертификате. Для локальной разработки это ожидаемо.

## Скриншоты

В каталоге screenshots нужно разместить реальные снимки экрана, подтверждающие запуск и работу проекта. Список рекомендуемых снимков и их названия приведены в screenshots/README.md.

## Безопасность
- Не добавлять в Git файл .env, приватные ключи .key и закрытые сертификаты.
- Не размещать здесь пароли, токены и секреты Firebase.
- Публичные параметры Firebase Web SDK сами по себе не заменяют правила безопасности Firestore. Доступ к данным ограничивается правилами Firestore.