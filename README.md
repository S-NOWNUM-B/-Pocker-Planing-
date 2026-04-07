<div align="center">

# Poker Planning

**Инструмент для проведения планирования покером в реальном времени**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## Содержание

- [О проекте](#о-проекте)
- [Технологический стек](#технологический-стек)
- [Архитектура](#архитектура)
- [Быстрый старт](#быстрый-старт)
- [Команды](#команды)

---

## О проекте

### Проблема

Проведение планирования покером в распределённых командах требует синхронизации участников, ручного подсчёта карт и часто приводит к рассинхрону при голосовании.

### Решение

**Poker Planning** — веб-приложение для оценки задач методом Planning Poker. Команда создаёт комнату, участники голосуют картами в реальном времени через WebSocket, результаты синхронизируются мгновенно для всех участников.

### Аудитория

- Разработчики
- Scrum-команды
- Тимлиды

---

## Технологический стек

<div align="center">

| **Категория** | **Технологии** | **Версия / Детали** |
|:---:|:---:|:---:|
| Фреймворк | React, TypeScript | React 19+ |
| Сборка | Vite | 6+ |
| Роутинг | React Router (Framework Mode) | 7+ |
| Серверный стейт | TanStack Query | 5+ |
| HTTP-клиент | Axios | 1.13+ |
| Стили | Tailwind CSS | 4+ |
| UI-компоненты | shadcn/ui | — |
| Анимации | Framer Motion | 12+ |
| Реальное время | WebSocket | — |
| Валидация | Zod + React Hook Form | — |
| Иконки | Lucide React | — |
| Линтинг | ESLint + Prettier + Stylelint | — |
| Git-хуки | Husky + lint-staged | — |

</div>

---

## Архитектура

```mermaid
flowchart LR
    subgraph Client["Клиент"]
        User["Пользователь /\n(Модератор / Участник)"]
    end

    subgraph FE["Frontend (React + Vite)"]
        Router["React Router /\n(Framework Mode)"]
        Pages["Pages /\n(Home, Room, Results)"]
        Components["UI Components /\n(shadcn/ui + Tailwind)"]
    end

    subgraph State["Состояние"]
        Query["TanStack Query /\n(серверный кэш)"]
        WS["WebSocket /\n(реальное время)"]
    end

    subgraph BE["Backend API"]
        REST["REST API"]
        WSEndpoint["WebSocket /\nHub"]
        Services["Services /\nБизнес-логика"]
    end

    subgraph Storage["Хранилище"]
        DB[("PostgreSQL")]
        Cache[("Redis")]
    end

    User --> Router
    Router --> Pages
    Pages --> Components
    Pages --> Query
    Pages --> WS
    Query --> REST
    WS <--> WSEndpoint
    REST --> Services
    WSEndpoint --> Services
    Services --> DB
    Services <--> Cache
```

---

## Быстрый старт

### Требования

<div align="center">

| Компонент | Минимум | Рекомендуется |
|:---:|:---:|:---:|
| Node.js | 18.18+ | 20+ |
| pnpm | 8+ | 9+ |

</div>

### Клонирование репозитория

```bash
git clone https://github.com/your-org/poker-planning.git

cd poker-planning
```

### Установка зависимостей

```bash
pnpm install
```

### Запуск приложения

```bash
pnpm dev
```

### Настройки по умолчанию

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- WebSocket: `ws://localhost:8000/ws`

---

## Команды

### Frontend (Vite)

```bash
# Запуск dev-сервера (http://localhost:5173)
pnpm dev

# Production-сборка
pnpm build

# Запуск production-сборки
pnpm start

# Предпросмотр production-сборки
pnpm preview

# Линтинг
pnpm lint

# Форматирование кода
pnpm format

# Проверка типов TypeScript
pnpm typecheck
```