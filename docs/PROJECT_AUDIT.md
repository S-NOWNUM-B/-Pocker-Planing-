<div align="center">

# Poker Planning — Отчёт по базовой структуре проекта

**Аудит структуры frontend-приложения и готовности к MVP**

[![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](../frontend/README.md)
[![FSD](https://img.shields.io/badge/Architecture-FSD-2B5BA8)](https://feature-sliced.design/)

</div>

---

## Содержание

- [1. Базовая структура проекта (FSD)](#1-базовая-структура-проекта-fsd)
- [2. Routing skeleton](#2-routing-skeleton)
- [3. API layer skeleton](#3-api-layer-skeleton)
- [4. Server-state vs Local state](#4-server-state-vs-local-state)
- [5. MVP — обязательные страницы и сценарии](#5-mvp--обязательные-страницы-и-сценарии)
- [6. Обнаруженные проблемы](#6-обнаруженные-проблемы)
- [7. Вывод](#7-вывод)

---

## 1. Базовая структура проекта (FSD)

Проект следует методологии **Feature-Sliced Design**. Все обязательные слои присутствуют:

<div align="center">

| **Слой**     | **Путь**                  | **Статус**  | **Содержимое**                                              |
| :----------- | :------------------------ | :---------- | :---------------------------------------------------------- |
| `app`        | `src/app/`                | Готов       | Роутер, провайдеры, лейауты, глобальные стили               |
| `pages`      | `src/pages/`              | Готов       | 10+ страниц: Home, Login, Register, Dashboard, Room и др.   |
| `features`   | `src/features/`           | Готов       | 6 фич: auth, create-room, join-room, vote, reveal, manage   |
| `entities`   | `src/entities/`           | Готов       | 3 сущности: room, participant, vote                         |
| `shared`     | `src/shared/`             | Готов       | API-клиент, UI-компоненты, хуки, утилиты, конфиги           |
| `widgets`    | `src/widgets/`            | Готов       | Композитные блоки: Header, RoomHeader, VotingCards и др.    |

</div>

**Вердикт:** Все 5 обязательных слоёв (`app`, `pages`, `features`, `entities`, `shared`) выделены корректно. Дополнительный слой `widgets` также присутствует.

---

## 2. Routing skeleton

Роутинг реализован на **react-router-dom**.

### Конфигурация

<div align="center">

| **Путь**           | **Компонент**     | **Гард**             | **Статус**       |
| :----------------- | :---------------- | :------------------- | :--------------- |
| `/`                | `HomePage`        | —                    | Реализована      |
| `/login`           | `LoginPage`       | `PublicOnlyGuard`    | Stub (TODO)      |
| `/register`        | `RegisterPage`    | `PublicOnlyGuard`    | Stub (TODO)      |
| `/dashboard`       | `DashboardPage`   | `AuthGuard`          | Stub (TODO)      |
| `/room/:roomId`    | `RoomPage`        | —                    | Полностью готова |
| `/create-room`     | `CreateRoomPage`  | —                    | Stub (TODO)      |
| `/profile`         | `ProfilePage`     | `AuthGuard`          | Stub (TODO)      |
| `/about`           | `AboutPage`       | —                    | Заглушка         |
| `*`                | `NotFoundPage`    | —                    | Готова           |

</div>

### Страница Onboarding (приветствия)

**Текущее состояние:** Страница `/` теперь указывает на `OnboardingPage` — полноценную landing-страницу с описанием проекта, преимуществами и CTA-кнопками. Прежняя `HomePage` перемещена на `/home`.

### Guards

<div align="center">

| **Гард**            | **Статус**       | **Описание**                                                |
| :------------------ | :--------------- | :---------------------------------------------------------- |
| `AuthGuard`         | Stub (TODO)      | Должен проверять авторизацию и редиректить на `/login`      |
| `PublicOnlyGuard`   | Stub (TODO)      | Должен редиректить авторизованных на `/dashboard`           |

</div>

---

## 3. API layer skeleton

### API-клиент

<div align="center">

| **Компонент**       | **Путь**                                    | **Статус**       |
| :------------------ | :------------------------------------------ | :--------------- |
| Axios instance      | `shared/api/client.ts`                      | Готов            |
| Auth API            | `entities/user/api/authApi.ts`              | Готов            |
| Room API            | `entities/room/api/roomApi.ts`              | Готов            |

</div>

**Auth API:** Создан модуль `entities/user/api/authApi.ts` с методами:
- `login(email, password)` → `POST /auth/login`
- `register(email, password, name)` → `POST /auth/register`
- `logout(refreshToken)` → `POST /auth/logout`
- `refreshToken(refreshToken)` → `POST /auth/refresh`
- `getUser()` → `GET /auth/me`
- `updateUser(updates)` → `PATCH /auth/profile`

Типы данных вынесены в `entities/user/model/types.ts`.

---

## 4. Server-state vs Local state

### Server-state (TanStack Query)

<div align="center">

| **Сущность**        | **Query Key**      | **Метод**       | **Инвалидация**           |
| :------------------ | :----------------- | :-------------- | :------------------------ |
| Комната             | `['room', id]`     | GET             | После vote/reveal/reset   |
| Список комнат       | `['rooms']`        | GET             | После create-room         |
| Голос               | —                  | POST (mutation) | `['room', roomId]`        |
| Раскрытие голосов   | —                  | POST (mutation) | `['room', roomId]`        |
| Сброс комнаты       | —                  | POST (mutation) | `['room', roomId]`        |
| Создание комнаты    | —                  | POST (mutation) | `['rooms']`               |

</div>

**Конфигурация QueryClient:**
- `staleTime: 5 минут`
- `retry: 2`
- `refetchOnWindowFocus: false`

### Local state

<div align="center">

| **Тип**             | **Реализация**                              | **Назначение**                      |
| :------------------ | :------------------------------------------ | :---------------------------------- |
| localStorage        | `useLocalStorage<T>` hook                   | Персистентность UI-состояния         |
| Тема (dark/light)   | `useTheme` hook                             | Настройки оформления                |
| Сессия игры         | `SessionManager` (localStorage)             | Сохранение состояния комнаты        |
| React useState      | Внутри компонентов                          | UI-состояние форм, модалок и т.д.   |
| Глобальный store    | **Отсутствует** (не требуется)              | —                                   |

</div>

**Принцип разделения:**
- **Server-state** — данные, которые приходят с бэкенда (комнаты, участники, голоса, история). Управляются через TanStack Query.
- **Local state** — UI-состояние компонентов (открыта ли модалка, выбранная карта, тема). Управляются через `useState` и `useLocalStorage`.

---

## 5. MVP — обязательные страницы и сценарии

### Обязательные страницы MVP

<div align="center">

| **#** | **Страница**       | **Сценарий**                                          | **Приоритет** |
| :---- | :----------------- | :---------------------------------------------------- | :------------ |
| 1     | Onboarding         | Пользователь попадает на сайт, понимает суть проекта   | Высокий       |
| 2     | Login / Register   | Аутентификация пользователя                           | Высокий       |
| 3     | Dashboard          | Просмотр своих комнат (активных и завершённых)         | Средний       |
| 4     | Room (игровая)    | Основной сценарий: создание/подключение, голосование   | Критический   |
| 5     | Room (зритель)    | Просмотр результатов голосования                      | Средний       |

</div>

### Обязательные сценарии MVP

<div align="center">

| **Сценарий**              | **Статус**       |
| :------------------------ | :--------------- |
| Создание комнаты          | Частично готов   |
| Подключение по ссылке     | Stub             |
| Выбор карты (голосование) | Готово           |
| Раскрытие результатов     | Готово (хук)     |
| Сброс голосования         | Готово (хук)     |
| Авторизация               | Stub             |
| Просмотр истории          | Не реализовано   |

</div>

---

## 6. Обнаруженные проблемы

<div align="center">

| **#** | **Проблема**                                       | **Критичность** | **Статус**      |
| :---- | :------------------------------------------------- | :-------------- | :-------------- |
| 1     | Нет страницы Onboarding в роутере                  | Средняя         | **Исправлено**  |
| 2     | Auth API отсутствует как отдельный модуль          | Высокая         | **Исправлено**  |
| 3     | AuthGuard и PublicOnlyGuard — stubs с TODO         | Высокая         | В процессе      |
| 4     | LoginPage, RegisterPage, DashboardPage — stubs     | Средняя         | В процессе      |
| 5     | Дублирование: `RegisterPage` и `Register`          | Низкая          | В процессе      |
| 6     | WebSocket не интегрирован в Room API               | Средняя         | В процессе      |
| 7     | SessionManager — stub                              | Средняя         | В процессе      |

</div>

---

## 7. Вывод

### Что готово

- Структура проекта полностью соответствует **Feature-Sliced Design**
- Все 5 обязательных слоёв (`app`, `pages`, `features`, `entities`, `shared`) выделены
- Routing skeleton настроен со всеми основными страницами, включая **Onboarding** на `/`
- API-клиент (Axios) настроен с интерцепторами
- **Auth API** создан (`entities/user/api/authApi.ts`) с полным набором методов
- Room API реализован (CRUD операции)
- TanStack Query настроен для server-state
- Страница Room полностью функциональна
- **TypeScript и build проходят без ошибок**

### Что требует доработки

- Реализовать **AuthGuard** и **PublicOnlyGuard** (проверка токена)
- Заполнить stub-страницы (Login, Register, Dashboard) — подключить к Auth API
- Интегрировать **WebSocket** для реального времени
- Реализовать **SessionManager** для JWT-менеджмента
- Устранить дублирование `RegisterPage` / `Register`

### Почему выбрана такая структура

1. **Feature-Sliced Design** обеспечивает чёткое разделение ответственности и предсказуемую навигацию по коду.
2. **TanStack Query** для server-state — стандарт индустрии, избавляет от ручного управления кэшем и loading-состояниями.
3. **Отсутствие глобального client-state** — упрощает архитектуру. UI-состояние хранится локально в компонентах или в localStorage.
4. **Слои entities → features → pages** — от доменных сущностей к пользовательским сценариям к страницам. Это позволяет переиспользовать фичи на разных страницах.

---

> **Дата аудита:** 2026-04-12
> **Статус проекта:** Базовая структура готова, требуется доработка auth-слоя и onboarding-страницы.
