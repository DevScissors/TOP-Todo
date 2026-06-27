import "./styles/style.css";
import { addTaskToList, displayTaskList } from "./models/TaskList.js";
import {
  addTaskToLocalStorage,
  checkLocalStorageForTasks,
} from "./services/localStorage.js";
import { todaysDate } from "./utils/dateFormatter.js";

const navItems = document.querySelectorAll(".menu");
const addTaskModal = document.querySelector("#addNewTask");
const addTaskForm = document.querySelector(".add-task-form");
const dueDateInput = document.querySelector(".task-due-by-date-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const submitTaskBtn = document.querySelector(".submit-task-btn");

navItems.forEach((menuItem) => {
  menuItem.addEventListener("click", (e) => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    e.currentTarget.classList.toggle("active");
  });
});

addTaskBtn.addEventListener("click", () => {
  dueDateInput.setAttribute("min", todaysDate());
  dueDateInput.setAttribute("value", todaysDate());
  addTaskModal.showModal();
});

addTaskModal.addEventListener("close", () => {
  addTaskForm.reset();
});

addTaskForm.addEventListener("submit", () => {
  event.preventDefault();
  addTaskToList();
  addTaskModal.close();
  displayTaskList();
});

displayTaskList();
