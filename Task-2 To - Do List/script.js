document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTaskFromStorage(task));
  updateProgress();
});

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const taskDeadline = document.getElementById("task-deadline").value;
    const taskPriority = document.getElementById("task-priority").value;
    const taskLabel = document.getElementById("task-label").value;
    addTask(taskName, taskDeadline, taskPriority, taskLabel);
    document.getElementById("task-form").reset();
  });

document
  .getElementById("filter-priority")
  .addEventListener("change", function (event) {
    filterTasks(event.target.value);
  });

function addTask(name, deadline, priority, label) {
  const taskList = document.getElementById("task-list");

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.dataset.priority = priority;
  taskDiv.dataset.completed = "false";

  const taskDetailsDiv = document.createElement("div");
  taskDetailsDiv.className = "details";

  const taskNameP = document.createElement("p");
  taskNameP.textContent = `Task: ${name}`;
  taskDetailsDiv.appendChild(taskNameP);

  const taskDeadlineP = document.createElement("p");
  taskDeadlineP.textContent = `Deadline: ${deadline}`;
  taskDetailsDiv.appendChild(taskDeadlineP);

  const taskPriorityP = document.createElement("p");
  taskPriorityP.textContent = `Priority: ${priority}`;
  taskDetailsDiv.appendChild(taskPriorityP);

  const taskLabelP = document.createElement("p");
  taskLabelP.textContent = `Label: ${label}`;
  taskDetailsDiv.appendChild(taskLabelP);

  const taskActionsDiv = document.createElement("div");
  taskActionsDiv.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", function () {
    if (taskDiv.dataset.completed === "true") {
      taskDiv.dataset.completed = "false";
      taskDiv.style.backgroundColor = "";
    } else {
      taskDiv.dataset.completed = "true";
      taskDiv.style.backgroundColor = "#d4edda";
    }
    updateProgress();
    saveTasksToLocalStorage();
  });
  taskActionsDiv.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(taskDiv);
    updateProgress();
    saveTasksToLocalStorage();
  });
  taskActionsDiv.appendChild(deleteBtn);

  taskDiv.appendChild(taskDetailsDiv);
  taskDiv.appendChild(taskActionsDiv);

  taskList.appendChild(taskDiv);

  updateProgress();
  saveTasksToLocalStorage();
}

function updateProgress() {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.getElementsByClassName("task"));
  const completedTasks = tasks.filter(
    (task) => task.dataset.completed === "true"
  ).length;
  const totalTasks = tasks.length;

  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progress}%`;

  const progressText = document.getElementById("progress-text");
  progressText.textContent = `Completed ${completedTasks} of ${totalTasks} tasks (${progress.toFixed(
    1
  )}%)`;
}

function filterTasks(priority) {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.getElementsByClassName("task"));

  tasks.forEach((task) => {
    if (priority === "All" || task.dataset.priority === priority) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function saveTasksToLocalStorage() {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.getElementsByClassName("task"));

  const savedTasks = tasks.map((task) => ({
    name: task
      .querySelector(".details p:nth-child(1)")
      .textContent.split(": ")[1],
    deadline: task
      .querySelector(".details p:nth-child(2)")
      .textContent.split(": ")[1],
    priority: task
      .querySelector(".details p:nth-child(3)")
      .textContent.split(": ")[1],
    label: task
      .querySelector(".details p:nth-child(4)")
      .textContent.split(": ")[1],
    completed: task.dataset.completed === "true",
  }));

  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function addTaskFromStorage(task) {
  const taskList = document.getElementById("task-list");

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.dataset.priority = task.priority;
  taskDiv.dataset.completed = task.completed.toString();

  const taskDetailsDiv = document.createElement("div");
  taskDetailsDiv.className = "details";

  const taskNameP = document.createElement("p");
  taskNameP.textContent = `Task: ${task.name}`;
  taskDetailsDiv.appendChild(taskNameP);

  const taskDeadlineP = document.createElement("p");
  taskDeadlineP.textContent = `Deadline: ${task.deadline}`;
  taskDetailsDiv.appendChild(taskDeadlineP);

  const taskPriorityP = document.createElement("p");
  taskPriorityP.textContent = `Priority: ${task.priority}`;
  taskDetailsDiv.appendChild(taskPriorityP);

  const taskLabelP = document.createElement("p");
  taskLabelP.textContent = `Label: ${task.label}`;
  taskDetailsDiv.appendChild(taskLabelP);

  const taskActionsDiv = document.createElement("div");
  taskActionsDiv.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", function () {
    if (taskDiv.dataset.completed === "true") {
      taskDiv.dataset.completed = "false";
      taskDiv.style.backgroundColor = "";
    } else {
      taskDiv.dataset.completed = "true";
      taskDiv.style.backgroundColor = "#d4edda";
    }
    updateProgress();
    saveTasksToLocalStorage();
  });
  taskActionsDiv.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(taskDiv);
    updateProgress();
    saveTasksToLocalStorage();
  });
  taskActionsDiv.appendChild(deleteBtn);

  if (task.completed) {
    taskDiv.style.backgroundColor = "#d4edda";
  }

  taskDiv.appendChild(taskDetailsDiv);
  taskDiv.appendChild(taskActionsDiv);

  taskList.appendChild(taskDiv);
}

filterTasks("All");
