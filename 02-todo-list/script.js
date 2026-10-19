
const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskSummary = document.getElementById("taskSummary");

// Get previously saved tasks
let tasks = [];

try {
  const savedTasks = localStorage.getItem("todoTasks");

  if (savedTasks) {
    const parsedTasks = JSON.parse(savedTasks);

    if (Array.isArray(parsedTasks)) {
      tasks = parsedTasks.filter(function (task) {
        return (
          task &&
          typeof task.id === "number" &&
          typeof task.text === "string" &&
          typeof task.completed === "boolean"
        );
      });
    }
  }
} catch (error) {
  tasks = [];
}

// Save tasks in the browser
function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No tasks yet. Add your first task!";
    taskList.appendChild(emptyMessage);
  }

  tasks.forEach(function (task) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Complete " + task.text);

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveTasks();
      displayTasks();
    });

    // Task name
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Delete " + task.text);

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      saveTasks();
      displayTasks();
    });

    listItem.append(checkbox, taskText, deleteButton);
    taskList.appendChild(listItem);
  });

  // Count incomplete tasks
  const remainingTasks = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  taskSummary.textContent =
    remainingTasks +
    (remainingTasks === 1 ? " task remaining" : " tasks remaining");
}

// Add a new task
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);

  saveTasks();
  displayTasks();

  taskInput.value = "";
  taskInput.focus();
});

// Show tasks when the page opens
displayTasks();
