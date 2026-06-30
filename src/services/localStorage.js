import { addTaskToList, displayTaskList } from "../models/TaskList";
import { formatDateTime, todaysDate } from "../utils/dateFormatter";

const taskList = checkLocalStorageForExistingTasks()
  ? JSON.parse(localStorage.getItem("taskList"))
  : [];

export function checkLocalStorageForExistingTasks() {
  if (!localStorage.getItem("taskList")) {
    return false;
  }
  return true;
}

export function checkIfTaskArchived(taskId) {
  const task = taskList.find((item) => item.id === taskId);
  return Boolean(task?.archived);
}

export function restoreTaskFromArchive(restoredTask) {
  const task = taskList.find((item) => item.id === restoredTask);
  if (!task) return;

  task.archived = false;
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function addTaskToArchive(taskToArchive) {
  const task = taskList.find((item) => item.id === taskToArchive);
  if (!task) return;

  task.archived = true;
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function addTaskToLocalStorage(taskToAdd) {
  taskList.push(taskToAdd);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function clearTaskFromLocalStorage(targetValue) {
  taskList.forEach((task, index) => {
    if (task.id === targetValue) {
      taskList.splice(index, 1);
    }
  });
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function editTaskFromLocalStorage(taskToEdit) {
  const modal = document.querySelector("#editTask");
  const nameField = modal.querySelector(".edit-task-name-input");
  const editTaskCategorySelection = modal.querySelector(
    ".edit-task-category-select",
  );
  const editTaskCategoryInput = modal.querySelector(
    ".edit-add-new-category-input",
  );
  const editTaskCategoryLabel = modal.querySelector(
    ".edit-add-new-category-label",
  );
  const priorityField = modal.querySelector(".edit-task-priority-select");
  const dueDateField = modal.querySelector(".edit-task-due-by-date-input");
  const updateTaskBtn = modal.querySelector(".update-task-btn");

  dueDateField.setAttribute("min", todaysDate());

  const task = taskList.find((item) => item.id === taskToEdit);
  if (!task) return;

  const categories = getCategories();
  editTaskCategorySelection.innerHTML = "";

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    editTaskCategorySelection.appendChild(option);
  });

  const addNewOption = document.createElement("option");
  addNewOption.value = "Add New Category";
  addNewOption.textContent = "Add new category";
  editTaskCategorySelection.appendChild(addNewOption);

  nameField.value = task.name;
  priorityField.value = task.priority;
  dueDateField.value = task.dueDate || "";

  if (categories.includes(task.category)) {
    editTaskCategorySelection.value = task.category;
    editTaskCategoryInput.style.display = "none";
    editTaskCategoryLabel.style.display = "none";
    editTaskCategoryInput.required = false;
    editTaskCategoryInput.value = "";
  } else {
    editTaskCategorySelection.value = "Add New Category";
    editTaskCategoryInput.style.display = "block";
    editTaskCategoryLabel.style.display = "block";
    editTaskCategoryInput.required = true;
    editTaskCategoryInput.value = task.category;
  }

  editTaskCategorySelection.addEventListener("change", (e) => {
    const isNew = e.target.value === "Add New Category";
    editTaskCategoryInput.style.display = isNew ? "block" : "none";
    editTaskCategoryLabel.style.display = isNew ? "block" : "none";
    editTaskCategoryInput.required = isNew;
    if (!isNew) {
      editTaskCategoryInput.value = "";
    }
  });

  modal.showModal();

  updateTaskBtn.addEventListener(
    "click",
    () => {
      task.name = nameField.value;
      task.category =
        editTaskCategorySelection.value === "Add New Category"
          ? editTaskCategoryInput.value.trim()
          : editTaskCategorySelection.value;
      task.priority = priorityField.value;
      task.dueDate = dueDateField.value;

      localStorage.setItem("taskList", JSON.stringify(taskList));
      displayTaskList();
      modal.close();
    },
    { once: true },
  );
}

export function updateStatusInLocalStorage(taskToUpdateStatus) {
  const task = taskList.find((item) => item.id === taskToUpdateStatus);
  if (task.status === "Not Completed") {
    task.status = "Completed";
  } else {
    task.status = "Not Completed";
  }
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function getCategories() {
  if (!checkLocalStorageForExistingTasks()) {
    return [];
  }

  const categories = [];
  taskList.forEach((task) => {
    if (task.category && !categories.includes(task.category)) {
      categories.push(task.category);
    }
  });

  return categories;
}
