Изучить, сравнить и задокументировать различные подходы к организации кода в React-приложениях на реальных примерах.

## 🏗️ Исследуемые архитектуры

### 1. Layered Architecture (Слоистая архитектура)
Разделение на слои: Presentation → Application → Domain → Infrastructure

### 2. DDD (Domain-Driven Design)
- Entities, Value Objects, Aggregates
- Repositories, Services
- Ubiquitous Language

### 3. FSD (Feature-Sliced Design)
- `app/` — инициализация приложения
- `processes/` — бизнес-процессы
- `pages/` — страницы
- `widgets/` — крупные UI-блоки
- `features/` — пользовательские сценарии
- `entities/` — бизнес-сущности
- `shared/` — переиспользуемый код

### 4. Clean Architecture
Адаптация дяди Боба для фронтенда с независимостью от фреймворка

## 📁 Структура эксперимента

## 🔧 Технологии

- **React 19** — с React Compiler
- **TypeScript** — строгая типизация
- **Vite** — сборка и HMR
- **ESLint** — с type-aware правилами

## 🔧 Технологии

- **React 19** — с React Compiler
- **TypeScript** — строгая типизация
- **Vite** — сборка и HMR
- **ESLint** — с type-aware правилами

## 📚 Полезные материалы

### Layered Architecture
- [Layered Architecture (Martin Fowler)](https://martinfowler.com/bliki/LayeredArchitecture.html)
- [React Layers Architecture](https://www.patterns.dev/posts/layered-architecture)

### Domain-Driven Design
- [DDD in TypeScript](https://khalilstemmler.com/articles/domain-driven-design-intro/)
- [Domain-Driven React](https://www.thisdot.co/blog/domain-driven-design-with-react)

### Feature-Sliced Design
- [Официальная документация FSD](https://feature-sliced.design/)
- [Карта экосистемы фронтенда (FSD)](https://feature-sliced.design/ja/blog/frontend-ecosystem-map)
- [Пример на React](https://feature-sliced.dev/docs/examples/react)

### Clean Architecture
- [The Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Clean Architecture](https://dev.to/josemukorivo/clean-architecture-in-react-a-practical-guide-1m5n)

### Сравнение архитектур
- [Architecture Patterns in React](https://alexkondov.com/tao-of-react/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

## 🚀 Запуск

```bash
npm install
npm run dev