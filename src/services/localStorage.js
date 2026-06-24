import { addTaskToList, displayTaskList, taskList } from "../models/TaskList";
import { formatDate, todaysDate } from "../utils/dateFormatter";

export function checkLocalStorageForTasks() {
  if (!localStorage.length) {
    return;
  }
  for (let i = 0; i < localStorage.length; i++) {
    taskList.push[i];
  }
}

export function addTaskToLocalStorage() {
  for (let i = 0; i < taskList.length; i++) {
    localStorage.setItem(taskList[i].name, JSON.stringify(taskList[i]));
  }
}

export function clearTaskFromLocalStorage(targetValue) {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));

    if (value.id === targetValue) {
      localStorage.removeItem(key);
    }
  }
}

export function editTaskFromLocalStorage(taskToEdit) {
  const modal = document.querySelector("#editTask");
  const nameField = modal.querySelector(".task-name-input");
  const categoryField = modal.querySelector(".task-category-input");
  const priorityField = modal.querySelector(".task-priority-select");
  const dueDateField = modal.querySelector(".task-due-by-date-input");
  const editTaskBtn = modal.querySelector(".edit-task-btn");

  dueDateField.setAttribute("min", todaysDate());

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));

    nameField.value = value.name;
    categoryField.value = value.category;
    priorityField.value = value.priority;
    dueDateField.value = formatDate(value.dueDate);

    modal.showModal();

    editTaskBtn.addEventListener("click", () => {
      const editedValues = {
        ...value,
        name: nameField.value,
        category: categoryField.value,
        priority: priorityField.value,
        dueDate: dueDateField.value,
      };
      localStorage.setItem(key, JSON.stringify(editedValues));
      displayTaskList();
    });
  }
}
