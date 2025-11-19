Initial commit

Области хранения данных:

- База данных на json-server
- BFF
- Редакс стор

Сущности приложения:

- Пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
- Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
- Статья: БД (список статей), стор (отображение в браузере)
- Комментарий: БД (список комментариев), стор (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registered_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарий - comments: id / author_id / post_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

- user: id / login / roleId / session
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role
