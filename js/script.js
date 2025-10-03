const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const todoList = document.getElementById("todoList");

let todos = [];

// Render Todo List
function renderTodos(list = todos) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }

  list.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="${todo.done ? 'status-done' : ''}">${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? 'Done' : 'Pending'}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

// Add Task
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please fill in both task and date!");
    return;
  }

  todos.push({ task, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

// Delete All
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
});

// Delete One
function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Toggle Status
function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

// Filter (contoh: tampilkan hanya yang belum selesai)
filterBtn.addEventListener("click", () => {
  const filtered = todos.filter(todo => !todo.done);
  renderTodos(filtered);
});

// Initial render
renderTodos();