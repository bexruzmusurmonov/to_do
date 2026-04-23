# FastAPI Todo CRUD App

A beginner-friendly Todo API built with:

- FastAPI
- PostgreSQL
- SQLAlchemy
- Docker

## Project Structure

```text
todo/
|-- app/
|   |-- routers/
|   |   `-- todos.py
|   |-- crud.py
|   |-- database.py
|   |-- main.py
|   |-- models.py
|   `-- schemas.py
|-- .env.example
|-- .gitignore
|-- docker-compose.yml
|-- Dockerfile
|-- README.md
`-- requirements.txt
```

## What Each File Does

- `app/database.py` sets up the database connection and session.
- `app/models.py` defines the SQLAlchemy database table.
- `app/schemas.py` defines request and response shapes.
- `app/crud.py` contains the database logic.
- `app/routers/todos.py` contains API routes.
- `app/main.py` creates the FastAPI app and connects everything together.

## Run Locally

1. Create and activate a virtual environment.
2. Install the requirements:

```bash
pip install -r requirements.txt
```

3. Copy the example environment file:

```bash
copy .env.example .env
```

4. Make sure PostgreSQL is running and a database named `todo_db` exists.
5. Start the app:

```bash
uvicorn app.main:app --reload
```

6. Open:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Run With Docker

```bash
docker compose up --build
```

Then open `http://127.0.0.1:8000/docs`

## Example Request Body

### Create a Todo

```json
{
  "title": "Learn FastAPI",
  "description": "Build a simple CRUD project"
}
```

### Update a Todo

```json
{
  "title": "Learn FastAPI well",
  "completed": true
}
```

## API Endpoints

- `GET /` - basic welcome route
- `GET /health` - health check
- `GET /todos/` - list todos
- `GET /todos/{todo_id}` - get one todo
- `POST /todos/` - create a todo
- `PUT /todos/{todo_id}` - update a todo
- `DELETE /todos/{todo_id}` - delete a todo
