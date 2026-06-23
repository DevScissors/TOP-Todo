import "./styles/style.css";
import { addTaskToList, displayTaskList } from "./models/TaskList.js";

const navItems = document.querySelectorAll(".menu");
const modal = document.querySelector("#addNewTask");
const addTaskBtn = document.querySelector(".new-task-btn");
const submitTaskBtn = document.querySelector(".submit-task-btn");

navItems.forEach((menuItem) => {
  menuItem.addEventListener("click", (e) => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    e.currentTarget.classList.toggle("active");
  });
});

addTaskBtn.addEventListener("click", () => {
  modal.showModal();
});

submitTaskBtn.addEventListener("click", () => {
  addTaskToList();
  displayTaskList();
});

displayTaskList();
