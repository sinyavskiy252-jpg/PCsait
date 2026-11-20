# Скриншоты к отчёту по развёртыванию PCFORGE

Сохрани в эту папку реальные скриншоты с компьютера. Имена файлов должны совпадать с таблицей в `../README.md`.

1. `01-project-structure.png` — VS Code: рядом видны папки `PCsait` и `PCFORGE-deploy`, а внутри основного проекта папка `deploy`.
2. `02-compose-ps.png` — PowerShell с командой `docker compose -f PCFORGE-deploy/compose.yaml ps`; сервис `pcforge` должен быть запущен.
3. `03-https-site.png` — сайт PCFORGE по адресу `https://pcforge.localhost:8443`, видны адрес и значок защищённого соединения.
4. `04-network-api.png` — Chrome DevTools → Network → Fetch/XHR; выбери запрос к `identitytoolkit.googleapis.com` (Firebase Authentication) или `firestore.googleapis.com` (Firestore), открой Headers и покажи Request URL, Request Method и Status Code/Response Headers.
5. `05-docker-desktop.png` — Docker Desktop → Containers; виден работающий `pcforge-site` и опубликованные порты `8080` и `8443`.
6. `06-github-actions.png` — вкладка Actions основного репозитория, успешный workflow GitHub Actions (дополнительное задание).

Перед сохранением снимка проверь, что на нём нет паролей, токенов, личных данных, содержимого `.env` и приватных ключей.
