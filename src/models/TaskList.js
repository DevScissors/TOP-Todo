import ToDo from "./ToDo.js";
import taskOptionsSVGs from "../components/taskOptionsSVGs.js";
import { formatDateTime, formatDate } from "../utils/dateFormatter.js";

export let taskList = [];

const taskTable = document.querySelector(".todo-list-table");
const taskTableBody = document.querySelector("tbody");
const taskPrioritySelection = document.querySelector(".task-priority-select");
const taskNameInput = document.querySelector(".task-name-input");
const taskCategoryInput = document.querySelector(".task-category-input");
const taskDueDateInput = document.querySelector(".task-due-by-date-input");
const todoListContainer = document.querySelector(".todo-list-container");

export function addTaskToList() {
  const taskNameValue = taskNameInput.value;
  const taskCategoryValue = taskCategoryInput.value;
  const taskPriorityValue = taskPrioritySelection.value;
  const taskDueDateValue = taskDueDateInput.value;
  const taskDefaultStatusValue = "Not Completed";
  const taskCreatedDate = new Date();

  const toDoTask = new ToDo(
    taskNameValue,
    taskCategoryValue,
    taskPriorityValue,
    taskDueDateValue,
    taskDefaultStatusValue,
    taskCreatedDate,
  );
  taskList.push(toDoTask);
}

function emptyTaskListMessage() {
  const emptyMessage = document.createElement("div");
  emptyMessage.classList.add("empty-task-list-message");
  emptyMessage.style.cssText = "text-align: center; font-size: 36px;";
  emptyMessage.textContent =
    "No tasks added yet. I'm sure you have something to do...";

  todoListContainer.appendChild(emptyMessage);
  return todoListContainer;
}

export function displayTaskList() {
  const emptyListMessage = document.querySelector(".empty-task-list-message");
  taskTableBody.innerHTML = "";

  // Check if the user has any tasks in local storage, eventually
  if (taskList.length === 0) {
    taskTable.classList.add("hidden");
    emptyTaskListMessage();
    return;
  } else {
    taskTable.classList.remove("hidden");
    emptyListMessage.classList.add("hidden");
  }
  taskList.forEach((task) => {
    const taskRow = document.createElement("tr");
    taskRow.classList.add("task-item-row");
    taskRow.setAttribute("data-index", task.id);

    const taskColCompletionCheckbox = document.createElement("td");
    taskColCompletionCheckbox.classList.add("completion-toggle", "table-item");

    const taskCheckboxInput = document.createElement("input");
    taskCheckboxInput.type = "checkbox";

    const taskNameCol = document.createElement("td");
    taskNameCol.classList.add("task-name", "table-item");
    taskNameCol.textContent = task.name;

    const taskCategoryCol = document.createElement("td");
    taskCategoryCol.classList.add("task-category", "table-item");
    taskCategoryCol.textContent = task.category;

    const taskPriorityCol = document.createElement("td");
    taskPriorityCol.classList.add("task-priority-status", "table-item");
    taskPriorityCol.textContent = task.priority;

    const taskDueDateCol = document.createElement("td");
    taskDueDateCol.classList.add("task-due-date", "table-item");
    taskDueDateCol.textContent = formatDateTime(task.dueDate);

    const taskStatusCol = document.createElement("td");
    taskStatusCol.classList.add("task-status", "table-item");
    taskStatusCol.textContent = task.status;

    const taskCreatedDateCol = document.createElement("td");
    taskCreatedDateCol.classList.add("task-created-date", "table-item");
    taskCreatedDateCol.textContent = formatDateTime(task.createdDate);

    taskColCompletionCheckbox.appendChild(taskCheckboxInput);

    taskRow.append(
      taskColCompletionCheckbox,
      taskNameCol,
      taskCategoryCol,
      taskPriorityCol,
      taskDueDateCol,
      taskStatusCol,
      taskCreatedDateCol,
      taskOptionsSVGs(),
    );

    taskTableBody.appendChild(taskRow);
  });
}
