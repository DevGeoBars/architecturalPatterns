# Figma token sync (src/tokens)

Сырые и сгенерированные токены из Figma Design file.  
Артефакты и CSS лежат в **src/tokens/** и подключены через **index.css**.

---

## Что лежит в папке

| Файл / папка | Назначение |
|--------------|------------|
| `manifest.json` | Дата экспорта, `figmaFileVersion`, hash variables, diff-статистика, список CSS |
| `figma-variables.json` | Полный дамп variables (collections, modes, aliases) |
| `figma-styles.json` | Published styles (опционально, REST) |
| `_mcp-parts/` | Промежуточные части JSON (в git не коммитится) |
| `figma-variables.prev.json` | Бэкап перед `update` (в git не коммитится) |
| `changes.json` | Отчёт diff после `update` (в git не коммитится) |
| `colors-palette.css`, `colors-semantic.css`, … | CSS, сгенерированные из JSON |
| `index.generated.css` | `@import` всех `*.css` из этой папки |

---

## Настройка (один раз)

### 1. Figma-файл с токенами

- Design file (не FigJam): в проекте используется file key **`NJjoxvfywesS0K3qshoqui`**
- URL: `https://www.figma.com/design/NJjoxvfywesS0K3qshoqui/...`
- То же значение: `figma.config.json` → `files.tokens`, `@packages/@figma-crawler/docs/QUICKSTART.md`

### 2. Переменные окружения

В **корне репозитория** создайте или дополните `.env` (см. `@packages/@figma-crawler/.env.example`):

```env
# Обязательно для REST-скриптов
FIGMA_TOKEN=figd_xxxxxxxx

# Файл с variables (токены)
FIGMA_FILE_ID_TOKENS=NJjoxvfywesS0K3qshoqui
```

| Scope токена | Нужен для |
|--------------|-----------|
| `file_variables:read` | Прямой экспорт variables (`tokens:downloads:export`) |
| `file_content:read` | Импорт частей из текстовых нод Figma (`tokens:downloads:import-mcp`) |

Без `file_variables:read` используйте **Figma MCP** или **Framelink** (см. ниже), затем сборку JSON и генерацию CSS.

### 3. (Опционально) Figma MCP в Cursor

Если MCP для Figma в Cursor ещё не подключён:

1. Самый простой способ: в чате Agent в Cursor выполните команду:
   ```text
   /add-plugin figma
   ```
   После этого у Cursor появятся настройки MCP для Figma и связанные Agent Skills.

2. Вручную (если плагин не ставится): Cursor → Settings → MCP → вкладка MCP.
   Добавьте глобальный MCP-сервер со следующей конфигурацией:
   ```json
   {
     "mcpServers": {
       "figma": {
         "url": "https://mcp.figma.com/mcp"
       }
     }
   }
   ```

Для экспорта через Plugin API в Agent mode:

1. В Cursor: MCP **Figma** (`plugin-figma-figma`) → авторизация (`mcp_auth`).
2. Откройте файл токенов в Figma в браузере.
3. В Agent mode попросите выгрузить variables в `sharedPluginData` / текстовые ноды (см. раздел «Пайплайн MCP»).

---

## Источники данных

Токены можно получить несколькими способами — результат для CSS-генерации один: файл **`figma-variables.json`** в этой папке.

### A. `@tflex/figma-crawler` (официальный sync в репозиторий)

Пишет **один** файл `public/resources/styles/tokens.css`, не эту папку. Полезен для сравнения и CI.

```bash
# из корня репозитория
npm run tokens:sync
npm run design:sync -- --dry-run --verbose
```

Требует `FIGMA_TOKEN` с **`file_variables:read`**.  
Конфиг: `figma.config.json` → `parsing.collections`.

### B. REST API → `figma-variables.json` (скрипт uikit)

```bash
npm run tokens:downloads:export --workspace=@tflex/uikit
```

Скрипт: `scripts/export-figma-tokens-downloads.mjs`  
Требует **`file_variables:read`**. При 403 см. способы C или D.

### C. Figma MCP (Cursor) + REST import

Обход лимита ~20 KB на ответ MCP: variables кэшируются в файле Figma, затем читаются REST API.

1. **Agent mode**, авторизованный Figma MCP, file key `NJjoxvfywesS0K3qshoqui`.
2. Экспорт в файл (один раз после обновления токенов в Figma) — через `use_figma` в `sharedPluginData` `tflex.token.export` и страницу `__mcp_token_export__` (подробности у команды / в истории PR).
3. Из корня репозитория:

```bash
npm run tokens:downloads:import-mcp --workspace=@tflex/uikit
npm run tokens:downloads:assemble --workspace=@tflex/uikit
```

Требует `FIGMA_TOKEN` с **`file_content:read`**.

Если части уже лежат в `_mcp-parts/part-*.txt`:

```bash
npm run tokens:downloads:assemble --workspace=@tflex/uikit
```

### D. [Framelink](https://www.framelink.ai/docs/quickstart?utm_source=github&utm_medium=referral&utm_campaign=readme) (Figma MCP)

[Framelink](https://www.framelink.ai/docs/quickstart?utm_source=github&utm_medium=referral&utm_campaign=readme) — отдельный MCP-сервер для Figma: variables, компоненты, контекст для кода. Подходит как **альтернатива** встроенному Figma MCP в Cursor.

Кратко по [Quickstart](https://www.framelink.ai/docs/quickstart?utm_source=github&utm_medium=referral&utm_campaign=readme):

1. Установите и подключите MCP Framelink в Cursor (или другой клиент) по их документации.
2. Авторизуйтесь в Figma.
3. Укажите file key / ссылку на файл токенов `NJjoxvfywesS0K3qshoqui`.
4. Запросите выгрузку **local variables** в JSON и сохраните результат как  
   `src/tokens/figma-variables.json`  
   (структура должна содержать `collections[]` с `collection` + `variables`, как у текущего дампа).
5. Запустите генерацию CSS (см. ниже).

Framelink не заменяет скрипты сборки в этом репозитории — он только помогает **получить** актуальный JSON.

После ручной подстановки JSON запустите `tokens:downloads:update` или `tokens:downloads:css` (см. раздел «Обновление»).

---

## Обновление (incremental)

Режим обновления — аналог `npm run icons:update`: не пересобирать все CSS без необходимости.

### Когда что запускать

| Ситуация | Команда |
|----------|---------|
| Первый экспорт в `src/tokens/` | `npm run tokens:downloads:all` |
| Токены в Figma менялись, нужен свежий дамп + CSS | `npm run tokens:downloads:update` |
| Figma не трогали, JSON уже актуален | ничего или `tokens:downloads:css` |
| JSON положили вручную (Framelink), нужен только CSS | `tokens:downloads:css` или `tokens:downloads:css:changed` после `diff` |

### `npm run tokens:downloads:update`

Скрипт: `scripts/run-tokens-downloads-update.mjs`

```bash
# из корня репозитория
npm run tokens:downloads:update
```

**Порядок шагов:**

1. Проверка `manifest.json`: `figmaFileVersion` (REST) и `variablesContentHash` (SHA-256 `figma-variables.json`).
   - Совпадают с Figma → сообщение **All tokens up to date**, выход (~секунды, без CSS).
2. Копия текущего JSON → `figma-variables.prev.json`.
3. Загрузка с Figma — как в `all`: REST `export` или MCP `import-mcp` + `assemble`.
4. Diff предыдущего и нового дампа → `changes.json`:
   - `added`, `updated`, `removed` (по `variable.id` и `valuesByMode`);
   - `changedCollections` — имена коллекций Figma для частичной генерации CSS.
5. Если diff пустой → **up to date**, CSS не пересобирается.
6. Иначе → `generate-css-from-figma-downloads.mjs --collections=…` только для изменённых коллекций; `index.generated.css` обновляется целиком.

**Важно:** Figma REST по-прежнему возвращает **полный** снимок variables. Экономия — ранний выход и перегенерация **не всех** `*.css`.

### Поля `manifest.json` для update

| Поле | Назначение |
|------|------------|
| `figmaFileVersion` | Версия файла Figma (`GET /files/:id`) |
| `variablesContentHash` | Hash текущего `figma-variables.json` |
| `previousVariablesContentHash` | Hash до последнего update |
| `lastUpdateAt` | Время последнего `update` |
| `lastChanges` | `{ added, updated, removed, unchanged }` |
| `changedCollections` | Коллекции из последнего diff |
| `lastPartialCssCollections` | Коллекции, для которых последний раз пересобирали CSS |

### Связанные команды

```bash
# только сравнить prev и текущий JSON (нужен figma-variables.prev.json)
npm run tokens:downloads:diff

# CSS только по коллекциям из changes.json
npm run tokens:downloads:css:changed

# CSS только для указанных коллекций (из каталога uikit)
node scripts/generate-css-from-figma-downloads.mjs --collections=Spacing,Colors/Palette
```

### MCP + update

Если REST export недоступен (`file_variables:read`):

1. Обновите variables в Figma и **переэкспортируйте** в файл через Agent / Framelink (страница `__mcp_token_export__`, см. раздел C).
2. Запустите `npm run tokens:downloads:update` — сработает import + assemble + diff + частичный CSS.

### Сравнение с `icons:update`

| | Иконки | Token downloads |
|--|--------|-----------------|
| Команда | `npm run icons:update` | `npm run tokens:downloads:update` |
| Полный цикл | `icons:sync` | `tokens:downloads:all` |
| Инкремент на диске | не качает уже существующие SVG | не пересобирает CSS неизменённых коллекций |
| Отчёт | лог в консоли | `changes.json` + поля в `manifest.json` |

---

## Генерация CSS

Когда `figma-variables.json` уже есть (или после `tokens:downloads:all`):

```bash
# из корня репозитория
npm run tokens:downloads:css
npm run tokens:downloads:update   # обычно после изменений в Figma
npm run tokens:downloads:all      # первый раз / полная перекачка

# или из пакета uikit
cd @packages/@tflex/uikit
npm run tokens:downloads:css
npm run tokens:downloads:update
```

Скрипт: `scripts/generate-css-from-figma-downloads.mjs`

**Создаёт / перезаписывает:**

| CSS | Коллекция Figma |
|-----|-----------------|
| `colors-palette.css` | Colors/Palette |
| `colors-semantic.css` | Colors/Semantic |
| `colors-component.css` | Color (Light `:root`, Dark `[data-theme="dark"]`) |
| `colors-dark-mode.css` | Colors/Dark mode |
| `typography.css` | Typoghraphy |
| `spacing.css` | Spacing |
| `sizing.css` | Sizing |
| `border-radius.css` | Border radius |
| `disabled.css` | Disabled object |
| `index.generated.css` | импорт всех файлов выше |

Правила генерации:

- имена: `Colors/Palette/Primary/blue-100` → `--colors-palette-primary-blue-100`
- COLOR-алиасы → `var(--...)`
- typography: размеры/line-height в **rem** (значение ÷ 10), font-weight 400/600/700
- spacing / sizing / radius: **px**

### Просмотр сгенерированных токенов

Figma-файлы уже подключены в `src/tokens/index.css`. Для быстрой проверки только сгенерированного набора можно временно заменить импорты на:

```css
@import "./index.generated.css";
```

В production оставляйте явные `@import` отдельных `*.css` (как в текущем `index.css`), чтобы вручную поддерживаемые файлы (`scrolls.css`, `mainCSS/main.css`, …) не перезаписывались.

---

## Команды npm (`@tflex/uikit`)

| Команда | Действие |
|---------|----------|
| `npm run tokens:downloads:export` | REST → `figma-variables.json` (+ `figma-styles.json`, `manifest.json`) |
| `npm run tokens:downloads:import-mcp` | REST: текстовые ноды `__mcp_token_export__` → `_mcp-parts/` |
| `npm run tokens:downloads:assemble` | `_mcp-parts/` → `figma-variables.json` |
| `npm run tokens:downloads:css` | `figma-variables.json` → все `*.css` в этой папке |
| `npm run tokens:downloads:all` | **Всё по порядку:** export → (при ошибке) import-mcp + assemble → css |
| `npm run tokens:downloads:update` | **Обновление:** бэкап JSON → fetch → diff → CSS только изменённых коллекций |
| `npm run tokens:downloads:diff` | Сравнить `figma-variables.prev.json` и текущий JSON → `changes.json` |
| `npm run tokens:downloads:css:changed` | CSS только для коллекций из `changes.json` |

Из **корня монорепозитория** (без `--workspace`, если скрипт продублирован в корневом `package.json`):

```bash
npm run tokens:downloads:all
npm run tokens:downloads:update
```

Или явно через workspace:

```bash
npm run tokens:downloads:all --workspace=@tflex/uikit
npm run tokens:downloads:css --workspace=@tflex/uikit
```

### Типичные сценарии

**Первый раз / полная перекачка:**

```bash
npm run tokens:downloads:all
```

Порядок: REST `export` → при неудаче (нет `file_variables:read` / нет MCP-нод) `import-mcp` + `assemble` → `css`.  
Перед MCP-путём один раз выгрузите variables в Figma через Agent / Framelink (см. разделы C и D).

**Повседневное обновление** — см. раздел [Обновление (incremental)](#обновление-incremental):

```bash
npm run tokens:downloads:update
```

**Только обновить CSS после правки JSON вручную / из Framelink:**

```bash
npm run tokens:downloads:css --workspace=@tflex/uikit
```

**Полный цикл REST (если токен с `file_variables:read`):**

```bash
npm run tokens:downloads:export --workspace=@tflex/uikit
npm run tokens:downloads:css --workspace=@tflex/uikit
```

**Полный цикл MCP + REST import:**

```bash
# после экспорта в Figma через MCP / Agent
npm run tokens:downloads:import-mcp --workspace=@tflex/uikit
npm run tokens:downloads:assemble --workspace=@tflex/uikit
npm run tokens:downloads:css --workspace=@tflex/uikit
```

---

## Production-токены uikit

Скрипты `tokens:downloads:*` пишут JSON и CSS **напрямую в `src/tokens/`**. После `update` или `css`:

1. Просмотрите diff в `changes.json` и изменённые `*.css`.
2. Проверьте Storybook / приложение.
3. При необходимости скорректируйте вручную поддерживаемые файлы (`scrolls.css`, `mainCSS/main.css`, …) — они не перезаписываются генератором.
4. `src/tokens/index.css` меняйте только при осознанном расширении набора импортов.

---

## Устранение проблем

| Симптом | Решение |
|---------|---------|
| `update`: «Missing figma-variables.json» | Сначала `tokens:downloads:all` |
| `update`: всегда качает, никогда «up to date» | После успешного update в `manifest.json` должны быть `figmaFileVersion` и `variablesContentHash`; нужен `FIGMA_TOKEN` для проверки версии файла |
| `diff`: нет `figma-variables.prev.json` | Запустите `update` (создаёт `.prev`) или скопируйте JSON вручную |
| REST 403 `file_variables:read` | Новый PAT с scope или MCP / Framelink → JSON → `tokens:downloads:update` |
| Нет `figma-variables.json` | Сначала export, import-mcp + assemble или положить JSON вручную |
| Пустой / битый JSON | Пересобрать `_mcp-parts` или повторить MCP-экспорт |
| Лишние component colors в UI | `colors-component.css` подключён целиком; при необходимости сузьте импорты в `index.css` |

---

## Скрипты (`@packages/@tflex/uikit/scripts/`)

Все пути ниже — относительно пакета uikit: `@packages/@tflex/uikit/scripts/`.  
Запуск из каталога uikit: `node ./scripts/<имя>.mjs`. Из корня репозитория удобнее через `npm run …` (см. таблицу).

### Основной пайплайн (есть npm-команды)

| Скрипт | npm | Назначение |
|--------|-----|------------|
| `run-tokens-downloads-all.mjs` | `tokens:downloads:all` | Полный цикл: REST export → при ошибке MCP import + assemble → генерация всех CSS |
| `run-tokens-downloads-update.mjs` | `tokens:downloads:update` | Инкремент: бэкап JSON → fetch → diff → CSS только изменённых коллекций |
| `export-figma-tokens-downloads.mjs` | `tokens:downloads:export` | REST API → `figma-variables.json`, `figma-styles.json`, `manifest.json` |
| `import-figma-export-text-nodes.mjs` | `tokens:downloads:import-mcp` | REST: текстовые ноды страницы `__mcp_token_export__` → `_mcp-parts/part-*.txt` |
| `assemble-figma-variables-from-parts.mjs` | `tokens:downloads:assemble` | Склейка `_mcp-parts/part-*.txt` → `figma-variables.json` |
| `generate-css-from-figma-downloads.mjs` | `tokens:downloads:css` | `figma-variables.json` → `*.css` + `index.generated.css` |
| | `tokens:downloads:css:changed` | То же, но только коллекции из `changes.json` (`--changed-only`) |
| `diff-figma-variables.mjs` | `tokens:downloads:diff` | Сравнение двух JSON → `changes.json` (по умолчанию prev vs текущий) |

**Флаги `generate-css-from-figma-downloads.mjs`:**

- без флагов — все коллекции;
- `--collections=Spacing,Colors/Palette` — только указанные;
- `--changed-only` — коллекции из `changes.json`.

### Библиотека

| Файл | Назначение |
|------|------------|
| `lib/figma-variables-diff.mjs` | Сравнение дампов variables (added/updated/removed), hash JSON; используется в `diff` и `update` |

### Вспомогательные скрипты MCP (без npm, для Agent / отладки)

Нужны, когда ответ `use_figma` обрезается (~20 KB) и variables сохраняются **частями** в `_mcp-parts/`, `_mcp-halves/`, `_mcp-quarters/`, `_mcp-incoming/`. В обычном workflow достаточно `import-mcp` + `assemble` или `tokens:downloads:all` / `update`.

| Скрипт | Назначение |
|--------|------------|
| `merge-figma-mcp-parts.mjs` | Склеить массив строк `parts[]` из одного JSON-файла → `figma-variables.json` |
| `split-json-to-mcp-parts.mjs` | Разбить большой JSON на куски `part-NNN.txt` (по умолчанию 6000 символов) |
| `write-mcp-slices-to-parts.mjs` | Собрать slice-файлы в одну строку и разбить на `part-*.txt` |
| `fetch-figma-shared-export-parts.mjs` | Записать части из batch JSON (`FIGMA_MCP_BATCH_DIR`) в `_mcp-parts/` |
| `persist-figma-mcp-parts.mjs` | `_mcp-incoming/part-NNN.json` → `_mcp-parts/part-NNN.txt` |
| `persist-all-mcp-incoming-parts.mjs` | То же для всех файлов в `_mcp-incoming/` |
| `save-mcp-export-parts.mjs` | Batch `{ parts: [{ index, data }] }` из stdin → `_mcp-parts/` |
| `save-mcp-parts-batch.mjs` | Batch из JSON-файла → `_mcp-parts/` |
| `save-mcp-part-response.mjs` | Один ответ `use_figma` из JSON-файла → `part-NNN.txt` |
| `save-mcp-part-from-stdin.mjs` | `{ partIndex, data }` из stdin → `part-NNN.txt` |
| `save-mcp-response-stdin.mjs` | Ответ MCP из stdin (`partIndex` или `slice` + `data`) |
| `save-single-mcp-part.mjs` | Одна часть: `node save-single-mcp-part.mjs <index> <data-file>` |
| `write-part-from-file.mjs` | Записать `part-NNN.txt` из текстового файла по индексу |
| `save-mcp-half.mjs` | Половина части → `_mcp-halves/part-NNN-h0.txt` / `h1.txt` (stdin) |
| `merge-part-halves.mjs` | Склеить h0 + h1 → `_mcp-parts/part-NNN.txt` |
| `save-mcp-quarter.mjs` | Четверть части → `_mcp-quarters/` (stdin) |
| `save-mcp-part-quarters-batch.mjs` | Массив quarters из JSON → merge одной части |
| `merge-part-quarters.mjs` | Склеить quarters → `_mcp-parts/part-NNN.txt` |

### Промежуточные папки (в `src/tokens/`)

| Папка | Содержимое |
|-------|------------|
| `_mcp-parts/` | Готовые фрагменты JSON (`part-000.txt` …) для `assemble` |
| `_mcp-halves/` | Половины слишком больших фрагментов (редко) |
| `_mcp-quarters/` | Четверти фрагментов (редко) |
| `_mcp-incoming/` | Сырые JSON от MCP перед `persist-*` (редко) |

Папки с префиксом `_mcp-*` в git не коммитятся (см. `.gitignore`).

### Связь скриптов (схема)

```text
REST (export) ──────────────────────────────► figma-variables.json
                                                    │
MCP Agent → Figma (__mcp_token_export__)            │
         → import-mcp → _mcp-parts/ → assemble ────┘
                                                    ▼
                              generate-css-from-figma-downloads.mjs
                                                    ▼
                                         *.css

update: prev.json + export/import → diff → changes.json → css (частично)
all:    export → (fallback import+assemble) → css (всё)
```

---

## См. также

- `@packages/@figma-crawler/docs/QUICKSTART.md`
- `figma.config.json`
- [Framelink — Quickstart](https://www.framelink.ai/docs/quickstart?utm_source=github&utm_medium=referral&utm_campaign=readme)
- [Figma MCP — Cursor setup](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server)
