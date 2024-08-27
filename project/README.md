# Leetduck

### Video Demo <URL>

## Description:

I developed a website with automated tests where users can see their Python knowledge and compare their results with others across different age groups. The site offers four different exercises, each with varying levels of difficulty, ranging from basic to more challenging tasks.

> If you took CS50 maybe not that challenging.

## Table of Contents:

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [Auth Endpoints](#auth-endpoints)
  - [Exercise Endpoints](#exercise-endpoints)
  - [Ranking Endpoints](#ranking-endpoints)
  - [User Endpoints](#user-endpoints)
- [Installation](#installation)
- [Usage](#usage)

## The website features:

- **Login persistence** using JWT tokens, ensuring users remain logged in even when they leave the page.
- **Authentication features** to verify the identity of the user and control access based on their credentials.
- **Multiple pages** that provide a seamless user experience.
- **Exercises** to prove a test the user knowledge in python logic.
- **Ranking system** that is based on the scores users achieve across the exercises.

> To score on an exercise, users must pass all tests within it. However,
> they only have three chances to submit each exercise. Once a score is
> earned for a specific exercise, no additional points can be obtained
> from that exercise.

### Technologies Used:

- **Backend**:

  - Node.js
  - TypeScript
  - Fastify
  - SQLite
  - Prisma
  - JWT
  - Bcrypt
  - Zod
  - Swagger

- **Frontend**:

  - ReactJS
  - Vite
  - Axios
  - React DOM
  - Sonner
  - TailwindCSS
  - TypeScript
  - MonacoEditor

# API Endpoints

> For a better see and interact I also made a swagger documentation in
> `domain/docs`

![Swagger Documentation](https://i.imgur.com/6lw6dHI.png)

## Auth Endpoints

| Method | Endpoint  | Summary             | Parameters                                                                            | Responses                                                                                                                    |
| ------ | --------- | ------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/auth`   | Authenticates token | **Body:** <br> - `token` (string): User token                                         | **200 OK** <br> - `valid` (bool) <br> **401 Unauthorized** <br> - `valid` (bool)                                             |
| POST   | `/login`  | User login          | **Body:** <br> - `name` (string): User name <br> - `password` (string): User password | **200 OK** <br> - `action` (string): "Logged in" <br> - `token` (string) <br> **401 Unauthorized** <br> - `message` (string) |
| POST   | `/logout` | Logs out user       | **Header:** <br> - `Authorization` (JWT token)                                        | **200 OK** <br> - `message` (string): "Logged out" <br> **401 Unauthorized** <br> - `message` (string): "Invalid token"      |

## Exercise Endpoints

| Method | Endpoint   | Summary           | Parameters                                                  | Responses                                                                                                                               |
| ------ | ---------- | ----------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/average` | Executes average  | **Body:** <br> - `code` (string) <br> - `token` (JWT token) | **200 OK** <br> - `success` (boolean) <br> - `results` (array) <br> **400 Bad Request** <br> - `error` (string): "No chances remaining" |
| POST   | `/greet`   | Executes greeting | **Body:** <br> - `code` (string) <br> - `token` (JWT token) | **200 OK** <br> - `success` (boolean) <br> - `results` (array) <br> **400 Bad Request** <br> - `error` (string): "No chances remaining" |
| POST   | `/sum`     | Executes sum      | **Body:** <br> - `code` (string) <br> - `token` (JWT token) | **200 OK** <br> - `success` (boolean) <br> - `results` (array) <br> **400 Bad Request** <br> - `error` (string): "No chances remaining" |
| POST   | `/vowel`   | Executes vowel    | **Body:** <br> - `code` (string) <br> - `token` (JWT token) | **200 OK** <br> - `success` (boolean) <br> - `results` (array) <br> **400 Bad Request** <br> - `error` (string): "No chances remaining" |

## Ranking Endpoints

| Method | Endpoint   | Summary          | Parameters                                     | Responses                                                                                                                                             |
| ------ | ---------- | ---------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/ranking` | Get user ranking | **Header:** <br> - `Authorization` (JWT token) | **200 OK** <br> - `name` (string) <br> - `age` (integer) <br> - `scores` (array) <br> **401 Unauthorized** <br> - `message` (string): "Invalid token" |

## User Endpoints

| Method | Endpoint      | Summary        | Parameters                                                                        | Responses                                                                                                                                                         |
| ------ | ------------- | -------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/register`   | Register user  | **Body:** <br> - `name` (string) <br> - `age` (number) <br> - `password` (string) | **200 OK** <br> - `action` (string): "User registered" <br> **409 Conflict** <br> - `message` (string): "Username already exists"                                 |
| GET    | `/user-stats` | Get user stats | **Header:** <br> - `Authorization` (JWT token)                                    | **200 OK** <br> - `chances` (array) <br> - `score` (integer) <br> - `allTestspassed` (array) <br> **401 Unauthorized** <br> - `message` (string): "Invalid token" |

## Tables Schemas

```sql
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "name" TEXT UNIQUE NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL
);

CREATE TABLE "scores" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "score" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

CREATE TABLE "exercises" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    "chances" INTEGER DEFAULT 3 NOT NULL,
    "all_tests_passed" BOOLEAN DEFAULT 0 NOT NULL,
    "user_id" TEXT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);
```

## Usage

1. **Register as a new user:**
   - If you don't have an account, access `/register` to create an account.
     ![register](https://i.imgur.com/Tcc7S9K.png)
2. **Login:**
   - Use `/login` to authenticate and retrieve your JWT token.
     ![login](https://i.imgur.com/g9PgPtp.png)
3. **Test your Python skills:**
   - Submit code for each exercise endpoint (e.g., `/average`, `/sum`, etc.).
     ![submit](https://i.imgur.com/2FlZZTM.png)
4. **Check your ranking:**
   - Visit `/ranking` to see where you stand among other users.
     ![ranking](https://i.imgur.com/ca3fp2j.png)

`
