Изучить, сравнить и задокументировать различные подходы к организации кода в React-приложениях на реальных примерах.

## 🏗️ Исследуемые подходы

### 1. Layered Architecture (Слоистая архитектура)
Разделение на слои: Presentation → Application → Domain → Infrastructure

### 2. DDD (Domain-Driven Design)
- Entities, Value Objects, Aggregates
- Repositories, Services
- Ubiquitous Language

### 3. FSD (Feature-Sliced Design)
- `app/` — инициализация приложения
- `pages/` — страницы
- `widgets/` — крупные UI-блоки
- `features/` — пользовательские сценарии
- `entities/` — бизнес-сущности
- `shared/` — переиспользуемый код

### 4. Clean Architecture
Адаптация дяди Боба для фронтенда с независимостью от фреймворка


## 📚 Полезные материалы

### Flat / Feature-based — Layered Architecture
- [Layered Architecture (Martin Fowler)](https://martinfowler.com/bliki/LayeredArchitecture.html)
- [React Project Structure Guide](https://github.com/shopot/react-project-structure)
- [React Layers Architecture](https://www.patterns.dev/posts/layered-architecture)

### Atomic Design
- [Front-Commerce Guide](https://developers.front-commerce.com/docs/next/concepts/react-components-structure/)

### Domain-Driven Design
- [DDD in TypeScript](https://khalilstemmler.com/articles/domain-driven-design-intro/)
- [Domain-Driven React](https://www.thisdot.co/blog/domain-driven-design-with-react)
- [DDD with React (Bit.dev)](https://medium.com/m/global-identity-2?redirectUrl=https%3A%2F%2Fblog.bitsrc.io%2Fdomain-driven-design-with-react-building-scalable-and-maintainable-applications-8aa854f18a69)

### Feature-Sliced Design
- [Официальная документация FSD](https://feature-sliced.design/)
- [Карта экосистемы фронтенда (FSD)](https://feature-sliced.design/ja/blog/frontend-ecosystem-map)
- [Пример на React](https://feature-sliced.dev/docs/examples/react)

### Clean Architecture
- [The Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Clean Architecture](https://dev.to/josemukorivo/clean-architecture-in-react-a-practical-guide-1m5n)

### Сравнение архитектур
- [The Evolution of Frontend](https://feature-sliced.design/ru/blog/evolution-of-frontend-dev)
- [Architecture Patterns in React](https://alexkondov.com/tao-of-react/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [мое сравнение](https://chat.deepseek.com/share/6vt5gth8ateqykyudd)

## 🚀 Запуск

```bash
npm install
npm run dev

