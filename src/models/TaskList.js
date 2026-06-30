import ToDo from "./ToDo.js";
import taskOptionsSVGs from "../components/taskOptionsSVGs.js";
import {
  formatDate,
  formatDateTime,
  todaysDate,
} from "../utils/dateFormatter.js";
import {
  addTaskToLocalStorage,
  addTaskToArchive,
  checkLocalStorageForExistingTasks,
  clearTaskFromLocalStorage,
  editTaskFromLocalStorage,
  updateStatusInLocalStorage,
  getCategories,
  taskList,
  restoreTaskFromArchive,
} from "../services/localStorage.js";

const taskTable = document.querySelector(".todo-list-table");
const taskTableBody = document.querySelector("tbody");
const taskPrioritySelection = document.querySelector(".task-priority-select");
const taskNameInput = document.querySelector(".task-name-input");
const taskCategorySelection = document.querySelector(".task-category-select");
const taskNewCategoryInput = document.querySelector(".add-new-category-input");
const taskDueDateInput = document.querySelector(".task-due-by-date-input");
const todoListContainer = document.querySelector(".todo-list-container");

function getStoredTasks() {
  return JSON.parse(localStorage.getItem("taskList")) || [];
}

export function sortByMenuOption() {
  const taskListValues = getStoredTasks();
  const activeMenu = document.querySelector(".menu.active");
  const activeMenuClass = activeMenu?.classList.value || "";

  switch (true) {
    case activeMenuClass.includes("today-menu"):
      return taskListValues.filter((task) => {
        if (!task?.dueDate || task?.archived === true) {
          return false;
        }

        return formatDate(new Date(task.dueDate)) === formatDate(new Date());
      });
    case activeMenuClass.includes("upcoming-menu"):
      return taskListValues.filter((task) => {
        if (!task?.dueDate || task?.archived === true) {
          return false;
        }

        return new Date(task.dueDate) > new Date();
      });
    case activeMenuClass.includes("overdue-menu"):
      return taskListValues.filter((task) => {
        if (!task?.dueDate || task?.archived === true) {
          return false;
        }

        return new Date(task.dueDate) < new Date();
      });
    case activeMenuClass.includes("archive-menu"):
      return taskListValues.filter((task) => task?.archived === true);
    default:
      return taskListValues.filter((task) => task?.archived !== true);
  }
}

export function addTaskToList() {
  const taskNameValue = taskNameInput.value;
  const taskPriorityValue = taskPrioritySelection.value;
  const taskDueDateValue = taskDueDateInput.value;
  const taskDefaultStatusValue = "Not Completed";
  const taskCreatedDate = new Date();
  const taskArchived = false;

  let taskCategoryValue = "";
  if (taskCategorySelection) {
    if (taskCategorySelection.value === "Add New Category") {
      taskCategoryValue = taskNewCategoryInput.value.trim();
    } else {
      taskCategoryValue = taskCategorySelection.value;
    }
  }

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

function emptyTaskListMessage(message) {
  let emptyMessage = document.querySelector(".empty-task-list-message");

  if (!emptyMessage) {
    emptyMessage = document.createElement("div");
    emptyMessage.classList.add("empty-task-list-message");
    emptyMessage.style.cssText = "text-align: center; font-size: 36px;";
    todoListContainer.appendChild(emptyMessage);
  }

  emptyMessage.textContent = message;
  return emptyMessage;
}

export function showCategoryInput(newCatValue) {
  const addCategoryLabel = document.querySelector(".add-new-category-label");
  const addCategoryInput = document.querySelector(".add-new-category-input");
  const isNew = newCatValue === "Add New Category";

  addCategoryLabel.style.display = isNew ? "block" : "none";
  addCategoryInput.style.display = isNew ? "block" : "none";
  addCategoryInput.required = isNew;
  addCategoryInput.disabled = !isNew;

  if (!isNew) {
    addCategoryInput.value = "";
  }
}

export function buildCategoryList() {
  const categories = getCategories();
  taskCategorySelection.innerHTML = "";

  if (!categories || categories.length === 0) {
    const addNewOption = document.createElement("option");
    addNewOption.value = "Add New Category";
    addNewOption.textContent = "Add new category";
    taskCategorySelection.appendChild(addNewOption);
    taskCategorySelection.value = "Add New Category";
    showCategoryInput("Add New Category");
    return;
  }

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a category";
  placeholder.disabled = true;
  placeholder.selected = true;
  taskCategorySelection.appendChild(placeholder);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    taskCategorySelection.appendChild(option);
  });

  const addNewOption = document.createElement("option");
  addNewOption.value = "Add New Category";
  addNewOption.textContent = "Add new category";
  taskCategorySelection.appendChild(addNewOption);
  showCategoryInput("");
}

export function displayTaskList() {
  taskTableBody.innerHTML = "";

  const taskListValues = sortByMenuOption();
  const emptyListMessage = document.querySelector(".empty-task-list-message");
  const activeMenu = document.querySelector(".menu.active");
  const activeMenuClass = activeMenu?.classList.value || "";

  let emptyMessage = "No tasks added yet. I'm sure you have something to do...";

  switch (true) {
    case activeMenuClass.includes("today-menu"):
      emptyMessage = "No tasks are due today!";
      break;
    case activeMenuClass.includes("upcoming-menu"):
      emptyMessage = "No upcoming tasks.";
      break;
    case activeMenuClass.includes("overdue-menu"):
      emptyMessage = "No overdue tasks.";
      break;
    case activeMenuClass.includes("archive-menu"):
      emptyMessage = "No archived tasks.";
      break;
    default:
      emptyMessage = "No tasks added yet. I'm sure you have something to do...";
  }

  if (!checkLocalStorageForExistingTasks() || taskListValues.length === 0) {
    taskTable.classList.add("hidden");
    emptyTaskListMessage(emptyMessage);
    return;
  }

  taskTable.classList.remove("hidden");
  if (emptyListMessage) {
    emptyListMessage.remove();
  }

  taskListValues.forEach((task, index) => {
    const taskRow = document.createElement("tr");
    taskRow.classList.add("task-item-row");
    if (task.status === "Completed") {
      taskRow.classList.add("task-completed");
    }
    taskRow.setAttribute("data-index", task.id);

    const taskColCompletionCheckbox = document.createElement("td");
    taskColCompletionCheckbox.classList.add("completion-toggle", "table-item");

    const taskCheckboxInput = document.createElement("input");
    taskCheckboxInput.type = "checkbox";
    taskCheckboxInput.classList.add("checkbox-toggle");
    taskCheckboxInput.checked = task.status === "Completed";

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
      taskOptionsSVGs(task),
    );

    taskTableBody.appendChild(taskRow);

    const completionToggle = taskRow.querySelector("input.checkbox-toggle");
    const deleteTaskBtn = taskRow.querySelector(".delete-task");
    const editTaskBtn = taskRow.querySelector(".edit-task");

    if (task.archived) {
      const restoreTaskBtn = taskRow.querySelector(".restore-task");
      restoreTaskBtn.addEventListener("click", (e) => {
        const taskToRestoreByRow = e.currentTarget.closest(".task-item-row");
        taskToRestoreByRow.classList.remove("archived-task");
        restoreTaskFromArchive(taskToRestoreByRow.dataset.index);
        displayTaskList();
      });
    } else {
      const archiveTaskBtn = taskRow.querySelector(".archive-task");
      archiveTaskBtn.addEventListener("click", (e) => {
        const taskToArchiveByRow = e.currentTarget.closest(".task-item-row");
        taskToArchiveByRow.classList.add("archived-task");
        addTaskToArchive(taskToArchiveByRow.dataset.index);
        displayTaskList();
      });
    }

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
