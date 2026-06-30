import "./styles/style.css";
import {
  addTaskToList,
  buildCategoryList,
  displayTaskList,
  showCategoryInput,
} from "./models/TaskList.js";
import {
  addTaskToLocalStorage,
  checkLocalStorageForTasks,
  getCategories,
} from "./services/localStorage.js";
import { todaysDate } from "./utils/dateFormatter.js";

const navItems = document.querySelectorAll(".menu");
const addTaskModal = document.querySelector("#addNewTask");
const addTaskForm = document.querySelector(".add-task-form");
const dueDateInput = document.querySelector(".task-due-by-date-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const submitTaskBtn = document.querySelector(".submit-task-btn");
const taskAddCategorySelect = document.querySelector(".task-category-select");

navItems.forEach((menuItem) => {
  menuItem.addEventListener("click", (e) => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    e.currentTarget.classList.toggle("active");
  });
});

addTaskBtn.addEventListener("click", () => {
  dueDateInput.setAttribute("min", todaysDate());
  dueDateInput.setAttribute("value", todaysDate());
  getCategories();
  buildCategoryList();
  addTaskModal.showModal();
});

taskAddCategorySelect.addEventListener("change", (e) => {
  const addCategory = e.target.value;
  showCategoryInput(addCategory);
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
