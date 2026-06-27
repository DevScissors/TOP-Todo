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

export function addTaskToArchive(taskToArchive) {
  const task = taskList.find((item) => item.id === taskToArchive);
  if (!task) return;

  task.archived = true;
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

export function addTaskToLocalStorage(taskItem) {
  taskList.push(taskItem);
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
  const categoryField = modal.querySelector(".edit-task-category-input");
  const priorityField = modal.querySelector(".edit-task-priority-select");
  const dueDateField = modal.querySelector(".edit-task-due-by-date-input");
  const updateTaskBtn = modal.querySelector(".update-task-btn");

  dueDateField.setAttribute("min", todaysDate());

  const task = taskList.find((item) => item.id === taskToEdit);
  if (!task) return;

  nameField.value = task.name;
  categoryField.value = task.category;
  priorityField.value = task.priority;
  dueDateField.value = task.dueDate || "";

  modal.showModal();

  updateTaskBtn.addEventListener(
    "click",
    () => {
      task.name = nameField.value;
      task.category = categoryField.value;
      task.priority = priorityField.value;
      task.dueDate = dueDateField.value;

      localStorage.setItem("taskList", JSON.stringify(taskList));
      displayTaskList();
      modal.close();
    },
    { once: true },
  );
}
