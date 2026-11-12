# Практическое занятие №18 — деплой PCFORGE

## Архитектура
PCFORGE — статическое React-приложение на Vite. Docker собирает сайт, Nginx отдаёт готовые файлы и перенаправляет HTTP на HTTPS. Авторизация и база данных остаются в Firebase Cloud; отдельный API-контейнер проекту не требуется.

## 1. Подготовка
Открой PowerShell в корне проекта:
```powershell
Copy-Item .env.example .env
npm install
npm run lint
npm run build
```

## 2. Локальный сертификат Windows
Установи mkcert:
```powershell
winget install FiloSottile.mkcert
```
Перезапусти терминал и проверь:
```powershell
mkcert -version
```
PowerShell от имени администратора:
```powershell
mkcert -install
```
Вернись в корень проекта и создай сертификат:
```powershell
New-Item -ItemType Directory -Force deploy/certs
mkcert -cert-file deploy/certs/pcforge.localhost.pem -key-file deploy/certs/pcforge.localhost-key.pem pcforge.localhost
```

## 3. Firebase
В Firebase Console открой Authentication → Settings → Authorized domains и добавь pcforge.localhost.

## 4. Docker Compose
Запусти Docker Desktop, дождись его готовности и из корня проекта выполни:
```powershell
docker compose --env-file .env -f deploy/docker-compose.yml up --build -d
docker compose --env-file .env -f deploy/docker-compose.yml ps
```
Открой https://pcforge.localhost. HTTP-адрес http://pcforge.localhost должен перенаправлять на HTTPS.

Остановка:
```powershell
docker compose --env-file .env -f deploy/docker-compose.yml down
```

## 5. Что проверить и заскринить
1. Вывод `docker compose ... ps` — контейнер запущен.
2. Сайт по HTTPS и значок защищённого соединения.
3. DevTools → Network — загрузка HTML, CSS, JS и изображений; запросы Firebase.
4. Docker Desktop — контейнер pcforge-site.
5. GitHub → Actions — успешный запуск CI.

## Безопасность
Не добавляй в GitHub файл .env и сертификаты *.pem. В репозитории оставлены только .env.example и пустые файлы .gitkeep. Firebase Web SDK config — публичная клиентская конфигурация; безопасность данных должна обеспечиваться правилами Firestore.

## Важно
Для этой практической работы используется локальный домен pcforge.localhost и локальный сертификат mkcert. Это не публичный хостинг и не сертификат для боевого домена. Для публичного деплоя потребуются домен, сервер и сертификат доверенного центра.
