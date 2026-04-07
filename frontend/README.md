<div align="center">

# Poker Planning Frontend

**Клиентское приложение для проведения планирования покером**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## Содержание

- [Описание](#описание)
- [Технологический стек](#технологический-стек)
- [Структура проекта](#структура-проекта)
- [Быстрый старт](#быстрый-старт)
- [Команды](#команды)

---

## Описание

Frontend — клиентское приложение для участия в сессиях планирования покером. Обеспечивает создание комнат, голосование картами, просмотр результатов в реальном времени через WebSocket.

---

## Технологический стек

<div align="center">

| **Категория** | **Технологии** |
|:---|:---|
| Фреймворк | React 19 + TypeScript |
| Сборка | Vite 6+ |
| Роутинг | React Router (Framework Mode) |
| Серверный стейт | TanStack Query 5+ |
| HTTP-клиент | Axios |
| Стили | Tailwind CSS 4+ |
| UI-компоненты | shadcn/ui |
| Анимации | Framer Motion |
| Валидация | Zod + React Hook Form |
| Иконки | Lucide React |

</div>

---

## Структура проекта

```
frontend/
├── src/
│   ├── app/              ← роуты React Router
│   ├── pages/            ← страницы (Home, Room, Results)
│   ├── widgets/          ← крупные блоки UI
│   ├── features/         ← голосование, комнаты, WebSocket
│   ├── entities/         ← Room, User, Card, Vote
│   ├── shared/
│   │   ├── api/          ← axios instance, tanstack query hooks
│   │   ├── ui/           ← переиспользуемые компоненты
│   │   └── lib/          ← утилиты, константы
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc.js
├── .stylelintrc.js
└── package.json
```

### Методология: Feature-Sliced Design

Проект следует FSD для обеспечения масштабируемости и переиспользуемости кода.

---

## Быстрый старт

### Требования

- `Node.js 20+`
- `pnpm 9+`

### Установка

```bash
cd frontend
pnpm install

# Копирование .env
cp .env.example .env

# Запуск dev-сервера
pnpm dev
```

### Настройки по умолчанию

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

---

## Команды

```bash
# Запуск dev-сервера
pnpm dev

# Production-сборка
pnpm build

# Запуск production
pnpm start

# Предпросмотр production-сборки
pnpm preview

# Линтинг
pnpm lint

# Форматирование
pnpm format

# Проверка типов
pnpm typecheck
```