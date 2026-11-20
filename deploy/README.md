# Отчёт по развёртыванию PCFORGE

## 1. Архитектура проекта

PCFORGE — клиентское веб-приложение для просмотра комплектующих и создания конфигураций персонального компьютера. Отдельного сервера на Node.js или Python в проекте нет: браузер обращается к Firebase напрямую через Firebase SDK.

```text
Пользователь
    |
    v
Браузер (Chrome)
    | HTTPS :8443
    v
Nginx (Docker-контейнер pcforge-site)
    | отдаёт собранные статические файлы
    v
Frontend: React + TypeScript + Tailwind CSS
    |
    +---- HTTPS ----> Firebase Authentication
    |                 регистрация и авторизация
    |
    +---- HTTPS ----> Cloud Firestore
                      хранение данных приложения
```

Docker собирает Frontend на этапе build. Nginx раздаёт файлы из каталога dist. Локальные TLS-файлы подключаются в контейнер как read-only volume из PCFORGE-deploy/certs.

## 2. Таблица сервисов

| Сервис | Технология | Внутренний порт | Порт компьютера |
|---|---|---:|---:|
| Веб-сервер и Frontend | Nginx | 80 (HTTP), 443 (HTTPS) | 8080 (HTTP), 8443 (HTTPS) |
| Авторизация | Firebase Authentication | Внешний HTTPS-сервис | Не публикуется локально |
| База данных | Cloud Firestore | Внешний HTTPS-сервис | Не публикуется локально |

В Docker Compose запускается один контейнер — pcforge-site. Firebase Authentication и Cloud Firestore являются облачными сервисами и не запускаются в Docker.

## 3. Переменные окружения

Для конфигурации Firebase используются следующие переменные (значения в отчёт не включаются):

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

Локальные значения задаются в PCsait/.env. Файл .env не добавляется в Git. Vite встраивает переменные VITE_* в клиентскую сборку, поэтому их нельзя считать серверными секретами. Защита данных обеспечивается правилами Cloud Firestore и настройками Firebase Authentication.

## 4. Команды запуска и остановки

Все команды выполняются в PowerShell из общей папки, где рядом находятся PCsait и PCFORGE-deploy.

### Подготовка Frontend

```powershell
cd PCsait
npm install
Copy-Item .env.example .env
```

Заполнить PCsait/.env параметрами своего Firebase-проекта, затем вернуться в общую папку:

```powershell
cd ..
```

### Создание локального HTTPS-сертификата

Если сертификаты ещё не созданы, требуется установленный OpenSSL:

```powershell
New-Item -ItemType Directory -Force .\PCFORGE-deploy\certs
openssl req -x509 -nodes -newkey rsa:2048 -sha256 -days 365 -keyout .\PCFORGE-deploy\certs\pcforge.localhost-key.pem -out .\PCFORGE-deploy\certs\pcforge.localhost.pem -subj "/CN=pcforge.localhost" -addext "subjectAltName=DNS:pcforge.localhost,DNS:localhost,IP:127.0.0.1"
```

Закрытый ключ и сертификат хранятся только локально и не добавляются в Git.

### Сборка и запуск

```powershell
docker compose --env-file PCsait/.env -f PCFORGE-deploy/compose.yaml up --build -d
```

Проверить состояние:

```powershell
docker compose -f PCFORGE-deploy/compose.yaml ps
```

Посмотреть журнал:

```powershell
docker logs pcforge-site
```

Адреса приложения:
- HTTPS: https://pcforge.localhost:8443
- HTTP: http://localhost:8080 (перенаправляется на HTTPS)

Самоподписанный сертификат может вызвать предупреждение браузера — это ожидаемо для локального учебного стенда.

### Остановка

```powershell
docker compose -f PCFORGE-deploy/compose.yaml down
```

## 5. Скриншоты

Все реальные скриншоты сохранить в deploy/screenshots/ этого репозитория.

| Имя файла | Что должно быть видно |
|---|---|
| 01-project-structure.png | Дерево VS Code с PCsait и отдельным PCFORGE-deploy |
| 02-compose-ps.png | Вывод docker compose -f PCFORGE-deploy/compose.yaml ps; контейнер должен быть Up |
| 03-https-site.png | Сайт https://pcforge.localhost:8443 и адресная строка со значком замка |
| 04-network-api.png | DevTools → Network → Fetch/XHR: запрос Firebase Authentication или Firestore; вкладка Headers с URL, методом и статусом |
| 05-docker-desktop.png | Docker Desktop → Containers: pcforge-site и опубликованные порты 8080 и 8443 |
| 06-github-actions.png | Успешное выполнение workflow GitHub Actions (дополнительное задание) |

Для Network нужно открыть запрос к Firebase API и показать именно его заголовки ответа, а не только список запросов. Не допускается попадание в кадр паролей, содержимого .env, токенов, закрытых ключей и персональных данных.

## 6. Ошибки и способы устранения

| Ошибка | Причина | Решение |
|---|---|---|
| mkcert не распознаётся как команда | Утилита не установлена или отсутствует в PATH | Использовать команду OpenSSL из раздела 4 |
| Имя контейнера pcforge-site уже используется | Остался контейнер от предыдущего запуска | Остановить предыдущий Compose-проект; если контейнер больше не нужен — docker rm -f pcforge-site, затем повторить запуск |
| eslint или tsc не найдены | Зависимости ещё не установлены | В каталоге PCsait выполнить npm install |
| Браузер предупреждает о сертификате | Используется самоподписанный локальный сертификат | Проверить сертификат для pcforge.localhost; предупреждение ожидаемо для локального стенда |
| Firebase возвращает ошибку авторизации или доступа | Неверные параметры Firebase, не включён способ входа или правила Firestore запрещают операцию | Проверить .env, настройки Authentication и правила Firestore в Firebase Console |

## 7. Публикация на реальном сервере

Для публикации проекта в интернете потребуется:

1. Зарегистрировать домен и направить DNS на IP сервера.
2. Подготовить сервер с Docker и Docker Compose.
3. Настроить Nginx для реального домена.
4. Выпустить доверенный TLS-сертификат (например, Let's Encrypt) и настроить его продление.
5. Настроить production-переменные окружения, не публикуя .env.
6. Проверить разрешённые домены Firebase Authentication.
7. Проверить правила Cloud Firestore и ограничить доступ к данным пользователей.
8. Настроить резервное копирование и мониторинг.

Локальные сертификаты pcforge.localhost.pem и pcforge.localhost-key.pem для публичного сервера не подходят.

## 8. Репозитории

- Основной Frontend: https://github.com/sinyavskiy252-jpg/PCsait
- Конфигурация развёртывания: https://github.com/sinyavskiy252-jpg/PCFORGE-deploy

Репозитории остаются отдельными. Папка deploy в основном проекте содержит отчёт и скриншоты, а Dockerfile, Compose, Nginx и локальные сертификаты относятся к отдельному репозиторию развёртывания.
