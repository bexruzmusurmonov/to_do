# FastAPI Todo CRUD App

Oson to_do app yaratish:

- FastAPI
- PostgreSQL
- SQLAlchemy
- Docker

## Project strukturasi

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

## Fayllari ichki strukturasi

- `app/database.py` sets up the database connection and session.
- `app/models.py` defines the SQLAlchemy database table.
- `app/schemas.py` defines request and response shapes.
- `app/crud.py` contains the database logic.
- `app/routers/todos.py` contains API routes.
- `app/main.py` creates the FastAPI app and connects everything together.

## Local run qilish

1. Create and activate a virtual environment.
2. Install the requirements:

```bash
pip install -r requirements.txt
```

3. Copy bu examole faylni:

```bash
copy .env.example .env
```

4. PostgreSQL ishlayotganiga va todo_db nomli database borligini tekshir.
5. Start the app:

```bash
uvicorn app.main:app --reload
```

6. Open:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Run Wqilish  Docker bilan

```bash
docker compose up --build
```

keyin ochish `http://127.0.0.1:8000/docs`

## Namuna so'rov uchun

### yaratish Todo

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
