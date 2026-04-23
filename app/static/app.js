const apiUrl = "/todos/";

const todoForm = document.getElementById("todo-form");
const todoIdInput = document.getElementById("todo-id");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const completedInput = document.getElementById("completed");
const statusMessage = document.getElementById("status-message");
const todoList = document.getElementById("todo-list");
const cancelButton = document.getElementById("cancel-button");
const refreshButton = document.getElementById("refresh-button");
const saveButton = document.getElementById("save-button");

function setStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? "#b9382f" : "#6b7280";
}

function resetForm() {
    todoForm.reset();
    todoIdInput.value = "";
    completedInput.checked = false;
    saveButton.textContent = "Save Todo";
    cancelButton.classList.add("hidden");
}

function fillForm(todo) {
    todoIdInput.value = todo.id;
    titleInput.value = todo.title;
    descriptionInput.value = todo.description || "";
    completedInput.checked = todo.completed;
    saveButton.textContent = "Update Todo";
    cancelButton.classList.remove("hidden");
    titleInput.focus();
}

function createTodoCard(todo) {
    const card = document.createElement("article");
    card.className = `todo-item ${todo.completed ? "completed" : ""}`;

    card.innerHTML = `
        <div class="todo-top">
            <div>
                <h3 class="todo-title">${todo.title}</h3>
                <p class="todo-description">${todo.description || "No description"}</p>
            </div>
            <span class="todo-badge">${todo.completed ? "Completed" : "Pending"}</span>
        </div>
        <div class="todo-buttons">
            <button type="button" class="secondary edit-button">Edit</button>
            <button type="button" class="danger delete-button">Delete</button>
        </div>
    `;

    card.querySelector(".edit-button").addEventListener("click", () => fillForm(todo));
    card.querySelector(".delete-button").addEventListener("click", () => deleteTodo(todo.id));

    return card;
}

async function loadTodos() {
    setStatus("Loading todos...");
    todoList.innerHTML = "";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Could not load todos.");
        }

        const todos = await response.json();

        if (todos.length === 0) {
            setStatus("Hozircha todo yo'q. Birinchisini qo'shing.");
            return;
        }

        setStatus(`${todos.length} ta todo topildi.`);
        todos.forEach((todo) => {
            todoList.appendChild(createTodoCard(todo));
        });
    } catch (error) {
        setStatus("Todo'larni yuklashda xatolik bo'ldi. PostgreSQL ishlayotganini tekshiring.", true);
    }
}

async function createTodo(payload) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Create failed");
    }
}

async function updateTodo(id, payload) {
    const response = await fetch(`${apiUrl}${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Update failed");
    }
}

async function deleteTodo(id) {
    const wantsDelete = window.confirm("Shu todo'ni o'chirmoqchimisiz?");
    if (!wantsDelete) {
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        resetForm();
        await loadTodos();
        setStatus("Todo o'chirildi.");
    } catch (error) {
        setStatus("Todo'ni o'chirishda xatolik bo'ldi.", true);
    }
}

todoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim() || null,
        completed: completedInput.checked,
    };

    if (!payload.title) {
        setStatus("Title bo'sh bo'lmasligi kerak.", true);
        return;
    }

    try {
        if (todoIdInput.value) {
            await updateTodo(todoIdInput.value, payload);
            setStatus("Todo yangilandi.");
        } else {
            await createTodo({
                title: payload.title,
                description: payload.description,
            });
            setStatus("Todo yaratildi.");
        }

        resetForm();
        await loadTodos();
    } catch (error) {
        setStatus("Saqlashda xatolik bo'ldi.", true);
    }
});

cancelButton.addEventListener("click", () => {
    resetForm();
    setStatus("Tahrirlash bekor qilindi.");
});

refreshButton.addEventListener("click", loadTodos);

loadTodos();
