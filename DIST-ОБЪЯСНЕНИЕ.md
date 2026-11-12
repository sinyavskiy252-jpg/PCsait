# Папка dist

Папка `dist` автоматически создаётся командой `npm run build`. Это готовая production-сборка сайта, а не исходный код.

Ожидаемая структура:
```text
dist/
  index.html
  assets/
    js/
      index.js
    css/
      index.css
    images/
    fonts/
```

- `index.html` — стартовая HTML-страница.
- `assets/js/index.js` — собранный JavaScript.
- `assets/css/index.css` — собранные стили.
- `images` и `fonts` — ресурсы, если они используются приложением.

Названия index.js и index.css заданы настройками сборки, поэтому случайные хеши в именах файлов не показываются. Содержимое файлов всё равно минифицируется для production.

Редактировать нужно файлы в `src`, а не в `dist`. Папка `dist` игнорируется Git и пересоздаётся при каждой сборке.
