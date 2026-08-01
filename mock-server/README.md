# ServiceDesk mock-server

Запуск:

```bash
node server.mjs
```

Сервер работает на `http://localhost:3001`.

## Хранение обращений

Обращения хранятся в `database/issues.json`. Изменения после `POST`, `PUT`, `PATCH` и `DELETE` сохраняются в файл и переживают перезапуск сервера.

Если удалить `database/issues.json`, при следующем запуске файл будет восстановлен из начальных данных `data/issues.mjs`.

## Авторизация

Все маршруты `/api/issues` требуют действующую cookie-сессию.

Тестовые пользователи:

- `admin / admin`
- `customer / customer`

## Issues CRUD

### Получить список

```http
GET /api/issues
```

Ответ:

```json
{
  "Data": [],
  "TotalCount": 0
}
```

### Получить одно обращение

```http
GET /api/issues/:id
```

### Создать обращение

```http
POST /api/issues
Content-Type: application/json
```

Минимальное тело:

```json
{
  "Subject": "Не открывается документ",
  "Content": "Описание проблемы"
}
```

Сервер сам назначает `Id`, `Number`, `CreatedAt`, `UpdatedAt`, `Author` и `AuthorEmail`.

### Полностью заменить обращение

```http
PUT /api/issues/:id
Content-Type: application/json
```

`Subject` и `Content` обязательны.

### Частично изменить обращение

```http
PATCH /api/issues/:id
Content-Type: application/json
```

Пример:

```json
{
  "Status": 3,
  "Subject": "Уточнённая тема"
}
```

Поля `Id`, `Number`, `CreatedAt`, `UpdatedAt`, `UpdatedBy`, `Author` и `AuthorEmail` нельзя менять через тело запроса.

### Удалить обращение

```http
DELETE /api/issues/:id
```

Успешный ответ: `204 No Content`.
