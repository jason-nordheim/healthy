# API Server

## Technologies

Production 

- `bcrypt` - hashing passwords
- `express` - JavaScript framework for APIs
- `jsonwebtoken` - Signing tokens
- `cors` - cross origin resource sharing (accessing third party APIs)
- `axios` - simplify HTTP requests 
- `dotenv` - load environment variables (e.g. API keys)
- `mongoose` - ORM (object relational mapping)
- `date-fns` - date/time library to simplify working with dates 

Development 

- `nodemon` - automatically restarting the express server on file change 
- `supertest` & `jest` - testing/simulating calls to API routes/endpoints 
- `faker` - generating random data for tests 

## Routes

Authorization is handled user bearer tokens. Encrypted/signed using JWT. Tokens are set to expire after 24 hours.

### User

Overview:

| Path               | Method   | Auth Required | Brief Description          |
| ------------------ | -------- | ------------- | -------------------------- |
| `/api/users`       | `GET`    | Yes           | retrieves user profile     |
| `/api/users`       | `POST`   | No            | creates a new user account |
| `/api/users/login` | `POST`   | Yes           | requests a user token      |
| `/api/users`       | `PATCH`  | Yes           | updates provided values    |
| `/api/users`       | `DELETE` | Yes           | deletes user account       |

### Food

Overview:

| Path                | Method   | Auth Required | Brief Description                                    |
| ------------------- | -------- | ------------- | ---------------------------------------------------- |
| `/api/foods`        | `GET`    | Yes           | gets all food logged for the current user            |
| `/api/foods/:id`    | `GET`    | Yes           | gets food (1) with provided id                       |
| `/api/foods`        | `POST`   | Yes           | creates a new food authorized user account           |
| `/api/foods/search` | `GET`    | No            | searches for foods based upon provided `query` param |
| `/api/foods/:id`    | `PATCH`  | Yes           | updates food with provided id                        |
| `/api/foods/:id`    | `DELETE` | Yes           | deletes user account                                 |

### Weight

Overview:

| Path                 | Method   | Auth Required | Brief Description                                                |
| -------------------- | -------- | ------------- | ---------------------------------------------------------------- |
| `/api/exercises`     | `GET`    | Yes           | returns all exercises logged for the current user                |
| `/api/exercises/:id` | `GET`    | Yes           | returns exercise (1) associated with provided `:id`              |
| `/api/exercises`     | `POST`   | Yes           | creates a new exercise associated with current user              |
| `/api/exercises/:id` | `PATCH`  | Yes           | updates values of exercise record associated with provided `:id` |
| `/api/exercises/:id` | `DELETE` | Yes           | deletes exercise record with provided `:id`                      |
