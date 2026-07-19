# Kraya Assignment

# Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Docker
- Postman

---

# Features

- JWT Authentication
- Role Based Access Control (RBAC)
- User Management
- Role & Permission Management
- Item Management
- Vendor Management
- Indent Management
- Material Issue (MI) Management
- Request For Quotation (RFQ) Management
- Prisma Seeder
- DTO Validation
- Exception Handling

---

# Project Structure

```
src
├── auth
├── users
├── roles
├── items
├── vendors
├── indents
├── mi
├── rfq
├── prisma
└── common
```

---

# Prerequisites

- Node.js
- PostgreSQL
- Docker 

---

# Setup

Clone the repository

```bash
git clone <repository-url>
cd kraya-assignment
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/krayaDB"

JWT_SECRET=kraya-secret-key

DEFAULT_ADMIN_NAME=Admin
DEFAULT_ADMIN_EMAIL=admin@kraya.com
DEFAULT_ADMIN_PASSWORD=Admin@123
DEFAULT_ADMIN_PHONE=9090909090

PORT=3001
```

---

# Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

or

```bash
npx prisma migrate deploy
```

Seed Default Data

```bash
npx prisma db seed
```

The seed creates:

- Default Admin User
- Default Roles
- Default Permissions

---

# Docker

Start PostgreSQL

```bash
docker compose up -d
```

---

# Run Application

```bash
npm run start:dev
```

Application URL

```
http://localhost:3001
```

---

# Authentication

## Public APIs

```
POST /auth/register
POST /auth/login
```

## Protected APIs

```
GET /auth/profile
```

Pass JWT Token

```
Authorization: Bearer <access_token>
```

---

# Modules Implemented

- Authentication
- Users
- Roles
- Permissions
- Items
- Vendors
- Indents
- Material Issue (MI)
- Request For Quotation (RFQ)

---

# RBAC Flow

```
Admin
    ↓
Create Role
    ↓
Assign Permissions
    ↓
Create User
    ↓
Assign Role
    ↓
User Login
    ↓
Permission Based API Access
```

---

# Procurement Flow

```
Item
    ↓
Vendor
    ↓
Indent
    ↓
Material Issue (MI)
    ↓
Request For Quotation (RFQ)
```

---

# Default Admin Credentials

```
Email:
admin@kraya.com

Password:
Admin@123
```

---

# Postman Collection

The project includes a Postman Collection covering:

- Authentication
- RBAC
- User Management
- Master Data
- Procurement Business Flow
- Authorization Demo

---

# Useful Commands

Run Development Server

```bash
npm run start:dev
```

Build Project

```bash
npm run build
```

Open Prisma Studio

```bash
npx prisma studio
```

Generate Prisma Client

```bash
npx prisma generate
```

---

# Assumptions

- Admin user bypasses all permission checks.
- Normal users require role-based permissions.
- Passwords are securely hashed using bcrypt.
- UUIDs are used as primary identifiers.
- PostgreSQL is used as the primary database.