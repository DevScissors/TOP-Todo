import "./styles/style.css";
import { addTaskToList, displayTaskList } from "./models/TaskList.js";
import { checkLocalStorageForTasks } from "./services/localStorage.js";
import { todaysDate } from "./utils/dateFormatter.js";

const navItems = document.querySelectorAll(".menu");
const modal = document.querySelector("#addNewTask");
const formModal = document.querySelector(".add-task-form");
const dueDateInput = document.querySelector(".task-due-by-date-input");
const addTaskBtn = document.querySelector(".new-task-btn");
const submitTaskBtn = document.querySelector(".submit-task-btn");

navItems.forEach((menuItem) => {
  menuItem.addEventListener("click", (e) => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    e.currentTarget.classList.toggle("active");
  });
});

addTaskBtn.addEventListener("click", () => {
  dueDateInput.setAttribute("min", todaysDate());
  modal.showModal();
});

modal.addEventListener("close", () => {
  formModal.reset();
});

submitTaskBtn.addEventListener("click", () => {
  addTaskToList();
  displayTaskList();
});

displayTaskList();
