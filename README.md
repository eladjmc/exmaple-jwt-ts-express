# exmaple-jwt-ts-express Documentation

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [Understanding JWT Authentication](#understanding-jwt-authentication)
- [Testing with Postman](#testing-with-postman)
- [API Endpoints](#api-endpoints)
  - [User Authentication Routes](#user-authentication-routes)
    - [Register a New User](#register-a-new-user)
    - [Login](#login)
  - [Book Routes (Protected)](#book-routes-protected)
    - [Get All Books](#get-all-books)
    - [Get a Single Book](#get-a-single-book)
    - [Create a New Book](#create-a-new-book)
    - [Update a Book](#update-a-book)
    - [Delete a Book](#delete-a-book)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Additional Notes](#additional-notes)
- [Conclusion](#conclusion)

---

## Introduction

This project is a simple RESTful API server built with **TypeScript** and **Express.js**. It provides:

- **User authentication** using **JSON Web Tokens (JWT)** and password hashing with **bcrypt**.
- **CRUD operations** for books stored in a JSON file.
- Organized codebase with a clear separation of concerns using **models**, **controllers**, **services**, **routes**, and **middleware**.
- Basic **error handling middleware** for consistent error responses.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v12 or higher)
- **npm** (comes with Node.js)
- **TypeScript** (installed globally)
- **Postman** (for testing the API)

To install TypeScript globally:

```bash
npm install -g typescript
```

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your_username/exmaple-jwt-ts-express.git
   cd exmaple-jwt-ts-express
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

---

## Environment Setup

1. **Create a `.env` File**

   In the root directory of the project, create a `.env` file to store environment variables:

   ```env
   PORT=3000
   JWT_SECRET='your_jwt_secret'
   ```

   - Replace `'your_jwt_secret'` with a secure secret key. This key is used to sign JWT tokens.
   - **Note**: Do not commit the `.env` file to version control. Add it to your `.gitignore` file.

2. **Update `.gitignore`**

   Ensure your `.gitignore` file includes the `.env` file:

   ```gitignore
   node_modules/
   .env
   dist/
   ```

---

## Running the Server

### Development Mode

The project uses **Nodemon** and **ts-node** for development to enable automatic server restarts on code changes.

```bash
npm run dev
```

### Production Mode

Compile the TypeScript code to JavaScript and start the server:

```bash
npm run build
npm start
```

---

## Understanding JWT Authentication

**JSON Web Tokens (JWT)** are an open standard for securely transmitting information between parties as a JSON object. In this API:

- When a user logs in, the server generates a JWT signed with a secret key.
- The client must include this token in the `Authorization` header of subsequent requests to access protected routes.
- The server verifies the token on each request to ensure the user is authenticated.

**Why Use JWT?**

- **Stateless Authentication**: No need to store session information on the server.
- **Scalability**: Easy to scale across multiple servers.
- **Security**: Tokens can be signed and encrypted.

---

## Testing with Postman

**Postman** is a popular API client that makes it easy to create, share, test, and document APIs.

**Download Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

**Using Postman to Test the API:**

1. **Create a New Request**: Click on "New" and select "HTTP Request".

2. **Set the Request URL**: Enter the API endpoint URL, e.g., `http://localhost:3000/users/register`.

3. **Select the HTTP Method**: Choose `POST`, `GET`, `PUT`, or `DELETE` as required.

4. **Set Headers**:

   - For JSON requests, add a header: `Content-Type: application/json`.
   - For protected routes, add an `Authorization` header with the JWT token: `Authorization: Bearer your_jwt_token`.

5. **Set Request Body**:

   - For `POST` and `PUT` requests, select the "Body" tab, choose "raw", and set the type to "JSON".
   - Enter the JSON payload.

6. **Send the Request**: Click "Send" and view the response.

---

## API Endpoints

### User Authentication Routes

#### Register a New User

- **URL**: `/users/register`
- **Method**: `POST`
- **Description**: Creates a new user account.
- **Body Parameters**:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Response**:

  - **201 Created**: User successfully registered.

    ```json
    {
      "id": 1,
      "username": "john_doe"
    }
    ```

  - **400 Bad Request**: Missing or invalid fields.

- **Postman Instructions**:

  - Set the URL to `http://localhost:3000/users/register`.
  - Select `POST` method.
  - In the "Headers" tab, add `Content-Type: application/json`.
  - In the "Body" tab, select "raw" and "JSON".
  - Enter the JSON payload.

- **Example Request Body**:

  ```json
  {
    "username": "john_doe",
    "password": "securePassword123"
  }
  ```

#### Login

- **URL**: `/users/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Body Parameters**:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Response**:

  - **200 OK**: Returns a JWT token.

    ```json
    {
      "token": "jwt_token_here"
    }
    ```

  - **401 Unauthorized**: Invalid credentials.

- **Postman Instructions**:

  - Set the URL to `http://localhost:3000/users/login`.
  - Select `POST` method.
  - In the "Headers" tab, add `Content-Type: application/json`.
  - In the "Body" tab, select "raw" and "JSON".
  - Enter the JSON payload.

- **Example Request Body**:

  ```json
  {
    "username": "john_doe",
    "password": "securePassword123"
  }
  ```

### Book Routes (Protected)

**Note**: All book routes require authentication. Include the JWT token in the `Authorization` header:

```
Authorization: Bearer jwt_token_here
```

#### Get All Books

- **URL**: `/books`
- **Method**: `GET`
- **Description**: Retrieves a list of all books.
- **Response**:

  - **200 OK**: Returns an array of books.

    ```json
    [
      {
        "id": 1,
        "title": "Book Title",
        "author": "Author Name",
        "publishedDate": "YYYY-MM-DD"
      },
      ...
    ]
    ```

- **Postman Instructions**:

  - Set the URL to `http://localhost:3000/books`.
  - Select `GET` method.
  - In the "Headers" tab, add `Authorization: Bearer jwt_token_here`.

#### Get a Single Book

- **URL**: `/books/:id`
- **Method**: `GET`
- **Description**: Retrieves details of a specific book by ID.
- **Response**:

  - **200 OK**: Returns the book object.
  - **404 Not Found**: Book not found.

- **Postman Instructions**:

  - Set the URL to `http://localhost:3000/books/1` (replace `1` with the desired book ID).
  - Select `GET` method.
  - In the "Headers" tab, add `Authorization: Bearer jwt_token_here`.

#### Create a New Book

- **URL**: `/books`
- **Method**: `POST`
- **Description**: Adds a new book to the collection.
- **Body Parameters**:

  ```json
  {
    "id": number, // Optional if auto-incremented
    "title": "string",
    "author": "string",
    "publishedDate": "YYYY-MM-DD"
  }
  ```

- **Response**:

  - **201 Created**: Book successfully created.
  - **400 Bad Request**: Missing or invalid fields.

- **Postman Instructions**:

  - Set the URL to `http://localhost:3000/books`.
  - Select `POST` method.
  - In the "Headers" tab, add:

    - `Content-Type: application/json`
    - `Authorization: Bearer jwt_token_here`

  - In the "Body" tab, select "raw" and "JSON".
  - Enter the JSON payload.

- **Example Request Body**:

  ```json
  {
    "title": "New Book",
    "author": "Jane Smith",
    "publishedDate": "2023-10-01"
  }
  ```

#### Update a Book

- **URL**: `/books/:id`
- **Method**: `PUT`
- **Description**: Updates an existing book's details.
- **Body Parameters**:

  ```json
  {
    "title": "string",
    "author": "string",
    "publishedDate": "YYYY-MM-DD"
  }
  ```

- **Response**:

  - **200 OK**: Book successfully updated.
  - **400 Bad Request**: Missing or invalid fields.
  - **404 Not Found**: Book not found.

- **Postman Instructions**:

  - Set the URL to `http://localhost:3000/books/1` (replace `1` with the book ID).
  - Select `PUT` method.
  - In the "Headers" tab, add:

    - `Content-Type: application/json`
    - `Authorization: Bearer jwt_token_here`

  - In the "Body" tab, select "raw" and "JSON".
  - Enter the JSON payload.

- **Example Request Body**:

  ```json
  {
    "title": "Updated Book Title",
    "author": "Jane Smith",
    "publishedDate": "2023-10-15"
  }
  ```

#### Delete a Book

- **URL**: `/books/:id`
- **Method**: `DELETE`
- **Description**: Deletes a book from the collection.
- **Response**:

  - **204 No Content**: Book successfully deleted.
  - **404 Not Found**: Book not found.

- **Postman Instructions**:

  - Set the URL to `http://localhost:3000/books/1` (replace `1` with the book ID).
  - Select `DELETE` method.
  - In the "Headers" tab, add `Authorization: Bearer jwt_token_here`.

---

## Error Handling

The API uses an error handling middleware to provide consistent error responses.

- **400 Bad Request**: The request could not be understood or was missing required parameters.
- **401 Unauthorized**: Authentication failed or user does not have permissions.
- **403 Forbidden**: Authentication succeeded but authenticated user does not have access to the resource.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.

**Error Response Format**:

```json
{
  "message": "Error description here"
}
```

---

## Project Structure

```
exmaple-jwt-ts-express/
├── books.json
├── users.json
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── src/
    ├── controllers/
    │   ├── bookController.ts
    │   └── userController.ts
    ├── dal/
    │   ├── bookDAL.ts
    │   └── userDAL.ts
    ├── middleware/
    │   ├── authMiddleware.ts
    │   └── errorHandler.ts
    ├── models/
    │   ├── Book.ts
    │   └── User.ts
    ├── routes/
    │   ├── bookRoutes.ts
    │   └── userRoutes.ts
    ├── services/
    │   ├── bookService.ts
    │   └── userService.ts
    └── server.ts
```

**Explanation**:

- **controllers/**: Handle incoming requests and responses.
- **dal/** (Data Access Layer): Interact with the JSON files for data storage.
- **middleware/**: Custom middleware for authentication and error handling.
- **models/**: Define TypeScript interfaces for data models.
- **routes/**: Define the API endpoints and associate them with controllers.
- **services/**: Business logic and data manipulation.
- **server.ts**: Entry point of the application.

---

## Dependencies

- **express**: Web framework for Node.js.
- **jsonfile**: Easily read/write JSON files.
- **bcrypt**: Library to hash passwords.
- **jsonwebtoken**: For JWT authentication.
- **dotenv**: Loads environment variables from a `.env` file.
- **uuid**: Generates unique IDs (if needed).

**Dev Dependencies**:

- **typescript**: TypeScript compiler.
- **ts-node**: Executes TypeScript files directly.
- **nodemon**: Automatically restarts the server on file changes.
- **@types/\***: Type definitions for TypeScript.

---

## Additional Notes

- **Security**:

  - Always keep your `JWT_SECRET` secure. In production, do not hardcode secrets; use environment variables or a secret manager.
  - Use HTTPS in production to encrypt network traffic.
  - Consider implementing rate limiting to protect against brute-force attacks.

- **Data Persistence**:

  - The API uses JSON files (`books.json` and `users.json`) for data storage, which is suitable for testing or small-scale applications.
  - For production, consider using a database like MongoDB, PostgreSQL, or MySQL.

- **Extensibility**:

  - The project structure is designed to be scalable. You can add more models, services, controllers, and routes as needed.
  - Implement validation for incoming data using a library like `Joi` or `class-validator`.

- **Testing**:

  - Write unit tests for your services and controllers.
  - Use tools like `Mocha` and `Chai` for testing.

---

## Conclusion

You now have a fully functional API server with user authentication and book management capabilities. This setup provides a solid foundation for building more complex applications. Feel free to extend and customize the project according to your needs.

**Happy Coding!**

