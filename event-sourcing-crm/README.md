🇬🇧 
# Event-driven CRM System

This project is an MVP CRM designed using a microservices architecture with communication via a message broker.

---

## Overview

The project is a minimal-feature CRM system for managing leads, deals, customers, and tasks.

It includes:
- microservices architecture
- event-driven communication
- implementation of distributed systems design patterns

---

## Functionality

- Management of leads, deals, customers, and tasks
- Minimal RBAC: sales / manager / administrator
- Asynchronous service-to-service communication via events
- Full audit log of all system events

---

## Architecture

The system is built on microservices communicating through an event bus.

I chose **RabbitMQ** as the message broker because it provides lower operational complexity compared to Kafka.  
Redis is used for caching due to fast data access.

### Full list of services:

- **API Gateway** — entry point to the application over HTTP, responsible for routing and communication with microservices.
- **Auth Sessions Service** — handles authentication (currently JWT-based only). Future Google OAuth support is planned.
- **Events Service** — persists events from other services into the database. Used for audit logging.
- **Leads Service** — manages leads.
- **Clients Service** — manages clients.
- **Deals Service** — manages deals.
- **Tasks Service** — manages tasks.
- **Notes Service** — manages notes.
- **Users Service** — manages users.

### Types of communication:

- Synchronous: REST over HTTP
- Asynchronous: RabbitMQ

### Design patterns used:

- Event-driven architecture
- API Gateway pattern
- Redis caching

---

## Tech Stack

### Backend
- NestJS
- TypeScript
- PostgreSQL
- Redis

### Message Broker
- RabbitMQ

### Infrastructure
- Docker

### Frontend (in development)
- React
- TypeScript

---

## Quick Start

### Requirements
- Docker
- Node.js 20+

### Run

```bash
git clone https://github.com/rabbit23113-spec/Event-driven-CRM-System.git
cd event-sourcing-crm
npm run setup
docker-compose up --build
```

🇷🇺 
# Event Sourcing CRM

Данный проект представляет собой MVP CRM, спроектированную на микросервисной архитектуре и коммуникацией посредством брокера сообщений.

---

## Описание

Проект представляет собой CRM с минимальным рабочим функционалом для управления лидами, сделками, клиентами и задачами.

Проект включает в себя:
- микросервисную архитектуру
- event-driven взаимодействие
- реализацию некоторых паттернов проектирования распределенных систем

---

## Функциональность

- Управление лидами, сделками, клиентами и задачами
- Минимальный RBAC: sales/manager/administrator
- Асинхронное взаимодействие сервисов через события
- Журнал аудита со всеми событиями

---

## Архитектура

Система построена на микросервисах, взаимодействующих между собой через событийную шину.

В качестве брокера сообщений я выбрал **RabbitMQ**, так как этот брокер сообщений обеспечивает более низкую сложность эксплуатации в сравнении с Kafka.
Для кэширования выбран Redis за счет быстрого доступа к данным.


### Полный список сервисов:

- **API Gateway** — точка входа в приложение по HTTP, отвечает за маршрутизацию и обращение в микросервисы.
- **Auth Sessions Service** — осуществление аутентификации (пока что) только через JWT. В будущем будет добавлен вход через Google за счет технологии OAuth.
- **Events Service** - сервис, отвечающий за создание событий из других микросервисов в базе данных. Необходим для поддержки наглядного журнала аудита.
- **Leads Service** - сервис лидов.
- **Clients Service** - сервис клиентов.
- **Deals Service** - сервис сделок.
- **Tasks Service** - сервис задач.
- **Notes Service** - сервис заметок.
- **Users Service** - сервис пользователей.

### Типы взаимодействия:

- Синхронное: REST HTTP
- Асинхронное: RabbitMQ

### Используемые паттерны:

- Event-driven architecture
- API Gateway
- Кэширование Redis

---

## Стек технологий

### Backend
- Фреймворк NestJS
- Язык программирования TypeScript
- PostgreSQL
- Redis

### Брокер сообщений
- RabbitMQ

### Инфраструктура
- Docker

### Frontend (временно в стадии разработки)
- React
- TypeScript

---

## Быстрый старт

### Требования
- Docker
- Node.js 20+

### Запуск проекта

```bash
git clone https://github.com/rabbit23113-spec/Event-driven-CRM-System.git
cd event-sourcing-crm
npm run setup
docker-compose up --build
```
