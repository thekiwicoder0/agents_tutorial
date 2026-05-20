const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function createTodoItem(text) {
  const item = document.createElement("li");
  item.className = "todo-item";

  const label = document.createElement("span");
  label.className = "todo-label";
  label.textContent = text;
  label.addEventListener("click", () => {
    item.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    item.remove();
  });

  item.append(label, deleteButton);
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

  input.value = "";
  input.focus();
});
