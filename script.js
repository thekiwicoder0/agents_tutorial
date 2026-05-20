const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");
const taskCount = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");

const DARK = "dark";
const LIGHT = "light";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === DARK ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", theme === DARK ? "Switch to light theme" : "Switch to dark theme");
}

const savedTheme = localStorage.getItem("theme") || LIGHT;
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === DARK ? LIGHT : DARK;
  applyTheme(next);
  localStorage.setItem("theme", next);
});

function updateTaskCount() {
  const total = list.children.length;
  const completed = list.querySelectorAll(".completed").length;
  if (total === 0) {
    taskCount.textContent = "0 items";
    emptyState.classList.remove("hidden");
  } else {
    taskCount.textContent = `${total - completed} of ${total} remaining`;
    emptyState.classList.add("hidden");
  }
}

function createTodoItem(text) {
  const item = document.createElement("li");
  item.className = "todo-item";

  const checkbox = document.createElement("span");
  checkbox.className = "todo-checkbox";
  checkbox.setAttribute("role", "checkbox");
  checkbox.setAttribute("aria-checked", "false");
  checkbox.setAttribute("tabindex", "0");
  checkbox.textContent = "✓";

  const label = document.createElement("span");
  label.className = "todo-label";
  label.textContent = text;

  function toggleComplete() {
    const isCompleted = item.classList.toggle("completed");
    checkbox.setAttribute("aria-checked", isCompleted ? "true" : "false");
    updateTaskCount();
  }

  checkbox.addEventListener("click", toggleComplete);
  checkbox.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleComplete();
    }
  });
  label.addEventListener("click", toggleComplete);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Remove";
  deleteButton.setAttribute("aria-label", `Remove "${text}"`);

  deleteButton.addEventListener("click", () => {
    item.classList.add("removing");
    item.addEventListener("animationend", () => {
      item.remove();
      updateTaskCount();
    }, { once: true });
  });

  item.append(checkbox, label, deleteButton);
  return item;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const todoText = input.value.trim();
  if (!todoText) {
    input.focus();
    return;
  }

  const todoItem = createTodoItem(todoText);
  list.appendChild(todoItem);
  updateTaskCount();

  input.value = "";
  input.focus();
});

updateTaskCount();

