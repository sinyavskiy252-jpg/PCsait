# Локальный деплой PCFORGE

## Состав
- `docker-compose.yml` — сборка и запуск контейнера.
- `nginx/nginx.conf` — HTTP → HTTPS, TLS и SPA-маршрутизация.
- `certs/` — локальные сертификаты mkcert (не коммитить).
- `screenshots/` — скриншоты выполнения практической работы.

## Схема
```text
Браузер
  | HTTP :80 → редирект
  | HTTPS :443
  v
Docker Compose
  v
Nginx :8443
  v
Статические файлы Vite (dist)
  |
  +---- Firebase Authentication / Firestore (облако)
```

## Переменные окружения
Файл `.env` создаётся копированием `.env.example`. Значения VITE_FIREBASE_* передаются в Docker build и используются Vite при сборке клиентского приложения.

## Команды
```powershell
Copy-Item .env.example .env
New-Item -ItemType Directory -Force deploy/certs
mkcert -install
mkcert -cert-file deploy/certs/pcforge.localhost.pem -key-file deploy/certs/pcforge.localhost-key.pem pcforge.localhost
docker compose --env-file .env -f deploy/docker-compose.yml up --build -d
docker compose --env-file .env -f deploy/docker-compose.yml ps
docker compose --env-file .env -f deploy/docker-compose.yml down
```

Перед запуском добавь `pcforge.localhost` в Authorized domains Firebase Authentication.

## Снимки для отчёта
Сохрани сюда скриншоты Docker Compose, сайта по HTTPS, вкладки Network, Docker Desktop и GitHub Actions.

Не помещай в репозиторий `.env`, закрытые ключи и сертификаты. Firebase работает как внешний облачный сервис, поэтому отдельный контейнер Firebase не создаётся.
