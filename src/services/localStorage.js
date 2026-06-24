import { addTaskToList, taskList } from "../models/TaskList";

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

export function clearTaskFromLocalStorage() {
  const listOfTasks = localStorage.getItem(taskList);
}
