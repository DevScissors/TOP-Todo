import ToDo from "./ToDo.js";
import taskOptionsSVGs from "../components/taskOptionsSVGs.js";
import { formatDateTime, formatDate } from "../utils/dateFormatter.js";
import {
  addTaskToLocalStorage,
  addTaskToArchive,
  checkLocalStorageForExistingTasks,
  clearTaskFromLocalStorage,
  editTaskFromLocalStorage,
  updateStatusInLocalStorage,
} from "../services/localStorage.js";

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
  const taskArchived = false;

  const toDoTask = new ToDo(
    taskNameValue,
    taskCategoryValue,
    taskPriorityValue,
    taskDueDateValue,
    taskDefaultStatusValue,
    taskCreatedDate,
    taskArchived,
  );
  addTaskToLocalStorage(toDoTask);
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
  if (!checkLocalStorageForExistingTasks()) {
    taskTable.classList.add("hidden");
    emptyTaskListMessage();
    return;
  }
  const emptyListMessage = document.querySelector(".empty-task-list-message");
  taskTable.classList.remove("hidden");
  if (emptyListMessage) {
    emptyListMessage.classList.add("hidden");
  }

  const taskListValues = JSON.parse(localStorage.getItem("taskList"));

  taskListValues.forEach((task, index) => {
    const taskRow = document.createElement("tr");
    taskRow.classList.add("task-item-row");
    taskRow.setAttribute("data-index", task.id);

    const taskColCompletionCheckbox = document.createElement("td");
    taskColCompletionCheckbox.classList.add("completion-toggle", "table-item");

    const taskCheckboxInput = document.createElement("input");
    taskCheckboxInput.type = "checkbox";
    taskCheckboxInput.classList.add("checkbox-toggle");

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
    task.createdDate = new Date(task.createdDate);
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

    const completionToggle = taskRow.querySelector("input.checkbox-toggle");
    const archiveTaskBtn = taskRow.querySelector(".archive-task");
    const deleteTaskBtn = taskRow.querySelector(".delete-task");
    const editTaskBtn = taskRow.querySelector(".edit-task");

    archiveTaskBtn.addEventListener("click", (e) => {
      const taskToArchiveByRow = e.currentTarget.closest(".task-item-row");
      taskToArchiveByRow.classList.add("archived-task");
      addTaskToArchive(taskToArchiveByRow.dataset.index);
    });

    deleteTaskBtn.addEventListener("click", (e) => {
      const indexOfTaskToRemove =
        e.currentTarget.closest(".task-item-row").dataset.index;
      clearTaskFromLocalStorage(indexOfTaskToRemove);
      displayTaskList();
    });

    editTaskBtn.addEventListener("click", (e) => {
      const indexOfTaskToEdit =
        e.currentTarget.closest(".task-item-row").dataset.index;
      editTaskFromLocalStorage(indexOfTaskToEdit);
      displayTaskList();
    });

    completionToggle.addEventListener("click", (e) => {
      const rowOfTaskCompleted = e.currentTarget.closest(".task-item-row");
      const statusOfTaskCompleted = rowOfTaskCompleted.children[5];
      if (completionToggle.checked) {
        rowOfTaskCompleted.classList.add("task-completed");
        statusOfTaskCompleted.textContent = "Completed";
      } else {
        statusOfTaskCompleted.textContent = "Not Completed";
        rowOfTaskCompleted.classList.remove("task-completed");
      }
      updateStatusInLocalStorage(rowOfTaskCompleted.dataset.index);
    });
  });
}
