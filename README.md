# Kraya Assignment

## Prerequisites

* Node.js
* PostgreSQL
* Docker

---

## Setup

Clone the repository:

```bash
git clone <repository-url>
cd kraya-assignment
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/krayaDB"

JWT_SECRET=kraya-secret-key

PORT=3001
```

---

## Start PostgreSQL (Docker)

If you're using Docker:

```bash
docker compose up -d
```

---

## Run Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

## Start the application

```bash
npm run start:dev
```

The application will start on:

```
http://localhost:3000
```

---

## APIs Implemented

### Public APIs

* `POST /auth/register`
* `POST /auth/login`

### Protected APIs

* `GET /auth/profile`

For protected APIs, pass the JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## Useful Commands

```bash
npm run start:dev
```

```bash
npm run build
```

```bash
npx prisma studio
```

---

## Note

This project is currently under development as part of the assignment.



// .env creds 
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/krayaDB"
JWT_SECRET=kraya-secret-key