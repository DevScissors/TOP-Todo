import ToDo from "./ToDo.js";
import taskOptionsSVGs from "../components/taskOptionsSVGs.js";
import { formatDateTime, formatDate } from "../utils/dateFormatter.js";
import {
  addTaskToLocalStorage,
  checkLocalStorageForTasks,
} from "../services/localStorage.js";

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
  addTaskToLocalStorage();
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
  taskTableBody.innerHTML = "";

  // Check if the user has any tasks in local storage, eventually
  if (localStorage.length === 0) {
    taskTable.classList.add("hidden");
    emptyTaskListMessage();
    return;
  } else {
    const emptyListMessage = document.querySelector(".empty-task-list-message");
    taskTable.classList.remove("hidden");
    if (emptyListMessage) {
      emptyListMessage.classList.add("hidden");
    }
  }
  checkLocalStorageForTasks();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const taskValues = JSON.parse(localStorage.getItem(key));
    const taskRow = document.createElement("tr");
    taskRow.classList.add("task-item-row");
    taskRow.setAttribute("data-index", taskValues.id);

    const taskColCompletionCheckbox = document.createElement("td");
    taskColCompletionCheckbox.classList.add("completion-toggle", "table-item");

    const taskCheckboxInput = document.createElement("input");
    taskCheckboxInput.type = "checkbox";

    const taskNameCol = document.createElement("td");
    taskNameCol.classList.add("task-name", "table-item");
    taskNameCol.textContent = taskValues.name;

    const taskCategoryCol = document.createElement("td");
    taskCategoryCol.classList.add("task-category", "table-item");
    taskCategoryCol.textContent = taskValues.category;

    const taskPriorityCol = document.createElement("td");
    taskPriorityCol.classList.add("task-priority-status", "table-item");
    taskPriorityCol.textContent = taskValues.priority;

    const taskDueDateCol = document.createElement("td");
    taskDueDateCol.classList.add("task-due-date", "table-item");
    taskDueDateCol.textContent = formatDateTime(taskValues.dueDate);

    const taskStatusCol = document.createElement("td");
    taskStatusCol.classList.add("task-status", "table-item");
    taskStatusCol.textContent = taskValues.status;

    const taskCreatedDateCol = document.createElement("td");
    taskCreatedDateCol.classList.add("task-created-date", "table-item");
    taskCreatedDateCol.textContent = formatDateTime(taskValues.createdDate);

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
  }
}
